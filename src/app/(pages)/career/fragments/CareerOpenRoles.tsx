'use client';

import { ListingRows } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { AppLink } from '@/components/shared/AppLink';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { useOpenRoles } from '@/hooks/useOpenRoles';
import type { OpenRolesContent } from '@/lib/types';

/**
 * "Open roles at UpSpace Labs": a centred heading over the design system's
 * ListingRows (sized at ~0.85 of its defaults, as designed) — one grey row per job (position, team, location, an
 * up-right arrow), each linking to the role's page. The roles come from the
 * Job Portal API through `useOpenRoles`. `open-roles` is the
 * target of the hero's "See Open Roles" button.
 */
export function CareerOpenRoles({ content }: { content: OpenRolesContent }) {
  // Jobs from the Job Portal API (prefetched on the server), built-in ones while it is down.
  const { roles } = useOpenRoles(content.jobs);

  return (
    <section
      id="open-roles"
      aria-label={content.title}
      className="scroll-mt-24"
    >
      <SectionHeading
        content={content}
        className="pt-4 pb-10 md:pb-[86px]"
        subtitleMaxWidth="30rem"
        classNames={{
          content: 'px-6',
          headline:
            'text-[30px] font-bold tracking-[-0.02em] [font-variation-settings:normal] [line-height:1.2] md:text-[2.42rem]',
          subtitle:
            'mt-3 text-[15px] text-neutral-500 [line-height:23px] md:text-[15.5px] dark:text-neutral-400',
        }}
      />
      <InnerGuideContent contentClassName="px-6 pb-20 md:pb-24">
        <ListingRows
          aria-label="Open positions"
          items={roles.map(job => ({
            id: job.slug,
            title: job.title,
            fields: { team: job.team ?? '', location: job.location ?? '' },
            href: `/career/${job.slug}`,
          }))}
          columns={[
            {
              key: 'team',
              label: 'Team',
              width: '7rem',
              align: 'end',
              textAlign: 'start',
            },
            {
              key: 'location',
              label: 'Location',
              width: '4.5rem',
              align: 'center',
              textAlign: 'center',
              hideOnMobile: true,
            },
          ]}
          linkComponent={AppLink}
          emptyMessage="No open roles right now — write to us anyway at hello@upspacelabs.com."
          // The design runs at ~0.85 of the block's defaults.
          rowHeight="102px"
          gap="12px"
          columnGap="44px"
          iconGap="51px"
          classNames={{
            row: 'md:pl-[34px] md:pr-6',
            label: 'md:text-[13.5px] md:[line-height:20px]',
            title: 'md:text-[18px] md:[line-height:26px]',
            value: 'md:text-[18px] md:[line-height:26px]',
            icon: 'md:[&>svg]:size-[41px]',
          }}
        />
      </InnerGuideContent>
    </section>
  );
}
