import React, { FC } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import _qualityConvertor from '../../asset/_qualityConvertor';
import { Post } from "@repo/typescript-types";
import CardTitle from '../../asset/CardTitle/CardTitle';
import './VideoPostCard.scss';
import '../postCard.scss';
import CardStats from '@components/cards/asset/CardStats/CardStats';

const CardQuality = dynamic(() => import('../../asset/CardQuality/CardQuality'));
const CardDuration = dynamic(() => import('../../asset/CardDuration/CardDuration'));
const CardImageRendererUseClient = dynamic(() => import('../../asset/CardImageRenderer/CardImageRendererUseClient'));

// const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
// const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))

interface IProps {
    locale: string;
    postUrl: string;
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

const VideoPostCard: FC<IProps> = ({
    post,
    locale,
    postUrl,
    isSidebar,
    index,
    isNextImageAllowed,
    dictionary,
    settings,
}) => {
    // const rating = post.likes || post.disLikes ? ratingCalculator(post?.likes, post?.disLikes) : null
    // console.log('post=> ',post)
    return (
        <article className={`postCard postCardVideo${isSidebar ? ' postCardSidebar' : ''}`}>
            <div className={'cardMedia'}>
                <Link
                    href={postUrl}
                    className={'card-link'}
                    title={post?.translations?.[locale as string]?.title ?? post?.title}
                >
                    <CardImageRendererUseClient
                        imageUrl={post.mainThumbnail || post?.thumbnail?.filePath}
                        isNextImageAllowed={isNextImageAllowed}
                        postType={'video'}
                        videoTrailerUrl={post?.videoTrailerUrl}
                        submitPostView={false}
                        postId={post?._id}
                        mediaAlt={post?.translations?.[locale as string]?.title ?? post?.title}
                        index={index}
                    />
                    {!!post?.quality && <CardQuality quality={_qualityConvertor(post?.quality)} />}

                    {!!post?.duration && <CardDuration duration={post?.duration} />}
                </Link>
            </div>
            <div className={`cardInfo`}>
                <CardTitle title={post?.translations?.[locale as string]?.title ?? post?.title} url={postUrl} />
                {/*<CardStats views={post?.views} dictionary={dictionary} likes={post?.likes} dislikes={post?.dislikes} />*/}
                {/*/!*<div className={'card-info-stats'}>*!/*/}
                {/*/!*    {!!post.views && <CardViews views={post.views}/>}*!/*/}
                {/*/!*    {!!post.rating && <CardRating rating={post.rating}/>}*!/*/}
                {/*/!*</div>*!/*/}
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
export default VideoPostCard;
