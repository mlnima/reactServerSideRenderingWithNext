import React, { FC } from 'react';
import { IMeta } from '@repo/typescript-types';
import Link from 'next/link';
import { capitalizeFirstLetter } from '@repo/utils';
import CardTitle from '@components/cards/asset/CardTitle/CardTitle';
import './ActorCard.scss';
import MetaCardImage from '@components/cards/asset/CardImageRenderer/MetaCardImage';

interface ActorCardPropTypes {
  meta: IMeta;
  index: number;
  isSidebar?: boolean;
  actorUrl: string;
  isNextImageAllowed: boolean;
  dictionary: {
    [key: string]: string;
  };
}

const ActorCard: FC<ActorCardPropTypes> = (
  {
    meta,
    index,
    isSidebar,
    actorUrl,
    isNextImageAllowed = false,
    dictionary,
  }) => {
  return (
    <article className={`actor-card metaCard${isSidebar ? ' actorCardSidebar' : ''}`}>

      <Link href={actorUrl} className="actor-card-link" title={meta?.name as string}>
        <MetaCardImage
          usage={'actorCard'}
          imageUrl={meta.imageUrl}
          key={meta?._id}
          metaId={meta?._id}
          mediaAlt={meta?.name}
          isNextImageAllowed={isNextImageAllowed}
          index={index}
          aspectRatio={'1/1'}
        />

        <div className={`card-info`}>
          <CardTitle title={capitalizeFirstLetter(meta?.name)} useLink={false} url={actorUrl} />
          <span className={'actorCardCounts smallText'}>

                {meta?.count}
            <span>{dictionary?.['Videos'] || 'Videos'}</span>
          </span>
        </div>

      </Link>
    </article>
  );
};
export default ActorCard;
