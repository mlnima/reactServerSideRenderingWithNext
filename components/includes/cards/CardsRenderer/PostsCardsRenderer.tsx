import {FC} from "react";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import _shortNumber from '@_variables/clientVariables/_shortNumber'
import {useSelector} from "react-redux";
import {Post} from "@_typeScriptTypes/Post";
import ratingCalculator from "@_variables/util/ratingCalculator";
import styled from "styled-components";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const ArticlePostCard = dynamic(() => import('@components/includes/cards/ArticlePostCard'))
const PromotionPostCard = dynamic(() => import('@components/includes/cards/PromotionPostCard'))
const LearnPostCard = dynamic(() => import('@components/includes/cards/LearnPostCard'))
const VideoPostCard = dynamic(() => import('@components/includes/cards/VideoPostCard'))

const Style = styled.div`
  padding: 20px 0;
  display: grid;
  width: 100%;
  margin: auto;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(${({postsPerRawForMobile}: StylePropTypes) => `${96 / postsPerRawForMobile}`}vw, 1fr));

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: StylePropTypes) => `${cardWidth}px`}, 1fr));
  }

  ${({cardsCustomStyle}: StylePropTypes) => cardsCustomStyle || ''}
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
    postsPerRawForMobile?: number,
    cardWidth?: number,
    cardsCustomStyle: string
}

const PostsCardsRenderer: FC<CardsRendererPropTypes> = ({
                                                            posts,
                                                            uniqueData,
                                                            isSidebar
                                                        }) => {
    const {locale} = useRouter()
    const {cardWidth, postsPerRawForMobile, cardsCustomStyle} = useSelector(({settings}: Store) => {
        return {
            cardWidth: settings?.design?.cardWidthDesktop || 255,
            cardsCustomStyle: settings.design.cardsCustomStyle || '',
            postsPerRawForMobile: settings?.design?.postsPerRawForMobile || 2,
        }
    });

    return (
        <Style className={'posts-content'}
               postsPerRawForMobile={postsPerRawForMobile}
               cardWidth={cardWidth}
               cardsCustomStyle={cardsCustomStyle}>

            {(uniqueData?.posts || posts || []).map((post: Post, index: number) => {

                const postProps = {
                    views: _shortNumber(post.views || 0) as number,
                    cardWidth,
                    postsPerRawForMobile,
                    rating: post.likes || post.disLikes ? ratingCalculator(post.likes, post.disLikes) : null,
                    post,
                    targetLink: post?.postType === 'out' || post?.outPostType === 'promotion' ? '_blank':'_self',
                    postUrl: post?.postType === 'out' ? post?.redirectLink || '#' :
                        `/posts/${post?.postType}/${post._id}`,
                    title: process.env.NEXT_PUBLIC_DEFAULT_LOCAL === locale ?
                        post?.title :
                        post?.translations?.[locale as string]?.title || post?.title,
                    isSidebar: isSidebar,
                }



                if (post?.postType === 'video' || (post?.postType === 'out' && post?.outPostType === 'video')) {
                    return <VideoPostCard {...postProps} key={index} index={index}/>
                } else if (post?.postType === 'promotion' || (post?.postType === 'out' && post?.outPostType === 'promotion')) {
                    return <PromotionPostCard {...postProps} key={index} index={index}/>
                } else if (post?.postType === 'article' || (post?.postType === 'out' && post?.outPostType === 'article')) {
                    return <ArticlePostCard {...postProps} key={index} index={index}/>
                } else if (post?.postType === 'learn' || (post?.postType === 'out' && post?.outPostType === 'learn')) {
                    return <LearnPostCard {...postProps} key={index} index={index}/>
                } else return null
            })}

        </Style>
    )
};
export default PostsCardsRenderer
