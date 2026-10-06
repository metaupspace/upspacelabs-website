import type { Metadata } from 'next';
import PageFrame from '@/components/layout/PageFrame';
import { getBlogListing } from '@/lib/content/blog';
import { BlogGrid } from './fragments/BlogGrid';
import { BlogListHeader } from './fragments/BlogListHeader';

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getBlogListing();
  return { title: page.breadcrumbLabel, description: page.description };
}

export default async function BlogPage() {
  const { page, posts } = await getBlogListing();

  return (
    <PageFrame showGuides={false}>
      <BlogListHeader content={page} />
      <BlogGrid posts={posts} />
    </PageFrame>
  );
}
