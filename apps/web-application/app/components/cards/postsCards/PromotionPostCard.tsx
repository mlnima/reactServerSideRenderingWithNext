import React, {FC} from "react";
import dynamic from "next/dynamic";
import CardTitle from "../asset/CardTitle/CardTitle";
import {Post} from "typescript-types";
import {clientAPIRequestViewPost} from "api-requests";

const CardViews = dynamic(() => import('../asset/CardViews/CardViews'))
const CardRating = dynamic(() => import('../asset/CardRating/CardRating'))
const TextToCanvasImage = dynamic(() => import('../asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('../asset/CardImageRenderer/CardImageRenderer'))

interface PromotionPostCardPropTypes {
    title: string,
    postUrl: string,
    numberOfCardsPerRowInMobile: number,
    views: number,
    rating: number,
    index: number,
    cardWidth: number,
    targetLink: string,
    post: Post,
}

const PromotionPostCard: FC<PromotionPostCardPropTypes> =
    ({
         post,
         title,
         postUrl,
         views,
         rating,
         numberOfCardsPerRowInMobile,
         index
     }) => {

        const onClickHandler = () => {
            if (post._id) clientAPIRequestViewPost(post._id)
        }

        return (
            <article className={`post-card w-1/${numberOfCardsPerRowInMobile} md:w-64`} >
                <div className={'card-media relative text-secondary-text-color'}>
                    <a href={post.redirectLink} className='promotion-card-link-external'
                       onClick={onClickHandler} target='_blank' rel="nofollow noopener external">
                        {post.mainThumbnail ?
                            <CardImageRenderer imageUrl={post.mainThumbnail}
                                               mediaAlt={title}
                                               index={index}
                                               numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}/> :
                            <TextToCanvasImage title={title}
                                               numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}/>
                        }
                    </a>
                </div>
                <CardTitle title={title} url={postUrl} targetLink={'_self'}/>
                <span className={'read-more-btn'}>
                       {(!!views || !!rating) && (
                           <div className={`card-under-media-info flex ${(!!views &&!!rating) ? 'justify-between' : 'justify-start'} `}>
                               {!!views && <CardViews views={views}/>}
                               {!!rating && <CardRating rating={rating}/>}
                           </div>
                       )}
                </span>
            </article>
        )
    };
export default PromotionPostCard

