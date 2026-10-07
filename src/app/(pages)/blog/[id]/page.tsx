import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageFrame from '@/components/layout/PageFrame';
import { CardCarouselSection } from '@/components/sections/CardCarouselSection';
import { getBlogPost } from '@/lib/content/blog';
import { plainText } from '@/lib/strapi/mappers';
import { BlogCaseStudy } from './fragments/BlogCaseStudy';
import { BlogHero } from './fragments/BlogHero';
import { BlogLogos } from './fragments/BlogLogos';

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost((await params).id);
  if (!post) return {};
  return {
    title: post.title,
    description: plainText(post.summary) || undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost((await params).id);
  if (!post) notFound();

  return (
    <PageFrame showGuides={false}>
      <BlogHero post={post} />
      <BlogLogos post={post} />
      <BlogCaseStudy post={post} />
      <CardCarouselSection content={post.moreStories} />
    </PageFrame>
  );
}
