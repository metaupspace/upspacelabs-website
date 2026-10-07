import type { SectionHeadingContent } from './shared';

export type ContactIcon = 'phone' | 'mail' | 'location' | 'clock' | 'chat';
export type ContactTone = 'green' | 'blue' | 'violet' | 'amber';

export interface ContactInfoItem {
  icon: ContactIcon;
  tone: ContactTone;
  label: string;
  value: string;
  /** Makes the value a link (`tel:`, `mailto:`, a map URL…). */
  href: string | null;
}

export interface ContactFormContent {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  topicLabel: string;
  topicPlaceholder: string;
  topics: string[];
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  errorMessage: string;
}

export interface ContactPageContent {
  heading: SectionHeadingContent;
  infoItems: ContactInfoItem[];
  form: ContactFormContent;
}

/** What the browser posts to `/api/contact`. */
export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}
