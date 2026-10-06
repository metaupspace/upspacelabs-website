import { NextResponse } from 'next/server';
import {
  normalizeSubmission,
  validateSubmission,
} from '@/lib/contact/validate';
import { StrapiError, strapiPost } from '@/lib/strapi/client';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

/**
 * Per-IP throttle kept in memory: fine for one instance, resets on deploy.
 * ponytail: swap for a shared store (Redis/Upstash) when running several instances.
 */
function tooManyRequests(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (tooManyRequests(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real visitors never see this field. Pretend success to bots.
  if (
    body &&
    typeof body === 'object' &&
    typeof (body as Record<string, unknown>).website === 'string' &&
    ((body as Record<string, unknown>).website as string).length > 0
  ) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const data = normalizeSubmission(body);
  const errors = validateSubmission(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: 'Invalid input.', errors },
      { status: 400 }
    );
  }

  try {
    await strapiPost('/contact-submissions', { data });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error(
      '[contact] failed to store submission:',
      err instanceof StrapiError ? err.message : err
    );
    return NextResponse.json(
      { error: 'We could not send your message. Please try again shortly.' },
      { status: 502 }
    );
  }
}
