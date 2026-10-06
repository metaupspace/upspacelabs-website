'use client';

import { useId, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  CircleCheck,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Timer,
} from '@metaupspace/icons';
import { Button, Input, Select, SelectItem } from '@metaupspace/ui';
import {
  normalizeSubmission,
  validateSubmission,
  type ContactErrors,
} from '@/lib/contact/validate';
import type {
  ContactIcon,
  ContactInfoItem,
  ContactPageContent,
  ContactSubmission,
  ContactTone,
} from '@/lib/types';

const ICONS: Record<ContactIcon, typeof Phone> = {
  phone: Phone,
  mail: Mail,
  location: MapPin,
  clock: Timer,
  chat: MessageCircle,
};

/**
 * Double disc behind each icon: a very pale outer circle and a stronger inner one
 * (about 70% of its size), both flat, with a saturated glyph on top.
 */
const TONES: Record<ContactTone, { outer: string; inner: string }> = {
  green: {
    outer: 'bg-green-50 dark:bg-green-500/[0.07]',
    inner:
      'bg-green-100 text-green-600 dark:bg-green-500/[0.14] dark:text-green-400',
  },
  blue: {
    outer: 'bg-indigo-50 dark:bg-indigo-500/[0.07]',
    inner:
      'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/[0.14] dark:text-indigo-300',
  },
  violet: {
    outer: 'bg-violet-50 dark:bg-violet-500/[0.07]',
    inner:
      'bg-violet-100 text-violet-600 dark:bg-violet-500/[0.14] dark:text-violet-300',
  },
  amber: {
    outer: 'bg-amber-50 dark:bg-amber-500/[0.07]',
    inner:
      'bg-amber-100 text-amber-600 dark:bg-amber-500/[0.14] dark:text-amber-300',
  },
};

/** The design system's Input has light-only colours here, so give it a dark skin. */
const INPUT_CLASSES = {
  label: 'dark:text-neutral-200',
  field:
    'dark:border-neutral-700 dark:bg-neutral-900 dark:focus-within:border-indigo-400',
  input:
    'dark:bg-transparent dark:text-white dark:placeholder:text-neutral-500',
  helperText: 'dark:text-neutral-400',
} as const;

const EMPTY: ContactSubmission = {
  name: '',
  email: '',
  phone: '',
  topic: '',
  message: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

function InfoItem({ item }: { item: ContactInfoItem }) {
  const Icon = ICONS[item.icon];
  const external = item.href?.startsWith('http');
  const tone = TONES[item.tone];
  return (
    <li className="flex flex-col gap-3">
      <span
        aria-hidden
        className={`flex size-[4.5rem] items-center justify-center rounded-full ${tone.outer}`}
      >
        <span
          className={`flex size-[3.15rem] items-center justify-center rounded-full ${tone.inner}`}
        >
          <Icon size={24} strokeWidth={2} />
        </span>
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg leading-tight font-semibold text-neutral-950 dark:text-white">
          {item.label}
        </h3>
        {item.href ? (
          <a
            href={item.href}
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="w-fit text-sm text-neutral-500 transition-colors hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-300"
          >
            {item.value}
          </a>
        ) : (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {item.value}
          </p>
        )}
      </div>
    </li>
  );
}

export function ContactSection({ content }: { content: ContactPageContent }) {
  const { heading, infoItems, form: copy } = content;
  const headingId = useId();
  const [values, setValues] = useState<ContactSubmission>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const honeypot = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof ContactSubmission) => (value: string) => {
    setValues(v => ({ ...v, [key]: value }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    const data = normalizeSubmission(values);
    const found = validateSubmission(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus('idle');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          website: honeypot.current?.value ?? '',
        }),
      });
      if (res.status === 400) {
        const body = (await res.json().catch(() => null)) as {
          errors?: ContactErrors;
        } | null;
        setErrors(body?.errors ?? {});
        setStatus('idle');
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      setValues(EMPTY);
      setStatus('success');
      // Move focus to the confirmation so screen readers announce it.
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      aria-labelledby={headingId}
      className="mx-auto w-full max-w-(--frame) px-(--gutter) pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <header className="mx-auto flex max-w-[34rem] flex-col items-center text-center">
        <h1
          id={headingId}
          className="text-3xl font-semibold tracking-[-0.04em] text-neutral-950 md:text-[2.5rem] md:leading-[1.2] dark:text-white"
        >
          {heading.title}
        </h1>
        {heading.description && (
          <p className="mt-4 text-sm leading-6 text-neutral-500 md:text-base dark:text-neutral-400">
            {heading.description}
          </p>
        )}
      </header>

      <div className="mt-12 grid gap-12 md:mt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] md:gap-16 md:px-8 lg:gap-24 lg:px-16">
        <ul className="order-2 grid gap-8 self-start sm:grid-cols-2 md:order-none md:grid-cols-1 md:gap-12 md:pt-7">
          {infoItems.map(item => (
            <InfoItem key={`${item.label}-${item.value}`} item={item} />
          ))}
        </ul>

        {status === 'success' ? (
          <div
            ref={successRef}
            tabIndex={-1}
            role="status"
            className="order-1 flex h-fit flex-col items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 outline-none md:order-none dark:border-emerald-500/20 dark:bg-emerald-500/5"
          >
            <CircleCheck
              aria-hidden
              size={32}
              className="text-emerald-600 dark:text-emerald-400"
            />
            <h2 className="text-xl font-semibold text-neutral-950 dark:text-white">
              {copy.successTitle}
            </h2>
            <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
              {copy.successMessage}
            </p>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setStatus('idle')}
              className="mt-2"
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            aria-describedby={
              status === 'error' ? `${headingId}-error` : undefined
            }
            className="order-1 flex flex-col gap-5 md:order-none"
          >
            <Input
              classNames={INPUT_CLASSES}
              label={copy.nameLabel}
              placeholder={copy.namePlaceholder}
              value={values.name}
              onChange={set('name')}
              errorMessage={errors.name}
              autoComplete="name"
              maxLength={100}
              required
            />
            <Input
              classNames={INPUT_CLASSES}
              type="email"
              label={copy.emailLabel}
              placeholder={copy.emailPlaceholder}
              value={values.email}
              onChange={set('email')}
              errorMessage={errors.email}
              startIcon={null}
              autoComplete="email"
              maxLength={254}
              required
            />
            <Input
              classNames={INPUT_CLASSES}
              label={copy.phoneLabel}
              placeholder={copy.phonePlaceholder}
              value={values.phone}
              onChange={set('phone')}
              errorMessage={errors.phone}
              autoComplete="tel"
              inputMode="tel"
              maxLength={20}
            />
            <div className="flex flex-col gap-1.5">
              <Select
                label={copy.topicLabel}
                placeholder={copy.topicPlaceholder}
                value={values.topic}
                onValueChange={set('topic')}
              >
                {copy.topics.map(topic => (
                  <SelectItem key={topic} value={topic} label={topic} />
                ))}
              </Select>
              {errors.topic && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.topic}
                </p>
              )}
            </div>
            <Input
              classNames={INPUT_CLASSES}
              type="textarea"
              rows={5}
              autoResize={false}
              label={copy.messageLabel}
              placeholder={copy.messagePlaceholder}
              value={values.message}
              onChange={set('message')}
              errorMessage={errors.message}
              maxLength={2000}
              required
            />

            {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
            <input
              ref={honeypot}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            {status === 'error' && (
              <p
                id={`${headingId}-error`}
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
              >
                {copy.errorMessage}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={status === 'submitting'}
              endIcon={<ArrowRight aria-hidden />}
              className="mt-2"
            >
              {copy.submitLabel}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
