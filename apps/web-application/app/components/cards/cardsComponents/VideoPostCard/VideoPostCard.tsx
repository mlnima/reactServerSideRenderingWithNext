import React, {FC} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import _qualityConvertor from "../../asset/_qualityConvertor";
import {Post} from "typescript-types";
import CardTitle from "../../asset/CardTitle/CardTitle";
import {ratingCalculator} from "custom-util";
import './VideoPostCard.styles.scss'

const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))
const CardQuality = dynamic(() => import('../../asset/CardQuality/CardQuality'))
const CardDuration = dynamic(() => import('../../asset/CardDuration/CardDuration'))
const CardImageRendererUseClient = dynamic(() => import(
    '../../asset/CardImageRenderer/CardImageRendererUseClient'
    ))

interface IProps {
    locale: string,
    postUrl: string,
    index: number,
    isSidebar?: boolean,
    post: Post,
    isNextIImageAllowed: boolean
}

const VideoPostCard: FC<IProps> =
    ({
         post,
         locale,
         postUrl,
         isSidebar,
         index,
         isNextIImageAllowed
     }) => {

        const rating = post.likes || post.disLikes ? ratingCalculator(post?.likes, post?.disLikes) : null

        return (
            <article className={`post-card post-card-video ${isSidebar ? 'postCardSidebar' : ''}`}>
                <div className={'card-media'}>
                    <Link href={postUrl}
                          className={'card-link'}
                          title={post?.translations?.[locale as string]?.title ?? post?.title}>
                        <CardImageRendererUseClient
                            imageUrl={post.mainThumbnail}
                            isNextIImageAllowed={isNextIImageAllowed}
                            videoTrailerUrl={post?.videoTrailerUrl}
                            submitPostView={false}
                            postId={post?._id}
                            mediaAlt={post?.translations?.[locale as string]?.title ?? post?.title}
                            index={index}/>
                        {!!post?.quality &&
                            <CardQuality quality={_qualityConvertor(post?.quality)}/>}

                        {!!post?.duration &&
                            <CardDuration duration={post?.duration}/>}
                    </Link>
                </div>
                <div className={`card-info`}>
                    <CardTitle title={post?.translations?.[locale as string]?.title ?? post?.title}
                               url={postUrl}/>
                    <div className={'card-info-stats'}>
                        {!!post.views && <CardViews views={post.views}/>}
                        {!!rating && <CardRating rating={rating}/>}
                    </div>
                </div>
            </article>
        )
    };
export default VideoPostCard
