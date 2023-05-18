import {FC} from "react";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {Post, Store} from "typescript-types";
import {ratingCalculator} from "custom-util";
import styled from "styled-components";

const ArticlePostCard = dynamic(() => import('../postsCards/ArticlePostCard'))
const PromotionPostCard = dynamic(() => import('../postsCards/PromotionPostCard'))
const LearnPostCard = dynamic(() => import('../postsCards/LearnPostCard'))
const VideoPostCard = dynamic(() => import('../postsCards/VideoPostCard'))
const EventPostCard = dynamic(() => import('../postsCards/EventPostCard'))
const AdPostCard = dynamic(() => import('../postsCards/AdPostCard'))

const Style = styled.div`
  display: grid;
  width: 100%;
  margin: 10px auto;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(${({numberOfCardsPerRowInMobile}: StylePropTypes) => `${96 / numberOfCardsPerRowInMobile}`}vw, 1fr));

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: StylePropTypes) => `${cardWidth}px`}, 1fr));
  }

  ${({customStyles}: StylePropTypes) => customStyles || ''}
`

interface CardsRendererPropTypes {
    viewType?: string,
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
    cardWidthDesktop?: number,
}

interface StylePropTypes {
    numberOfCardsPerRowInMobile: number,
    cardWidth?: number,
    customStyles?: string
}

const PostsCardsRenderer: FC<CardsRendererPropTypes> =
    ({
         posts,
         uniqueData,
         isSidebar
     }) => {
        const {locale} = useRouter()

        const cardMatcher = {
            'video': VideoPostCard,
            'event': EventPostCard,
            'article': ArticlePostCard,
            'promotion': PromotionPostCard,
            'learn': LearnPostCard,
            'Ad': AdPostCard,
        }

        const {numberOfCardsPerRowInMobile, customStyles, cardWidth} = useSelector(({settings}: Store) => {
            return {
                numberOfCardsPerRowInMobile: settings?.initialSettings?.postCardsSettings?.numberOfCardsPerRowInMobile || 2,
                customStyles: settings?.initialSettings?.postCardsSettings?.customStyles,
                cardWidth: settings?.initialSettings?.postCardsSettings?.cardsWidthDesktop || 255,
            }
        })

        return (
            <Style className={'posts-content'}
                   numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                   cardWidth={cardWidth}
                   customStyles={customStyles}>

                {(uniqueData?.posts || posts || []).map((post: Post, index: number) => {
                    const CardToRender = post?.postType ? cardMatcher?.[post?.postType] || null : null;
                    const postProps = {
                        views: post.views && post.views > 10 ? post.views as unknown as number : 0,
                        cardWidth,
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
                        isSidebar: isSidebar,
                    }

                    if (!!CardToRender) {
                        return <CardToRender {...postProps} key={index} index={index}/>
                    }

                })}

            </Style>
        )
    };
export default PostsCardsRenderer


// if (post?.postType === 'video' || post?.postType === 'externalVideo') {
//
//     //@ts-ignore
//     return <VideoPostCard {...postProps} key={index} index={index}/>
// } else if (post?.postType === 'event') {
//     //@ts-ignore
//     return <EventPostCard {...postProps} key={index} index={index}/>
// } else if (post?.postType === 'promotion' || post?.postType === 'externalPromotion') {
//     //@ts-ignore
//     return <PromotionPostCard {...postProps} key={index} index={index}/>
// } else if (post?.postType === 'article' || post?.postType === 'externalArticle') {
//     //@ts-ignore
//     return <ArticlePostCard {...postProps} key={index} index={index}/>
// } else if (post?.postType === 'learn' || post?.postType === 'externalLearn') {
//     //@ts-ignore
//     return <LearnPostCard {...postProps} key={index} index={index}/>
// } else if (post?.postType === 'Ad') {
//     //@ts-ignore
//     return <AdPostCard {...postProps} key={index} index={index}/>
// } else return null