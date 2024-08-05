import React, { FC } from 'react';
import Link from 'next/link';
import CardTitle from '../../asset/CardTitle/CardTitle';
import dynamic from 'next/dynamic';
import { Post } from "@repo/typescript-types";
import { ratingCalculator } from '@repo/shared-util';
import '../postCard.scss';
import CardStats from '@components/cards/asset/CardStats/CardStats';

const CardImageRendererUseClient = dynamic(() => import('../../asset/CardImageRenderer/CardImageRendererUseClient'));

interface PropTypes {
    locale: string;
    postUrl: string;
    numberOfCardsPerRowInMobile: number;
    index: number;
    isSidebar?: boolean;
    post: Post;
    isNextImageAllowed: boolean;
    dictionary: {
        [key: string]: string;
    };
    settings: {
        [key: string]: string;
    };
}

const UcgAdPostCard: FC<PropTypes> = ({
    post,
    locale,
    postUrl,
    isSidebar,
    index,
    dictionary,
    isNextImageAllowed,
    settings,
}) => {
    return (
        <article className={`postCard postCardAd${isSidebar ? ' postCardSidebar' : ''}`}>
            <div className={'cardMedia'}>
                <Link
                    href={postUrl}
                    className={'cardLink'}
                    title={post?.translations?.[locale as string]?.title ?? post?.title}
                >
                    <CardImageRendererUseClient
                        imageUrl={post.mainThumbnail}
                        isNextImageAllowed={isNextImageAllowed}
                        key={post?._id}
                        mediaAlt={post?.translations?.[locale as string]?.title ?? post?.title}
                        index={index}
                    />
                </Link>
            </div>

            <div className={`cardInfo`}>
                <CardTitle title={post?.translations?.[locale as string]?.title ?? post?.title} url={postUrl} />
                <CardStats
                    views={post?.views}
                    dictionary={dictionary}
                    likes={post?.likes}
                    dislikes={post?.dislikes}
                    createdAt={post?.createdAt}
                    updatedAt={post?.updatedAt}
                    settings={settings}
                />
            </div>
        </article>
    );
};
export default UcgAdPostCard;
