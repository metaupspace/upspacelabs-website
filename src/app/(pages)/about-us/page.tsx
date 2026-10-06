import type { Metadata } from 'next';
import PageFrame from '@/components/layout/PageFrame';
import { CardCarouselSection } from '@/components/sections/CardCarouselSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { OfficesSection } from '@/components/sections/OfficesSection';
import { getAboutPageContent } from '@/lib/content/about';
import { plainText } from '@/lib/strapi/mappers';
import { AboutFounded } from './fragments/AboutFounded';
import { AboutProgress } from './fragments/AboutProgress';
import { AboutTeam } from './fragments/AboutTeam';

export async function generateMetadata(): Promise<Metadata> {
  const { hero } = await getAboutPageContent();
  return { title: 'About Us', description: plainText(hero.subtitle) };
}

export default async function AboutPage() {
  const { hero, founded, team, offices, progress, stories } =
    await getAboutPageContent();

  return (
    <PageFrame showGuides={false}>
      {/* Unlike the home hero: a darker subtitle and the team photo set further down. */}
      <HeroSection
        content={hero}
        classNames={{
          subtitle: 'text-neutral-500 dark:text-neutral-400',
          media: 'mt-[45px] md:mt-[67px]',
        }}
      />
      <AboutFounded content={founded} />
      <AboutTeam content={team} />
      <OfficesSection content={offices} />
      <AboutProgress content={progress} />
      {/* Narrower title so it wraps after "your", as designed. */}
      <CardCarouselSection content={stories} headlineMaxWidth="38rem" />
    </PageFrame>
  );
}
