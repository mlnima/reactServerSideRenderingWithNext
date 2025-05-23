import React, { FC } from 'react';
import Link from 'next/link';
import CardTitle from '../../asset/CardTitle/CardTitle';
import dynamic from 'next/dynamic';
import { IPost } from "@repo/typescript-types";
import '../postCard.scss';
import CardStats from '@components/cards/asset/CardStats/CardStats';

const CardImageRendererUseClient = dynamic(() => import('../../asset/CardImageRenderer/CardImageRendererUseClient'));

interface PropTypes {
    locale: string;
    postUrl: string;
    numberOfCardsPerRowInMobile: number;
    index: number;
    isSidebar?: boolean;
    post: IPost;
    isNextImageAllowed: boolean;
    dictionary: {
        [key: string]: string;
    };
    settings: {
        showViewsOnCard:  boolean,
        showRatingOnCard:  boolean,
        showDateOnCard:  boolean,
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
                    dislikes={post?.disLikes}
                    createdAt={post?.createdAt}
                    updatedAt={post?.updatedAt}
                    settings={settings}
                />
            </div>
        </article>
    );
};
export default UcgAdPostCard;
