import React, { FC } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { IPost } from "@repo/typescript-types";
import CardTitle from '../../asset/CardTitle/CardTitle';
import '../postCard.scss';
import CardStats from '@components/cards/asset/CardStats/CardStats';

const CardImageRendererUseClient = dynamic(() => import('../../asset/CardImageRenderer/CardImageRendererUseClient'));

interface ArticlePostCardPropTypes {
    locale: string;
    postUrl: string;
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

const ArticlePostCard: FC<ArticlePostCardPropTypes> = ({
    post,
    locale,
    postUrl,
    isSidebar,
    index,
    isNextImageAllowed,
    dictionary,
    settings,
}) => {
    return (
        <article className={`postCard postCardArticle${isSidebar ? 'postCardSidebar' : ''}`}>
            <div className={'cardMedia'}>
                <Link
                    href={postUrl}
                    className={'cardLink'}
                    title={post?.translations?.[locale as string]?.title ?? post?.title}
                >
                    <CardImageRendererUseClient
                        imageUrl={post.mainThumbnail || post?.thumbnail?.filePath}
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
export default ArticlePostCard;
