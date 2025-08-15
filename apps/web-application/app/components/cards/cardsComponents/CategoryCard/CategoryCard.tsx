import React, { FC } from 'react';
import { IMeta } from '@repo/typescript-types';
import Link from 'next/link';
import { capitalizeFirstLetter } from '@repo/utils/dist/src';
import './CategoryCard.scss';
import CardImageRendererUseClient from '@components/cards/asset/CardImageRenderer/CardImageRendererUseClient';
import MetaCardImage from '@components/cards/asset/CardImageRenderer/MetaCardImage';

interface CategoryCardPropTypes {
  meta: IMeta;
  index: number;
  isSidebar?: boolean;
  metaUrl: string;
  isNextImageAllowed?: boolean;
  locale: string;
  dictionary: {
    [key: string]: string;
  };
}

const CategoryCard: FC<CategoryCardPropTypes> = ({ meta, index, metaUrl, isSidebar, isNextImageAllowed = false, dictionary, locale }) => {
  return (
    <article className={`categoryCard${isSidebar ? ' categoryCardSidebar' : ''}`}>
      <Link href={metaUrl} className="categoryCardLink" title={meta?.translations?.[locale]?.name ?? meta?.name}>
        <MetaCardImage
          usage={'categoryCard'}
          imageUrl={meta.imageUrl}
          key={meta?._id}
          metaId={meta?._id}
          isNextImageAllowed={isNextImageAllowed}
          mediaAlt={meta?.translations?.[locale]?.name ?? meta?.name}
          index={index}
        />
        <div className={`cardInfo`}>
          <h2 className={'cardTitle'}>{capitalizeFirstLetter(meta?.translations?.[locale]?.name ?? meta?.name)}</h2>
          <span className={'cardCounts smallText'}>
            {meta?.count}
            <span>{dictionary?.['Post'] || 'Post'}</span>
          </span>
        </div>
      </Link>
    </article>
  );
};

export default CategoryCard;
