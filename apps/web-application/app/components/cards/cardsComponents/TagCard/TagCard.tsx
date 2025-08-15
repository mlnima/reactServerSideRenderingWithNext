import { FC } from 'react';
import { IMeta } from '@repo/typescript-types';
import Link from 'next/link';
import { capitalizeFirstLetter } from '@repo/utils/dist/src';
import dynamic from 'next/dynamic';
import CardTitle from '@components/cards/asset/CardTitle/CardTitle';
import '../metaCard.scss';

// const TextToCanvasImage = dynamic(() => import('@components/cards/asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRendererUseClient = dynamic(() => import('../../asset/CardImageRenderer/CardImageRendererUseClient'));

interface TagCardPropTypes {
  meta: IMeta;
  index: number;
  locale: string;
  metaUrl: string;
  isSidebar?: boolean;
  isNextImageAllowed?: boolean;
}

const TagCard: FC<TagCardPropTypes> = ({ meta, index, locale, isSidebar, metaUrl, isNextImageAllowed = false }) => {
  return (
    <article className={`metaCard metaCardTag${isSidebar ? ' metaCardSidebar' : ''}`}>
      <div className={'cardMedia'}>
        <Link href={metaUrl} className="tagCardLink" title={meta?.translations?.[locale]?.name ?? (meta?.name as string)}>
          <CardImageRendererUseClient
            imageUrl={meta?.imageUrl}
            isNextImageAllowed={isNextImageAllowed}
            key={meta?._id}
            mediaAlt={meta?.translations?.[locale]?.name ?? meta?.name}
            index={index}
          />
          {/*{!!meta?.imageUrl ?*/}
          {/*    <CardImageRendererUseClient imageUrl={meta?.imageUrl}*/}
          {/*                                isNextImageAllowed={isNextImageAllowed}*/}
          {/*                                key={meta?._id}*/}
          {/*                                mediaAlt={meta?.translations?.[locale]?.name ?? meta?.name}*/}
          {/*                                index={index}/> :*/}
          {/*    <TextToCanvasImage title={capitalizeFirstLetter(meta?.translations?.[locale]?.name ?? meta?.name)}*/}
          {/*                       numberOfCardsPerRowInMobile={1}/>*/}
          {/*}*/}
        </Link>
      </div>
      <div className={`cardInfo`}>
        <CardTitle title={capitalizeFirstLetter(meta?.translations?.[locale]?.name ?? meta?.name)} url={`/tag/${meta?._id}`} />
      </div>
    </article>
  );
};
export default TagCard;
