import {FC} from "react";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import _shortNumber from '../../../_variables/clientVariables/_shortNumber'
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import ratingCalculator from "@_variables/util/ratingCalculator";

const ArticlePostCard = dynamic(() => import('@components/includes/cards/ArticlePostCard'))
const PromotionPostCard = dynamic(() => import('@components/includes/cards/PromotionPostCard'))
const LearnPostCard = dynamic(() => import('@components/includes/cards/LearnPostCard'))
const VideoPostCard = dynamic(() => import('@components/includes/cards/VideoPostCard'))

interface PostsComponentTypes {
    viewType?: string,
    posts?: PostTypes[],
    uniqueData?: {
        speed: number;
        posts: PostTypes[],
        sliderEffect: string,
        spaceBetween: number,
        totalCount: number
    }
    widgetId?: string,
    isSidebar?: boolean,
    index?: number,
    cardWidthDesktop?: number,
}

interface PostsContentStyledDivPropTypes {
    postsPerRawForMobile?: number,
    cardWidth?: number,
    cardsCustomStyle:string
}

const PostsContentStyledDiv = styled.div`
  padding: 20px 0;
  display: grid;
  width: 100%;
  margin: auto;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(${({postsPerRawForMobile}: PostsContentStyledDivPropTypes) => `${96 / postsPerRawForMobile}`}vw, 2fr));
  
  @media only screen and (min-width: 768px) {
    grid-gap: 15px 10px;
    grid-template-columns: repeat(auto-fill, minmax(${({cardWidth}: PostsContentStyledDivPropTypes) => `${cardWidth}px`}, 1fr));
  }
  ${({cardsCustomStyle}:PostsContentStyledDivPropTypes)=>cardsCustomStyle||''}
`


const PostsRenderer: FC<PostsComponentTypes> =
    ({
         posts,
         uniqueData,
         isSidebar
     }) => {

        const {locale} = useRouter()

        const {cardWidth, postsPerRawForMobile,cardsCustomStyle} = useSelector(({settings}: StoreTypes) => {
            return {
                cardWidth: settings?.design?.cardWidthDesktop || 255,
                cardsCustomStyle:settings.design.cardsCustomStyle|| '',
                postsPerRawForMobile: settings?.design?.postsPerRawForMobile || 2,
            }
        });


        return (
            <PostsContentStyledDiv className={'posts-content'}
                                   postsPerRawForMobile={postsPerRawForMobile}
                                   cardWidth={cardWidth}
                                   cardsCustomStyle={cardsCustomStyle}
            >
                {(uniqueData?.posts || posts || []).map((post: PostTypes, index: number) => {

                    const postProps = {
                        views: _shortNumber(post.views || 0),
                        cardWidth,
                        postsPerRawForMobile,
                        rating: post.likes || post.disLikes ? ratingCalculator(post.likes, post.disLikes) : null,
                        post,
                        postUrl: `/post/${post?.postType}/${post._id}`,
                        title: process.env.NEXT_PUBLIC_DEFAULT_LOCAL === locale ?
                            post?.title :
                            post?.translations?.[locale as string]?.title || post?.title,
                        isSidebar: isSidebar,
                    }

                    if (post?.postType === 'video') {
                        return <VideoPostCard {...postProps} key={index} index={index}/>
                    } else if (post?.postType === 'promotion') {
                        return <PromotionPostCard {...postProps} key={index} index={index}/>
                    } else if (post?.postType === 'article') {
                        return <ArticlePostCard {...postProps} key={index} index={index}/>

                    } else if (post?.postType === 'learn') {
                        return <LearnPostCard {...postProps} key={index} index={index}/>
                    } else return null
                })}
            </PostsContentStyledDiv>
        );
    };

export default PostsRenderer

//dispatch(setLoading(true)

//                else if (post?.postType === 'article') {
//                     return <ArticleCardToRender postProps={postProps} key={index} index={index} />