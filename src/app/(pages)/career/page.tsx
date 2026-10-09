import type { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import PageFrame from '@/components/layout/PageFrame';
import { CardCarouselSection } from '@/components/sections/CardCarouselSection';
import { OfficesSection } from '@/components/sections/OfficesSection';
import { jobsQueryOptions } from '@/hooks/useJobs';
import { getAboutPageContent } from '@/lib/content/about';
import { getCareerPageContent } from '@/lib/content/career';
import { CareerFrame } from './fragments/CareerFrame';
import { CareerGallery } from './fragments/CareerGallery';
import { CareerHero } from './fragments/CareerHero';
import { CareerHowWeWork } from './fragments/CareerHowWeWork';
import { CareerOpenRoles } from './fragments/CareerOpenRoles';
import { CareerWhyJoin } from './fragments/CareerWhyJoin';

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getCareerPageContent();
  return { title: 'Careers', description: hero.subtitle };
}

export default async function CareerPage() {
  // The closing offices and card-carousel sections are the About page's.
  const [
    { hero, gallery, whyJoin, openRoles, howWeWork, officesHeading },
    about,
  ] = await Promise.all([getCareerPageContent(), getAboutPageContent()]);

  // Open roles from the Job Portal API, fetched here so they are in the HTML;
  // the browser's query cache picks them up (a failure just leaves it empty).
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(jobsQueryOptions());

  return (
    <PageFrame showGuides={false}>
      <CareerFrame>
        <CareerHero content={hero} />
        <CareerGallery videos={gallery} />
      </CareerFrame>
      {/* Outside the inner card: its lines end above this section. */}
      <CareerWhyJoin content={whyJoin} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CareerOpenRoles content={openRoles} />
      </HydrationBoundary>
      <CareerHowWeWork content={howWeWork} />
      <OfficesSection
        content={{ ...about.offices, ...officesHeading }}
        variant="figma"
        subtitleMaxWidth="min(34rem, 467px)"
      />
      {/* Figma desktop: 69px under the maps. */}
      <CardCarouselSection
        content={about.stories}
        variant="figma"
        headingClassName="pt-16 pb-10 md:pt-[69px] md:pb-[34px]"
      />
    </PageFrame>
  );
}
