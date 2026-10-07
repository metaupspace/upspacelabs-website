import { describe, expect, it } from 'vitest';
import {
  normalizeSubmission,
  validateSubmission,
} from '@/lib/contact/validate';
import { mapContactPageContent } from '@/lib/strapi/mappers';
import { contactPageFallback } from '@/lib/content/contact-fallback';

const valid = {
  name: 'Ada',
  email: 'ada@example.com',
  phone: '+91 6000 831 966',
  topic: 'Pricing',
  message: 'Hello',
};

describe('contact validation', () => {
  it('accepts a complete submission and an empty optional phone/topic', () => {
    expect(validateSubmission(valid)).toEqual({});
    expect(validateSubmission({ ...valid, phone: '', topic: '' })).toEqual({});
  });

  it('flags missing and malformed fields', () => {
    const errors = validateSubmission({
      name: '',
      email: 'nope',
      phone: 'abc',
      topic: '',
      message: '',
    });
    expect(Object.keys(errors).sort()).toEqual([
      'email',
      'message',
      'name',
      'phone',
    ]);
  });

  it('rejects over-long messages', () => {
    expect(
      validateSubmission({ ...valid, message: 'x'.repeat(2001) }).message
    ).toMatch(/2000/);
  });

  it('normalizes untrusted input to trimmed strings', () => {
    expect(
      normalizeSubmission({ name: '  Ada ', email: 5, message: null })
    ).toEqual({ name: 'Ada', email: '', phone: '', topic: '', message: '' });
    expect(normalizeSubmission('nope').name).toBe('');
  });
});

describe('mapContactPageContent', () => {
  it('falls back for everything missing', () => {
    expect(mapContactPageContent({})).toEqual(contactPageFallback);
  });

  it('maps CMS copy, coerces unknown enums and drops unusable items', () => {
    const result = mapContactPageContent({
      title: 'Talk to us',
      infoItems: [
        {
          icon: 'mail',
          tone: 'violet',
          label: 'Email',
          value: 'a@b.co',
          href: 'mailto:a@b.co',
        },
        { icon: 'rocket', tone: 'neon', label: 'Odd', value: 'x' },
        { label: 'No value' },
      ],
      form: { submitLabel: 'Go', topics: ['One', '', 3, 'Two'] },
    });
    expect(result.heading.title).toBe('Talk to us');
    expect(result.heading.description).toBe(
      contactPageFallback.heading.description
    );
    expect(result.infoItems).toEqual([
      {
        icon: 'mail',
        tone: 'violet',
        label: 'Email',
        value: 'a@b.co',
        href: 'mailto:a@b.co',
      },
      { icon: 'phone', tone: 'blue', label: 'Odd', value: 'x', href: null },
    ]);
    expect(result.form.submitLabel).toBe('Go');
    expect(result.form.topics).toEqual(['One', 'Two']);
    expect(result.form.nameLabel).toBe(contactPageFallback.form.nameLabel);
  });
});
