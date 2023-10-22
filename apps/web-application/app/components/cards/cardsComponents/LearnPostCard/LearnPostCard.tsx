import React, {FC} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {Post} from "typescript-types";
import CardTitle from "../../asset/CardTitle/CardTitle";
import '../postCard.scss'
import './LearnPostCard.scss'
const CardImageRendererUseClient = dynamic(() => import('../../asset/CardImageRenderer/CardImageRendererUseClient'))


interface LearnPostCardPropTypes {
    locale: string,
    postUrl: string,
    numberOfCardsPerRowInMobile: number,
    index: number,
    isSidebar?: boolean,
    post: Post,
    isNextImageAllowed: boolean
}

const LearnPostCard: FC<LearnPostCardPropTypes> =
    ({
         post,
         locale,
         postUrl,
         isSidebar,
         index,
         isNextImageAllowed
     }) => {

        return (
            <article className={`postCard postCardLearn ${isSidebar && 'postCardSidebar'}`}>
                {post.mainThumbnail ?
                <>
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
                </>:

                    <div className={'imageLessCard'}>
                        <Link href={postUrl}
                              className={'cardLink'}
                              title={post?.translations?.[locale as string]?.title ?? post?.title}>
                            {post?.translations?.[locale as string]?.title ?? post?.title}
                        </Link>
                    </div>
                }

            </article>
        )
    };
export default LearnPostCard
