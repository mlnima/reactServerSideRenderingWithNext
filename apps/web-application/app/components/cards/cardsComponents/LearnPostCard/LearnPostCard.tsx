import React, {FC} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {Post} from "typescript-types";
import CardTitle from "../../asset/CardTitle/CardTitle";
import {ratingCalculator} from "custom-util";

const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardImageRendererUseClient = dynamic(() => import('../../asset/CardImageRenderer/CardImageRendererUseClient'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))

interface LearnPostCardPropTypes {
    locale: string,
    postUrl: string,
    numberOfCardsPerRowInMobile: number,
    index: number,
    isSidebar?:boolean,
    post: Post,
}

const LearnPostCard: FC<LearnPostCardPropTypes> =
    ({
         post,
         locale,
         postUrl,
         isSidebar,
         index
     }) => {

        const rating = post.likes || post.disLikes ? ratingCalculator(post?.likes, post?.disLikes) : null

        return (
            <article className={`post-card post-card-learn ${isSidebar && 'postCardSidebar'}`}>
                <div className={'card-media'}>
                    <Link href={postUrl}
                          className={'card-link'}
                          title={post?.translations?.[locale as string]?.title ?? post?.title}>
                          <CardImageRendererUseClient imageUrl={post.mainThumbnail}
                                           mediaAlt={post?.translations?.[locale as string]?.title ?? post?.title}
                                           index={index}/>
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
export default LearnPostCard
