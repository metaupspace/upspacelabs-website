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
      {/* Unlike the home hero: a darker subtitle and the team photo set further down.
          Figma desktop: the 48/58 title (-0.4px) 151px down, 15px over the 14px
          Medium text, the Medium buttons 25px under it (the second 43px tall,
          -4%), and 65px lower the photo cropped to 1107×564 — zoomed 1.126× as
          Figma's fill crops it (square corners, as asked). */}
      <HeroSection
        content={hero}
        classNames={{
          root: 'md:pt-[151px]',
          headline: 'md:tracking-[-0.4px] md:[line-height:58px]',
          subtitle:
            'text-neutral-500 md:mt-[15px] md:text-[14px] md:font-medium dark:text-neutral-400',
          actionsRow: 'md:mt-[25px]',
          actions: 'md:font-medium md:tracking-[-0.02em]',
          secondaryAction: 'md:h-[43px] md:tracking-[-0.04em]',
          media: 'mt-[45px] md:mt-[65px]',
          frame: 'md:aspect-[1110/564]',
          image:
            'md:h-full md:scale-[1.126] md:object-cover md:object-[50%_18.6%]',
        }}
      />
      <AboutFounded content={founded} />
      <AboutTeam content={team} />
      <OfficesSection content={offices} variant="figma" />
      <AboutProgress content={progress} />
      {/* With the page's 96px bottom padding: 107px from the cards to the footer (Figma). */}
      <CardCarouselSection
        content={stories}
        variant="figma"
        carouselClassName="px-[43px] pb-16 md:px-0 md:pb-[11px]"
      />
    </PageFrame>
  );
}
