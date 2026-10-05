import PageFrame from '@/components/layout/PageFrame';
import { getLandingPageContent } from '@/lib/content/landing';
import { HeroSection } from './fragments/HeroSection';

export default async function Home() {
  const { hero } = await getLandingPageContent();

  return (
    <PageFrame>
      <HeroSection content={hero} />
    </PageFrame>
  );
}
