import React, {FC} from "react";
import Link from "next/link";
import CardTitle from "../../asset/CardTitle/CardTitle";
import dynamic from "next/dynamic";
import {Post} from "typescript-types";
import {ratingCalculator} from "custom-util";

const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardImageRendererUseClient = dynamic(() => import('../../asset/CardImageRenderer/CardImageRendererUseClient'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))

interface PropTypes {
    locale: string,
    postUrl: string,
    numberOfCardsPerRowInMobile: number,
    index: number,
    isSidebar?: boolean,
    post: Post,
    isNextIImageAllowed: boolean
}

const UcgAdPostCard: FC<PropTypes> =
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
            <article className={`post-card post-card-ad ${isSidebar && 'postCardSidebar'}`}>
                <div className={'card-media'}>
                    <Link href={postUrl}
                          className={'card-link'}
                          title={post?.translations?.[locale as string]?.title ?? post?.title}>
                        <CardImageRendererUseClient
                            imageUrl={post.mainThumbnail}
                            isNextIImageAllowed={isNextIImageAllowed}
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
export default UcgAdPostCard;
