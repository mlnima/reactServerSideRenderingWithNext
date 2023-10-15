import React, {FC} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {Post} from "typescript-types";
import CardTitle from "../../asset/CardTitle/CardTitle";
import '../postCard.scss'

const CardImageRendererUseClient = dynamic(() => import('../../asset/CardImageRenderer/CardImageRendererUseClient'));


interface ArticlePostCardPropTypes {
    locale: string,
    postUrl: string,
    index: number,
    isSidebar?: boolean,
    post: Post,
    isNextIImageAllowed: boolean
}

const ArticlePostCard: FC<ArticlePostCardPropTypes> =
    ({
         post,
         locale,
         postUrl,
         isSidebar,
         index,
         isNextIImageAllowed
     }) => {


        return (
            <article className={`postCard postCardArticle ${isSidebar && 'postCardSidebar'}`}>
                <div className={'cardMedia'}>
                    <Link href={postUrl}
                          className={'cardLink'}
                          title={post?.translations?.[locale as string]?.title ?? post?.title}>

                        <CardImageRendererUseClient imageUrl={post.mainThumbnail}
                                                    isNextIImageAllowed={isNextIImageAllowed}
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
export default ArticlePostCard
