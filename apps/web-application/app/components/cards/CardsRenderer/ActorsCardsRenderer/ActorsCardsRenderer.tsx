import React, { FC } from 'react';
import ActorCard from '@components/cards/cardsComponents/ActorCard/ActorCard';
import { IMeta } from '@repo/typescript-types';
import './ActorsCardsRenderer.scss';

interface IProps {
  metas?: IMeta[];
  isSidebar?: boolean;
  locale: string;
  dictionary: {
    [key: string]: string;
  };
}

const ActorsCardsRenderer: FC<IProps> = ({
  metas,
  isSidebar,
  locale,
  dictionary,
}) => {
  return (
    <div
      className={`actorsCardsWrapper ${isSidebar ? 'actorsCardsWrapperSidebar' : ''}`}
    >
      {metas?.map((meta, index) => {
        const imagesAllowedDomainsForNextImage =
          process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES?.split(' ') || [];
        const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

        const isNextImageAllowed = meta.imageUrl
          ? imagesAllowedDomainsForNextImage?.some((domain) =>
              meta.imageUrl?.includes(domain)
            )
          : false;

        const actorUrl =
          locale === defaultLocale
            ? `/actor/${meta._id}`
            : `/${locale}/actor/${meta._id}`;

        return (
          <ActorCard
            key={meta._id}
            index={index}
            dictionary={dictionary}
            actorUrl={actorUrl}
            isNextImageAllowed={isNextImageAllowed}
            isSidebar={isSidebar}
            meta={meta}
          />
        );
      })}
    </div>
  );
};
export default ActorsCardsRenderer;
