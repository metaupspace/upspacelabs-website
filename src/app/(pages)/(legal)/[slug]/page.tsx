import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageFrame from '@/components/layout/PageFrame';
import { getLegalPage, getLegalSlugs } from '@/lib/content/legal';
import { LegalDocument } from './fragments/LegalDocument';

interface LegalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getLegalSlugs()).map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: LegalPageProps): Promise<Metadata> {
  const page = await getLegalPage((await params).slug);
  if (!page) return {};
  return {
    title: page.title,
    description: `${page.title} for UpSpace Labs.`,
  };
}

export default async function LegalRoute({ params }: LegalPageProps) {
  const page = await getLegalPage((await params).slug);
  if (!page) notFound();

  return (
    <PageFrame>
      <LegalDocument page={page} />
    </PageFrame>
  );
}
