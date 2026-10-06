import type { ContactSubmission } from '@/lib/types';

export type ContactErrors = Partial<Record<keyof ContactSubmission, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-\s\d]{7,20}$/;

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  phone: 20,
  topic: 100,
  message: 2000,
} as const;

/** Trims every field; non-strings become empty. Safe to run on untrusted JSON. */
export function normalizeSubmission(input: unknown): ContactSubmission {
  const raw = (input && typeof input === 'object' ? input : {}) as Record<
    string,
    unknown
  >;
  const field = (key: keyof ContactSubmission) =>
    typeof raw[key] === 'string' ? (raw[key] as string).trim() : '';
  return {
    name: field('name'),
    email: field('email'),
    phone: field('phone'),
    topic: field('topic'),
    message: field('message'),
  };
}

/** Shared by the form (instant feedback) and the API route (the real check). */
export function validateSubmission(data: ContactSubmission): ContactErrors {
  const errors: ContactErrors = {};
  if (!data.name) errors.name = 'Please enter your name.';
  else if (data.name.length > CONTACT_LIMITS.name)
    errors.name = 'Name is too long.';

  if (!data.email) errors.email = 'Please enter your email.';
  else if (!EMAIL.test(data.email) || data.email.length > CONTACT_LIMITS.email)
    errors.email = 'Please enter a valid email address.';

  if (data.phone && !PHONE.test(data.phone))
    errors.phone = 'Please enter a valid phone number.';

  if (data.topic.length > CONTACT_LIMITS.topic)
    errors.topic = 'Please pick a topic from the list.';

  if (!data.message) errors.message = 'Please tell us how we can help.';
  else if (data.message.length > CONTACT_LIMITS.message)
    errors.message = `Message must be ${CONTACT_LIMITS.message} characters or fewer.`;

  return errors;
}
