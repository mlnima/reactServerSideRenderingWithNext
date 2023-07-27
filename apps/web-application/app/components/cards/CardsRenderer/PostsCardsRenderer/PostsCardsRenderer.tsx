"use client";
import {FC} from "react";
import {Post} from "typescript-types";
import {ratingCalculator} from "custom-util";
import dynamic from "next/dynamic";
import {useAppSelector} from "@store/hooks";

const ArticlePostCard = dynamic(() => import('../../postsCards/ArticlePostCard'))
const PromotionPostCard = dynamic(() => import('../../postsCards/PromotionPostCard'))
const LearnPostCard = dynamic(() => import('../../postsCards/LearnPostCard'))
const VideoPostCard = dynamic(() => import('../../postsCards/VideoPostCard'))
const AdPostCard = dynamic(() => import('../../postsCards/AdPostCard'))

interface CardsRendererPropTypes {
    viewType?: string,
    locale: string
    posts?: Post[],
    uniqueData?: {
        speed: number;
        posts: Post[],
        sliderEffect: string,
        spaceBetween: number,
        totalCount: number
    }
    widgetId?: string,
    isSidebar?: boolean,
    index?: number,
    cardWidthDesktop?: number
}

const PostsCardsRenderer: FC<CardsRendererPropTypes> = ({posts, uniqueData, locale}) => {

    const cardMatcher = {
        'video': VideoPostCard,
        'article': ArticlePostCard,
        'promotion': PromotionPostCard,
        'learn': LearnPostCard,
        'Ad': AdPostCard,
    }

    const {numberOfCardsPerRowInMobile} = useAppSelector(({settings}) => {
        return {
            //@ts-ignore
            numberOfCardsPerRowInMobile: settings?.initialSettings?.postCardsSettings?.numberOfCardsPerRowInMobile || 2,
            //@ts-ignore
            customStyles: settings?.initialSettings?.postCardsSettings?.customStyles,
            //@ts-ignore
            cardWidth: settings?.initialSettings?.postCardsSettings?.cardsWidthDesktop || 255,
        }
    })


    return (
        <div className={`posts-content flex flex-wrap gap-4 justify-center items-center`}>

            {(uniqueData?.posts || posts || []).map((post: Post, index: number) => {
                //@ts-ignore
                const CardToRender = post?.postType ? cardMatcher?.[post?.postType] || null : null;
                const postProps = {
                    views: post.views && post.views > 10 ? post.views as unknown as number : 0,
                    numberOfCardsPerRowInMobile,
                    //@ts-ignore
                    rating: post.likes || post.disLikes ? ratingCalculator(post.likes, post.disLikes) : null,
                    post,
                    targetLink: post?.postType?.includes('external') || post?.outPostType === 'promotion' ? '_blank' : '_self',
                    postUrl: post?.postType?.includes('external') ? post?.redirectLink || '#' :
                        `/post/${post?.postType}/${post._id}`,
                    title: process.env.NEXT_PUBLIC_DEFAULT_LOCAL === locale ?
                        post?.title :
                        post?.translations?.[locale as string]?.title || post?.title,
                    index:index
                }

                if (!!CardToRender) {
                    return <CardToRender {...postProps} key={index}/>
                }

            })}

        </div>
    )
};
export default PostsCardsRenderer
