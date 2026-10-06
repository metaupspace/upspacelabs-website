import { VideoGallery } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import type { CareerVideo } from '@/lib/types';

/**
 * Life at UpSpace Labs in video: the design system's VideoGallery in its
 * bento layout (tall tile, two stacked tiles, tall tile), inset 24px from the
 * page guides. Tiles 280px tall rows, 12px apart, 10px corners, a 38px play
 * button; playing opens the design system's modal player. Phones stack the
 * tiles.
 */
export function CareerGallery({ videos }: { videos: CareerVideo[] }) {
  if (!videos.length) return null;

  return (
    <InnerGuideContent contentClassName="px-6 pb-16 md:pb-[72px]">
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
        mobileAspectRatio="406 / 283"
        classNames={{ playButton: 'size-[38px] [&_svg]:size-4' }}
      />
    </InnerGuideContent>
  );
}
