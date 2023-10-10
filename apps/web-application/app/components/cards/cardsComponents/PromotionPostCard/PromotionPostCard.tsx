import React, {FC} from "react";
import dynamic from "next/dynamic";
import CardTitle from "../../asset/CardTitle/CardTitle";
import {Post} from "typescript-types";
import {ratingCalculator} from "custom-util";
import {clientAPIRequestViewPost} from "api-requests";
import Link from "next/link";
import UseClientProvider from "@components/UseClientProvider/UseClientProvider";

const CardViews = dynamic(() => import('../../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../../asset/CardRating/CardRating'))
const CardImageRendererUseClient = dynamic(() => import('../../asset/CardImageRenderer/CardImageRendererUseClient'))

interface PromotionPostCardPropTypes {
    locale: string,
    postUrl: string,
    numberOfCardsPerRowInMobile: number,
    index: number,
    isSidebar?: boolean,
    post: Post,
    isNextIImageAllowed: boolean
}

const PromotionPostCard: FC<PromotionPostCardPropTypes> =
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
            <article className={`post-card post-card-promotion ${isSidebar && 'postCardSidebar'}`}>
                <div className={'card-media'}>

                    <Link href={post?.redirectLink || '#'} className={'promotion-card-link-external'}
                       // onClick={()=>{
                       //     if (post?._id) {
                       //         clientAPIRequestViewPost(post?._id)
                       //     }
                       // }}
                       target={'_blank'} rel={'nofollow noopener external'}>
                        <CardImageRendererUseClient
                            imageUrl={post.mainThumbnail}
                            isNextIImageAllowed={isNextIImageAllowed}
                            submitPostView={true}
                            postId={post?._id}
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
export default PromotionPostCard

