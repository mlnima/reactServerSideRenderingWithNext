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
import {cardWidthCalculator} from "@_variables/_variables";
const ArticleCardToRender = dynamic(() => import('@components/includes/PostsRenderer/ArticleCardToRender'))
const LearnCardToRender = dynamic(() => import('@components/includes/PostsRenderer/LearnCardToRender'))
const VideoCardToRender = dynamic(() => import('@components/includes/PostsRenderer/VideoCardToRender'))
const PromotionCardToRender = dynamic(() => import('@components/includes/PostsRenderer/PromotionCardToRender'))
const DefaultTypeCard = dynamic(() => import('../cards/desktop/DefaultTypeCard/DefaultTypeCard'))

interface PostsComponentTypes {
    viewType?: string,
    _id?: string,
    posts?: PostTypes[],
    uniqueData?: {
        speed: number;
        posts: PostTypes[],
        sliderEffect:string,
        spaceBetween:number,
        totalCount: number
    }
    widgetId?: string,
    postElementSize?: string,
    isSidebar?: boolean
}

interface PostsContentStyledDivPropTypes{
    postElementSize:string
}
const PostsContentStyledDiv = styled.div`
  display: flex;
  flex-direction: ${({postElementSize}: PostsContentStyledDivPropTypes) => postElementSize === 'list' ? 'column' : 'row'};
  flex-wrap: ${({postElementSize}: PostsContentStyledDivPropTypes) => postElementSize === 'listSmall' ? 'nowrap' : 'wrap'};
  justify-content: center;
  overflow-y: ${({postElementSize}:PostsContentStyledDivPropTypes) => postElementSize === 'listSmall' ? 'scroll' : 'initial'};
  height: ${({postElementSize}: PostsContentStyledDivPropTypes) => postElementSize === 'listSmall' ? '400px' : 'initial'};
  max-width: ${({postElementSize}: PostsContentStyledDivPropTypes) => postElementSize === 'listSmall' ? '100%' : 'initial'};
  flex-direction: ${({postElementSize}: PostsContentStyledDivPropTypes) => postElementSize === 'listSmall' ? 'column' : 'raw'};

  @media only screen and (min-width: 768px) {
    max-width: ${({postElementSize}: PostsContentStyledDivPropTypes) => postElementSize === 'listSmall' ? '320px' : 'initial'};
  }
`

const PostsRenderer:FC<PostsComponentTypes> = 
    ({
         viewType,
         _id,
         posts,
         uniqueData,
         widgetId,
         postElementSize,
         isSidebar
    }) => {
    const dispatch = useDispatch()
    const {locale} = useRouter()

    const {elementSize,postsPerRawForMobile,isMobile,cardWidth} = useSelector(({settings}: StoreTypes) => {
        const elementSize = postElementSize ? postElementSize : settings?.design?.postElementSize
        return {
            elementSize,
            postsPerRawForMobile: settings?.identity?.postsPerRawForMobile || 2,
            isMobile: settings?.isMobile,
            cardWidth: cardWidthCalculator(elementSize)
        }
    });

    return (
        <PostsContentStyledDiv className={'posts-content ' + (viewType ? `${viewType}-posts-content` : 'standard')}
                               postElementSize={elementSize}
        >
            {(uniqueData?.posts || posts || []).map((post: PostTypes, index: number) => {

                const postProps = {
                    dir:locale === 'fa' || locale === 'ar' && post?.translations?.[locale as string]?.title ?
                        'rtl' : 'ltr',
                    views:_shortNumber(post.views || 0),
                    rating : post.likes || post.disLikes ? ratingCalculator(post.likes, post.disLikes) : null ,
                    post,
                    postElementSize: elementSize,
                    widgetId,
                    postsPerRawForMobile: postsPerRawForMobile,
                    cardWidth: cardWidth,
                    title: process.env.NEXT_PUBLIC_DEFAULT_LOCAL === locale ?
                           post?.title?.replace('#', '') :
                           post?.translations?.[locale as string]?.title ?
                           post?.translations?.[locale as string]?.title?.replace('#', '') :
                           post?.title?.replace('#', ''),
                    isMobile: isMobile,
                    isSidebar: isSidebar,
                    onActivateLoadingHandler: () => dispatch(setLoading(true))
                }

                if (post?.postType === 'video') {
                    return <VideoCardToRender postProps={postProps} key={index}/>
                } else if (post?.postType === 'promotion') {
                    return <PromotionCardToRender postProps={postProps} key={index}/>
                } else if (post?.postType === 'article') {
                    return <ArticleCardToRender postProps={postProps} key={index}/>
                } else if (post?.postType === 'learn') {
                    return <LearnCardToRender postProps={postProps} key={index}/>
                } else return (
                    <DefaultTypeCard {...postProps} key={index}/>
                )
            })}
        </PostsContentStyledDiv>
    );
};

export default PostsRenderer