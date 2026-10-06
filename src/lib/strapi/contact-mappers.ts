import { contactPageFallback } from '@/lib/content/contact-fallback';
import type {
  ContactFormContent,
  ContactIcon,
  ContactInfoItem,
  ContactPageContent,
  ContactTone,
} from '@/lib/types';

interface RawInfoItem {
  icon?: string | null;
  tone?: string | null;
  label?: string | null;
  value?: string | null;
  href?: string | null;
}

export interface RawContactPage {
  title?: string | null;
  description?: string | null;
  infoItems?: RawInfoItem[] | null;
  form?:
    | (Partial<Record<keyof ContactFormContent, unknown>> & {
        topics?: unknown;
      })
    | null;
}

const ICONS: readonly ContactIcon[] = [
  'phone',
  'mail',
  'location',
  'clock',
  'chat',
];
const TONES: readonly ContactTone[] = ['green', 'blue', 'violet', 'amber'];

const nonEmpty = (v?: string | null): v is string => !!v && v.trim() !== '';
const oneOf = <T extends string>(v: unknown, allowed: readonly T[], d: T): T =>
  allowed.includes(v as T) ? (v as T) : d;

function mapInfoItems(raw?: RawInfoItem[] | null): ContactInfoItem[] {
  return (raw ?? []).flatMap((i): ContactInfoItem[] =>
    nonEmpty(i.label) && nonEmpty(i.value)
      ? [
          {
            icon: oneOf(i.icon, ICONS, 'phone'),
            tone: oneOf(i.tone, TONES, 'blue'),
            label: i.label,
            value: i.value,
            href: nonEmpty(i.href) ? i.href : null,
          },
        ]
      : []
  );
}

function mapForm(raw: RawContactPage['form']): ContactFormContent {
  const fb = contactPageFallback.form;
  const text = (key: Exclude<keyof ContactFormContent, 'topics'>) => {
    const value = raw?.[key];
    return typeof value === 'string' && value.trim() !== '' ? value : fb[key];
  };
  const topics = Array.isArray(raw?.topics)
    ? (raw.topics as unknown[]).filter(
        (t): t is string => typeof t === 'string' && t.trim() !== ''
      )
    : [];
  return {
    nameLabel: text('nameLabel'),
    namePlaceholder: text('namePlaceholder'),
    emailLabel: text('emailLabel'),
    emailPlaceholder: text('emailPlaceholder'),
    phoneLabel: text('phoneLabel'),
    phonePlaceholder: text('phonePlaceholder'),
    topicLabel: text('topicLabel'),
    topicPlaceholder: text('topicPlaceholder'),
    topics: topics.length ? topics : fb.topics,
    messageLabel: text('messageLabel'),
    messagePlaceholder: text('messagePlaceholder'),
    submitLabel: text('submitLabel'),
    successTitle: text('successTitle'),
    successMessage: text('successMessage'),
    errorMessage: text('errorMessage'),
  };
}

/** Maps a Strapi entry; every missing field falls back to the static copy. */
export function mapContactPageContent(raw: RawContactPage): ContactPageContent {
  const fb = contactPageFallback;
  const infoItems = mapInfoItems(raw.infoItems);
  return {
    heading: {
      title: nonEmpty(raw.title) ? raw.title : fb.heading.title,
      description: nonEmpty(raw.description)
        ? raw.description
        : fb.heading.description,
    },
    infoItems: infoItems.length ? infoItems : fb.infoItems,
    form: mapForm(raw.form),
  };
}
