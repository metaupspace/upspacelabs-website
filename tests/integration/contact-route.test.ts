import { beforeEach, describe, expect, it, vi } from 'vitest';

const strapiPost = vi.fn();
vi.mock('@/lib/strapi/client', () => ({
  StrapiError: class StrapiError extends Error {},
  strapiPost: (...args: unknown[]) => strapiPost(...args),
}));

import { POST } from '@/app/api/contact/route';

let ipCounter = 0;
const post = (body: unknown, raw = false) =>
  POST(
    new Request('http://localhost/api/contact', {
      method: 'POST',
      // A fresh IP per request keeps the in-memory throttle out of the way.
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': `10.0.0.${++ipCounter}`,
      },
      body: raw ? (body as string) : JSON.stringify(body),
    })
  );

const valid = {
  name: 'Ada',
  email: 'ada@example.com',
  phone: '',
  topic: 'Pricing',
  message: 'Hello',
};

describe('POST /api/contact', () => {
  beforeEach(() => {
    strapiPost.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('stores a valid submission in Strapi', async () => {
    strapiPost.mockResolvedValue({});
    const res = await post(valid);
    expect(res.status).toBe(201);
    expect(strapiPost).toHaveBeenCalledWith('/contact-submissions', {
      data: valid,
    });
  });

  it('rejects invalid input without calling Strapi', async () => {
    const res = await post({ ...valid, email: 'nope' });
    expect(res.status).toBe(400);
    expect((await res.json()).errors.email).toBeTruthy();
    expect(strapiPost).not.toHaveBeenCalled();
  });

  it('rejects malformed JSON', async () => {
    expect((await post('{oops', true)).status).toBe(400);
  });

  it('silently drops honeypot hits', async () => {
    const res = await post({ ...valid, website: 'http://spam' });
    expect(res.status).toBe(201);
    expect(strapiPost).not.toHaveBeenCalled();
  });

  it('reports a 502 when Strapi is unavailable', async () => {
    strapiPost.mockRejectedValue(new Error('down'));
    expect((await post(valid)).status).toBe(502);
  });

  it('throttles repeated requests from one IP', async () => {
    strapiPost.mockResolvedValue({});
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) {
      const res = await POST(
        new Request('http://localhost/api/contact', {
          method: 'POST',
          headers: { 'x-forwarded-for': '203.0.113.9' },
          body: JSON.stringify(valid),
        })
      );
      statuses.push(res.status);
    }
    expect(statuses.slice(0, 5)).toEqual([201, 201, 201, 201, 201]);
    expect(statuses[6]).toBe(429);
  });
});
