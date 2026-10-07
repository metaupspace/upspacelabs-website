import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ImageAsset } from '@/lib/types';

export interface OfficeMapCardClassNames {
  root?: string;
  background?: string;
  /** The white frame around the map. */
  frame?: string;
  map?: string;
}

export interface OfficeMapCardProps {
  /** Names the map for screen readers ("Map of our Delhi office"). */
  label: string;
  /** What the map shows — an address, a place name or "lat,lng". */
  mapQuery: string;
  /** Google Maps zoom level, 3 (continent) to 20 (building). Default 15. */
  mapZoom?: number;
  /** Illustration behind the map. */
  background: ImageAsset;
  /** Soften the illustration so the map stands out. Default `true`. */
  blurBackground?: boolean;
  /** `sizes` of the background image. Default half the screen from md up. */
  backgroundSizes?: string;
  /** CSS `aspect-ratio` of the card. Default "507 / 376". */
  aspectRatio?: string;
  /** Width of the map frame, as a share of the card. Default "70%". */
  mapWidth?: string;
  /** Height of the map frame, as a share of the card. Default "73%". */
  mapHeight?: string;
  className?: string;
  classNames?: OfficeMapCardClassNames;
}

/** Google Maps embed (no API key) for a place or "lat,lng". */
export const googleMapsEmbedUrl = (query: string, zoom = 15) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;

/**
 * An office card: a city illustration filling a rounded card, with a live,
 * interactive Google map in a white frame centred on top. The map is a
 * keyless embed, loaded lazily as the card nears the screen.
 */
export function OfficeMapCard({
  label,
  mapQuery,
  mapZoom = 15,
  background,
  blurBackground = true,
  backgroundSizes = '(min-width: 768px) 45vw, 100vw',
  aspectRatio = '507 / 376',
  mapWidth = '70%',
  mapHeight = '73%',
  className,
  classNames,
}: OfficeMapCardProps) {
  return (
    <div
      style={{ aspectRatio }}
      className={cn(
        'relative isolate flex w-full items-center justify-center overflow-hidden rounded-[10px] bg-neutral-100 dark:bg-neutral-900',
        classNames?.root,
        className
      )}
    >
      <Image
        src={background.src}
        alt=""
        fill
        sizes={backgroundSizes}
        className={cn(
          '-z-10 object-cover',
          // Scaled up a touch so the blur doesn't fade the edges.
          blurBackground && 'scale-105 blur-[2px]',
          classNames?.background
        )}
      />
      <div
        style={{ width: mapWidth, height: mapHeight }}
        className={cn(
          'rounded-[14px] bg-white p-[8px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:bg-neutral-900',
          classNames?.frame
        )}
      >
        <iframe
          src={googleMapsEmbedUrl(mapQuery, mapZoom)}
          title={label}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className={cn(
            'block h-full w-full rounded-[8px] border-0 bg-neutral-100 dark:bg-neutral-800',
            classNames?.map
          )}
        />
      </div>
    </div>
  );
}
