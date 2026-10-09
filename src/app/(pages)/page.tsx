import PageFrame from '@/components/layout/PageFrame';
import { getLandingPageContent } from '@/lib/content/landing';
import { CardCarouselSection } from '@/components/sections/CardCarouselSection';
import { CustomerStories } from './fragments/CustomerStories';
import { FeaturedApps } from './fragments/FeaturedApps';
import { HeroSection } from '@/components/sections/HeroSection';
import { PlatformSection } from './fragments/PlatformSection';
import { ProductShowcaseSection } from './fragments/ProductShowcaseSection';
import { ProductsHeading } from './fragments/ProductsHeading';

/**
 * Figma desktop: the 48/58 title (-0.4px) 171px down, 15px over the 14px
 * Medium text, the Medium buttons 30px under it; the image cropped to 1110×630.
 */
const HOME_HERO_CLASSNAMES = {
  root: 'md:pt-[171px]',
  headline: 'md:tracking-[-0.4px] md:[line-height:58px]',
  actionsRow: 'md:mt-[30px]',
  image: 'md:aspect-[1110/630] md:object-cover md:object-[50%_6%]',
  subtitle: 'md:mt-[15px] md:text-[14px] md:font-medium',
  actions: 'md:font-medium md:tracking-[-0.02em]',
};

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
      {/* Figma desktop: -0.4px title tracking, 14px Medium description, Medium buttons. */}
      <HeroSection content={hero} classNames={HOME_HERO_CLASSNAMES} />
      <ProductsHeading content={productsHeading} />
      <FeaturedApps content={featuredApps} />
      <PlatformSection heading={platformHeading} rows={featureRows} />
      <ProductShowcaseSection content={productShowcase} />
      <CardCarouselSection content={cardCarousel} variant="figma" />
      <CustomerStories stories={customerStories} />
    </PageFrame>
  );
}
