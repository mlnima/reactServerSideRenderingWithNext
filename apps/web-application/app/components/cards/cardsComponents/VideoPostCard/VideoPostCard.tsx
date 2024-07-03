import React, {FC} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import _qualityConvertor from "../../asset/_qualityConvertor";
import {Post} from "typescript-types";
import CardTitle from "../../asset/CardTitle/CardTitle";
import './VideoPostCard.scss'
import '../postCard.scss'

const CardQuality = dynamic(() => import('../../asset/CardQuality/CardQuality'))
const CardDuration = dynamic(() => import('../../asset/CardDuration/CardDuration'))
const CardImageRendererUseClient = dynamic(() => import(
    '../../asset/CardImageRenderer/CardImageRendererUseClient'
    ))

// import {ratingCalculator} from "@repo/shared-util";
// const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
// const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))

interface IProps {
    locale: string,
    postUrl: string,
    index: number,
    isSidebar?: boolean,
    post: Post,
    isNextImageAllowed: boolean
}

const VideoPostCard: FC<IProps> =
    ({
         post,
         locale,
         postUrl,
         isSidebar,
         index,
         isNextImageAllowed
     }) => {

        // const rating = post.likes || post.disLikes ? ratingCalculator(post?.likes, post?.disLikes) : null
// console.log('post=> ',post)
        return (
            <article className={`postCard postCardVideo ${isSidebar ? 'postCardSidebar' : ''}`}>
                <div className={'cardMedia'}>
                    <Link href={postUrl}
                          className={'card-link'}
                          title={post?.translations?.[locale as string]?.title ?? post?.title}>
                        <CardImageRendererUseClient
                            imageUrl={post.mainThumbnail}
                            isNextImageAllowed={isNextImageAllowed}
                            key={post?._id}
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
                <div className={`cardInfo`}>
                    <CardTitle title={post?.translations?.[locale as string]?.title ?? post?.title}
                               url={postUrl}/>
                    {/*<div className={'card-info-stats'}>*/}
                    {/*    {!!post.views && <CardViews views={post.views}/>}*/}
                    {/*    {!!post.rating && <CardRating rating={post.rating}/>}*/}
                    {/*</div>*/}
                </div>
            </article>
        )
    };
export default VideoPostCard
