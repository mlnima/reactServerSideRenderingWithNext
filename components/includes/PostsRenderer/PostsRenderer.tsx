import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import _shortNumber from '../../../_variables/clientVariables/_shortNumber'
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "@store/clientActions/globalStateActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";
import ratingCalculator from "@_variables/util/ratingCalculator";
import {FC} from "react";

const VideoCardToRender = dynamic(() => import('@components/includes/PostsRenderer/VideoCardToRender'))
const PromotionCardToRender = dynamic(() => import('@components/includes/PostsRenderer/PromotionCardToRender'))
const ArticleCardToRender = dynamic(() => import('@components/includes/PostsRenderer/ArticleCardToRender'))
const LearnCardToRender = dynamic(() => import('@components/includes/PostsRenderer/LearnCardToRender'))

interface PostsComponentTypes {
    viewType?: string,
    posts?: PostTypes[],
    uniqueData?: {
        speed: number;
        posts: PostTypes[],
        sliderEffect:string,
        spaceBetween:number,
        totalCount: number
    }
    widgetId?: string,
    isSidebar?: boolean ,
    index?:number,
    cardWidthDesktop?:number,
}

interface PostsContentStyledDivPropTypes{
    postsPerRawForMobile:number,
    cardWidth:number,
    isMobile:boolean,
}
const PostsContentStyledDiv = styled.div`
  padding: 20px 0;
  display: grid;
  width: 100%;
  margin: auto;
  grid-gap: 5px;
  grid-template-columns: repeat( auto-fill, minmax(${({postsPerRawForMobile}:PostsContentStyledDivPropTypes)=>`${96/postsPerRawForMobile}`}vw, 2fr) );

  @media only screen and (min-width: 768px) {
    grid-gap: 15px 10px;
    grid-template-columns: repeat( auto-fill, minmax(${({cardWidth}:PostsContentStyledDivPropTypes)=>`${cardWidth}px`}, 1fr) );
  }
`

const PostsRenderer:FC<PostsComponentTypes> = 
    ({
         posts,
         uniqueData,
         widgetId,
         isSidebar
    }) => {

    const dispatch = useDispatch()
    const {locale} = useRouter()

    const {cardWidth,postsPerRawForMobile,isMobile,isAppleMobileDevice} = useSelector(({settings}: StoreTypes) => {
        return {
            cardWidth:settings?.design?.cardWidthDesktop || 255,
            postsPerRawForMobile: settings?.design?.postsPerRawForMobile || 2,
            isMobile: settings?.isMobile,
            isAppleMobileDevice:settings?.isAppleMobileDevice
        }
    });

    return (
        <PostsContentStyledDiv className={'posts-content'}
                               postsPerRawForMobile={postsPerRawForMobile}
                               isMobile={isMobile}
                               cardWidth={cardWidth}
        >
            {(uniqueData?.posts || posts || []).map((post: PostTypes, index: number) => {

                const postProps = {
                    views:_shortNumber(post.views || 0),
                    cardWidth,
                    rating : post.likes || post.disLikes ? ratingCalculator(post.likes, post.disLikes) : null ,
                    post,
                    widgetId,
                    title: process.env.NEXT_PUBLIC_DEFAULT_LOCAL === locale ?
                           post?.title?.replace('#', '') :
                           post?.translations?.[locale as string]?.title ?
                           post?.translations?.[locale as string]?.title?.replace('#', '') :
                           post?.title?.replace('#', ''),
                    isMobile: isMobile,
                    isSidebar: isSidebar,
                    isAppleMobileDevice,
                    onActivateLoadingHandler: () => dispatch(setLoading(true)),

                }

                if (post?.postType === 'video') {
                    return <VideoCardToRender postProps={postProps} key={index} index={index} />
                } else if (post?.postType === 'promotion') {
                    return <PromotionCardToRender postProps={postProps} key={index} index={index}  />
                } else if (post?.postType === 'article') {
                    return <ArticleCardToRender postProps={postProps} key={index} index={index} />
                } else if (post?.postType === 'learn') {
                    return <LearnCardToRender postProps={postProps} key={index} index={index} />
                } else return null
            })}
        </PostsContentStyledDiv>
    );
};

export default PostsRenderer