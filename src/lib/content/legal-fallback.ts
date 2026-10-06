import type { RawLegalPage } from '@/lib/strapi/legal-mappers';

/** Built-in legal pages, in the same shape Strapi returns: shown when Strapi is unreachable. */
export const legalPageFallbacks: RawLegalPage[] = [
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    lastUpdated: '2026-05-01',
    sections: [
      {
        heading: 'Acceptance of Terms',
        body: 'By accessing or using the UpSpace Labs website and products (the “Services”), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Services.\n\nThese Terms form a binding agreement between you (or the organisation you represent) and UpSpace Labs. Continued use of the Services means you accept any updates to these Terms, which we will post on this page with a new “Last Updated” date.',
      },
      {
        heading: 'Use of the Services',
        body: 'We grant you a limited, non-exclusive, non-transferable and revocable right to use the Services for your internal business purposes.\n\n### What you may not do\n\n- Share, resell, rent or sublicense access to the Services.\n- Reverse engineer, decompile or attempt to discover the source code of the Services.\n- Copy, modify or create derivative works from the Services.\n- Use the Services for any unlawful, defamatory or unauthorised purpose.',
      },
      {
        heading: 'Accounts and Security',
        body: 'You are responsible for the accuracy of the information you give us, for keeping your credentials confidential, and for all activity under your account.\n\nTell us immediately at the address below if you suspect unauthorised access. We may suspend an account to protect the Services or other customers.',
      },
      {
        heading: 'Acceptable Use',
        body: 'You agree to use the Services lawfully and respectfully. You must not upload malicious code, attempt to disrupt or overload the Services, probe them for vulnerabilities without our written permission, or use them to send spam or infringing content.\n\nWe may remove content or restrict access that breaks these rules.',
      },
      {
        heading: 'Plans and Payment',
        body: 'Paid plans are billed in advance for the period shown at purchase. Unless the law says otherwise, fees are non-refundable once a billing period has started.\n\nIf you are on a free trial, you can cancel before it ends without charge. We will give at least 30 days’ notice before changing prices for an existing subscription.',
      },
      {
        heading: 'Intellectual Property',
        body: 'UpSpace Labs keeps all rights, title and interest in the Services, including software, design, trademarks and documentation. These Terms do not transfer any ownership to you.\n\nYou keep ownership of the data you put into the Services. You give us the permission needed to host and process that data to provide the Services to you.',
      },
      {
        heading: 'Disclaimers and Liability',
        body: 'The Services are provided “as is” and “as available”, without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose and non-infringement.\n\nTo the extent the law allows, UpSpace Labs is not liable for indirect, incidental, special, consequential or punitive damages, and our total liability for any claim will not exceed the amount you paid for the Services in the 12 months before the claim.',
      },
      {
        heading: 'Termination',
        body: 'You may stop using the Services at any time. We may suspend or end your access if you breach these Terms or if we are required to by law.\n\nOn termination, your right to use the Services ends. You can export your data for 30 days afterwards, after which we delete it as described in our Privacy Policy.',
      },
      {
        heading: 'Contact Information',
        body: 'If you have any questions about these Terms, please contact us:\n\n- Email: hello@upspacelabs.com\n- Phone: +91 6000 831 966\n- Website: www.upspacelabs.com',
      },
    ],
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    lastUpdated: '2026-09-30',
    sections: [
      {
        heading: 'Introduction',
        body: 'UpSpace Labs (“UpSpace Labs”, “we”, “us”) is the product studio of MetaUpSpace, based in New Delhi, India.\n\nThis Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website or use our products, including CPMS and the UpSentrix suite. By using our website or products, you agree to the practices described in this policy.',
      },
      {
        heading: 'Information We Collect',
        body: 'We collect only the information we need to provide and improve our services:\n\n- Account details, such as your name, work email, phone number, and company name.\n- Billing details, such as billing address and payment information, processed securely by our payment partners.\n- Product data that you or your team add to our products, such as employee records, courses, or business records.\n- Usage data, such as pages visited, features used, device type, browser, and IP address.',
      },
      {
        heading: 'How We Use Your Information',
        body: 'We use your information to create and manage your account, provide and support our products, process payments, send service updates, improve our products, and keep our services secure. We do not sell your personal information to anyone.',
      },
      {
        heading: 'Sharing Your Information',
        body: 'We share information only with trusted service providers who help us run our business, such as hosting, payment, and email providers, and only as far as needed to deliver our services. We may also share information when required by law or to protect the rights, safety, and property of UpSpace Labs and our users.',
      },
      {
        heading: 'Data Security and Retention',
        body: 'We use industry-standard safeguards, including encryption in transit, access controls, and regular security reviews, to protect your data. We keep personal information only for as long as your account is active or as required by law. When data is no longer needed, we delete or anonymise it.',
      },
      {
        heading: 'Cookies',
        body: 'Our website uses cookies to remember your preferences, understand how visitors use the site, and improve performance. You can control cookies through your browser settings. Blocking some cookies may affect how the website works.',
      },
      {
        heading: 'Your Rights',
        body: 'You may have the right to access, correct, update, or delete your personal information, and to withdraw consent for certain uses. To make a request, contact us using the details below. We will respond within a reasonable time and in line with applicable law, including India’s Digital Personal Data Protection Act, 2023.',
      },
      {
        heading: 'Changes to This Policy',
        body: 'We may update this Privacy Policy from time to time. When we make significant changes, we will update the date at the top of this page and, where appropriate, notify you by email or through our products.',
      },
      {
        heading: 'Contact Us',
        body: 'If you have any questions about this Privacy Policy or how we handle your data, please contact us at:\nEmail: [privacy email]\nAddress: [registered office address], New Delhi, India',
      },
    ],
  },
  {
    slug: 'refund-policy',
    title: 'Refund Policy',
    lastUpdated: '2026-09-30',
    sections: [
      {
        heading: 'Overview',
        body: 'At UpSpace Labs, we want you to be happy with our products. This Refund Policy explains when you can request a refund for paid plans of CPMS and the UpSentrix suite, and how the process works.',
      },
      {
        heading: 'Free Trials',
        body: 'Where a free trial is available, you can try our products before you pay. We recommend using the trial to make sure a product meets your needs. You will not be charged if you cancel before the trial ends.',
      },
      {
        heading: 'Eligibility for Refunds',
        body: 'You may request a full refund within 14 days of your first payment for a new subscription if:\n\n- The product does not work as described and our support team cannot fix the issue.\n- You were charged incorrectly or more than once for the same plan.\n- You cancelled before renewal but were still charged for the next billing period.',
      },
      {
        heading: 'Non-Refundable Items',
        body: 'Refunds are generally not available for:\n\n- Renewal payments after the 14-day window has passed.\n- Partial months or unused time on an active subscription.\n- Custom setup, data migration, training, or other one-time services that have already been delivered.\n- Accounts suspended for breaking our Terms of Service.',
      },
      {
        heading: 'How to Request a Refund',
        body: 'Email our support team with your account email, invoice number, and the reason for your request. We will review your request and reply within 5 business days.',
      },
      {
        heading: 'Processing Refunds',
        body: 'Approved refunds are issued to the original payment method. Depending on your bank or card provider, it may take 7 to 10 business days for the amount to appear in your account.',
      },
      {
        heading: 'Cancelling Your Subscription',
        body: 'You can cancel your subscription at any time from your account settings. Your plan stays active until the end of the current billing period, and you will not be charged again.',
      },
      {
        heading: 'Changes to This Policy',
        body: 'We may update this Refund Policy from time to time. Any changes will be posted on this page with an updated date.',
      },
      {
        heading: 'Contact Us',
        body: 'For refund requests or questions about this policy, please contact us at:\nEmail: [billing email]\nAddress: [registered office address], New Delhi, India',
      },
    ],
  },
];
