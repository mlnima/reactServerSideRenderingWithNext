import React, {FC} from "react";
import dynamic from "next/dynamic";
import CardTitle from "../../asset/CardTitle/CardTitle";
import {Post} from "typescript-types";
import '../postCard.scss'
import Link from "next/link";
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

        return (
            <article className={`postCard postCardPromotion ${isSidebar && 'postCardSidebar'}`}>
                <div className={'cardMedia'}>

                    <Link href={post?.redirectLink || '#'} className={'promotion-card-link-external'}
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
                <div className={`cardInfo`}>
                    <CardTitle title={post?.translations?.[locale as string]?.title ?? post?.title}
                               url={postUrl}/>
                </div>
            </article>
        )
    };
export default PromotionPostCard

