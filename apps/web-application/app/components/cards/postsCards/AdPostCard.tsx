import React, {FC} from "react";
import Link from "next/link";
import CardTitle from "../asset/CardTitle/CardTitle";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import {Post} from "typescript-types";

const CardViews = dynamic(() => import('../asset/CardViews/CardViews'))
const TextToCanvasImage = dynamic(() => import('../asset/TextToCanvasImage/TextToCanvasImage'))
const CardImageRenderer = dynamic(() => import('../asset/CardImageRenderer/CardImageRenderer'))
const CardRating = dynamic(() => import('../asset/CardRating/CardRating'))

interface PropTypes {
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



const UcgAdPostCard: FC<PropTypes> =
    ({
         post,
         title,
         postUrl,
         views,
         rating,
         numberOfCardsPerRowInMobile,
         targetLink,
         index
     }) => {

        const {t} = useTranslation()

        return (
            <article className={`post-card w-1/${numberOfCardsPerRowInMobile} md:w-64`}>
                <div className={'card-media relative text-secondary-text-color'}>
                    <Link href={postUrl} className={'card-link'} title={title} target={targetLink} prefetch={false}>
                        {post.mainThumbnail ?
                            <CardImageRenderer imageUrl={post.mainThumbnail}
                                               mediaAlt={title}
                                               index={index}
                                               numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}/> :
                            <TextToCanvasImage title={title}
                                               numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}/>
                        }
                    </Link>
                </div>

                <CardTitle title={title} url={postUrl} targetLink={targetLink}/>

                {(!!views || !!rating) && (
                    <div className={`card-under-media-info flex ${(!!views &&!!rating) ? 'justify-between' : 'justify-start'} `}>
                        {!!views && <CardViews views={views}/>}
                        {!!rating && <CardRating rating={rating}/>}
                    </div>
                )}

            </article>
        )
    };
export default UcgAdPostCard;
