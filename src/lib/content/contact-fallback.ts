import type { ContactPageContent } from '@/lib/types';

/** Shown whenever Strapi is unreachable or the contact page is not filled in. */
export const contactPageFallback: ContactPageContent = {
  heading: {
    title: 'Having any issues?',
    description:
      'Tell us what is going wrong or what you need. Our team usually replies within one working day.',
  },
  infoItems: [
    {
      icon: 'phone',
      tone: 'green',
      label: 'Phone',
      value: '+91 6000 831 966',
      href: 'tel:+916000831966',
    },
    {
      icon: 'mail',
      tone: 'blue',
      label: 'Email',
      value: 'hello@upspacelabs.com',
      href: 'mailto:hello@upspacelabs.com',
    },
    {
      icon: 'clock',
      tone: 'green',
      label: 'Support hours',
      value: 'Mon – Fri, 9:00 AM – 6:00 PM IST',
      href: null,
    },
  ],
  form: {
    nameLabel: 'Full name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'you@company.com',
    phoneLabel: 'Phone',
    phonePlaceholder: '+91 6000 831 966',
    topicLabel: 'What do you need help with?',
    topicPlaceholder: 'Select a topic',
    topics: [
      'Product demo',
      'Pricing',
      'Technical support',
      'Billing',
      'Partnership',
      'Something else',
    ],
    messageLabel: 'How can we help?',
    messagePlaceholder: 'Tell us a little about what is happening',
    submitLabel: 'Send message',
    successTitle: 'Thanks, we got your message',
    successMessage:
      'Someone from our team will get back to you within one working day.',
    errorMessage: 'We could not send your message. Please try again shortly.',
  },
};
