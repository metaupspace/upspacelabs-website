import { VideoGallery } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import type { CareerVideo } from '@/lib/types';

/**
 * Life at UpSpace Labs in video: the design system's VideoGallery in its
 * bento layout (tall tile, two stacked tiles, tall tile), inset 24px from the
 * page guides. Tiles 280px tall rows, 12px apart, 10px corners, a 38px play
 * button; playing opens the design system's modal player. Phones get a
 * full-bleed carousel: one video at a time, advancing every 4 seconds.
 */
export function CareerGallery({ videos }: { videos: CareerVideo[] }) {
  if (!videos.length) return null;

  return (
    <InnerGuideContent contentClassName="pb-16 md:px-6 md:pb-[72px]">
      <VideoGallery
        aria-label="Life at UpSpace Labs"
        items={videos.map((video, index) => ({
          id: `video-${index}`,
          title: video.title,
          poster: { src: video.poster.src, alt: video.poster.alt },
          src: video.src ?? undefined,
          playButton: video.playButton,
        }))}
        gap="12px"
        rowHeight="280px"
        radius="10px"
        // Phones: one full-bleed, near-square video at a time, sliding on every 4s.
        mobileLayout="carousel"
        mobileInterval={4000}
        mobileAspectRatio="483 / 505"
        classNames={{
          root: 'max-md:gap-0',
          tile: 'max-md:rounded-none',
          playButton:
            'size-[54px] md:size-[38px] [&_svg]:size-[22px] md:[&_svg]:size-4',
        }}
      />
    </InnerGuideContent>
  );
}
