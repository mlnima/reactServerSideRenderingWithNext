import React, {FC} from "react";
import Link from "next/link";
import CardTitle from "../../asset/CardTitle/CardTitle";
import dynamic from "next/dynamic";
import {Post} from "typescript-types";
import {ratingCalculator} from "@repo/shared-util";
import '../postCard.scss'

const CardImageRendererUseClient = dynamic(() => import('../../asset/CardImageRenderer/CardImageRendererUseClient'))

interface PropTypes {
    locale: string,
    postUrl: string,
    numberOfCardsPerRowInMobile: number,
    index: number,
    isSidebar?: boolean,
    post: Post,
    isNextImageAllowed: boolean
}

const UcgAdPostCard: FC<PropTypes> =
    ({
         post,
         locale,
         postUrl,
         isSidebar,
         index,
         isNextImageAllowed
     }) => {

        return (
            <article className={`postCard postCardAd ${isSidebar && 'postCardSidebar'}`}>
                <div className={'cardMedia'}>
                    <Link href={postUrl}
                          className={'cardLink'}
                          title={post?.translations?.[locale as string]?.title ?? post?.title}>
                        <CardImageRendererUseClient
                            imageUrl={post.mainThumbnail}
                            isNextImageAllowed={isNextImageAllowed}
                            key={post?._id}
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
export default UcgAdPostCard;
