import PageFrame from '@/components/layout/PageFrame';
import { getLandingPageContent } from '@/lib/content/landing';
import { CardCarouselSection } from '@/components/sections/CardCarouselSection';
import { CustomerStories } from './fragments/CustomerStories';
import { FeaturedApps } from './fragments/FeaturedApps';
import { HeroSection } from './fragments/HeroSection';
import { PlatformSection } from './fragments/PlatformSection';
import { ProductShowcaseSection } from './fragments/ProductShowcaseSection';
import { ProductsHeading } from './fragments/ProductsHeading';

export default async function Home() {
  const {
    hero,
    productsHeading,
    featuredApps,
    platformHeading,
    featureRows,
    productShowcase,
    cardCarousel,
    customerStories,
  } = await getLandingPageContent();

  return (
    <PageFrame showGuides={false}>
      <HeroSection content={hero} />
      <ProductsHeading content={productsHeading} />
      <FeaturedApps content={featuredApps} />
      <PlatformSection heading={platformHeading} rows={featureRows} />
      <ProductShowcaseSection content={productShowcase} />
      <CardCarouselSection content={cardCarousel} />
      <CustomerStories stories={customerStories} />
    </PageFrame>
  );
}
