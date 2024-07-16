import React, { FC } from 'react';
import { Meta } from 'typescript-types';
import Link from 'next/link';
import { capitalizeFirstLetter } from '@repo/shared-util';
import './CategoryCard.scss';
import CardImageRendererUseClient from '@components/cards/asset/CardImageRenderer/CardImageRendererUseClient';

interface CategoryCardPropTypes {
    meta: Meta;
    index: number;
    isSidebar?: boolean;
    metaUrl: string;
    isNextImageAllowed?: boolean;
    locale: string;
    dictionary: {
        [key: string]: string;
    };
}

const CategoryCard: FC<CategoryCardPropTypes> = ({
    meta,
    index,
    metaUrl,
    isSidebar,
    isNextImageAllowed = false,
    dictionary,
    locale,
}) => {

    return (
        <article className={`categoryCard${isSidebar ? ' categoryCardSidebar' : ''}`}>
            <Link href={metaUrl} className="categoryCardLink" title={meta?.translations?.[locale]?.name ?? meta?.name}>
                <CardImageRendererUseClient
                    imageUrl={meta.imageUrl}
                    key={meta?._id}
                    metaId={meta?._id}
                    isNextImageAllowed={isNextImageAllowed}
                    mediaAlt={meta?.translations?.[locale]?.name ?? meta?.name}
                    overlayShadow
                    index={index}
                />
                <div className={`cardInfo`}>
                    <h2 className={'cardTitle'}>
                        {capitalizeFirstLetter(meta?.translations?.[locale]?.name ?? meta?.name)}
                    </h2>
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
