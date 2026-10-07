import type { Metadata } from 'next';
import PageFrame from '@/components/layout/PageFrame';
import { getContactPageContent } from '@/lib/content/contact';
import { ContactSection } from './fragments/ContactSection';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the UpSentrix team: product questions, support, billing and partnerships.',
};

export default async function ContactUsPage() {
  const content = await getContactPageContent();

  return (
    <PageFrame>
      <ContactSection content={content} />
    </PageFrame>
  );
}
