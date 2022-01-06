import React from 'react';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {likeValueCalculator} from "../../../_variables/_variables";
import _shortNumber from '../../../_variables/clientVariables/_shortNumber'
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../../store/actions/globalStateActions";
import {settingsPropTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
import {PostTypes} from "../../../_variables/TypeScriptTypes/PostTypes";
import VideoCardTypeList from "../PostCard/VideoCardTypeList/VideoCardTypeList";

const PromotionCardListSmall = dynamic(() => import('../PostCard/PromotionTypeCard/PromotionCardListSmall'))
const VideoTypeCard = dynamic(() => import('../PostCard/VideoCardType/VideoTypeCard'))
const PromotionTypeCard = dynamic(() => import('../PostCard/PromotionTypeCard/PromotionTypeCard'))
const ArticleTypeCard = dynamic(() => import('../PostCard/ArticleTypeCard/ArticleTypeCard'))
const DefaultTypeCard = dynamic(() => import('../PostCard/DefaultTypeCard/DefaultTypeCard'))
const LearnTypeCard = dynamic(() => import('../PostCard/LearnTypeCard/LearnTypeCard'))



const PostsContentStyledDiv = styled.div`
  display: flex;
  flex-direction: ${(props:{postElementSize:string}) => props.postElementSize === 'list' ? 'column' : 'row'} ;
  flex-wrap: ${(props:{postElementSize:string}) => props.postElementSize === 'listSmall' ? 'nowrap' : 'wrap'};
  justify-content: center;
  overflow-y: ${(props:{postElementSize:string}) => props.postElementSize === 'listSmall' ? 'scroll' : 'initial'};
  height: ${(props:{postElementSize:string}) => props.postElementSize === 'listSmall' ? '400px' : 'initial'};
  max-width: ${(props:{postElementSize:string}) => props.postElementSize === 'listSmall' ? '100%' : 'initial'};
  flex-direction: ${(props:{postElementSize:string}) => props.postElementSize === 'listSmall' ? 'column' : 'raw'};

  @media only screen and (min-width: 768px) {
    max-width: ${(props:{postElementSize:string}) => props.postElementSize === 'listSmall' ? '320px' : 'initial'};
  }

`

interface PostsComponentTypes {
    viewType: string,
    _id: string,
    posts: PostTypes[],
    widgetId: string,
    postElementSize:string,
    isSidebar:boolean
}


const Posts = ({viewType, _id, posts, widgetId,postElementSize,isSidebar}: PostsComponentTypes) => {
    // const settings = useSelector((store: settingsPropTypes) => store.settings);
    const elementSize = postElementSize ? postElementSize : useSelector((store: settingsPropTypes) => store.settings?.design?.postElementSize);
    const dispatch = useDispatch()
    const router = useRouter()
    const locale = (router.locale || router.query.locale) === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? '' : router.locale || router.query.locale || '';

    const cardWidth = elementSize === 'listSmall' ? 320 :
        elementSize === 'list' ? 116.6 :
            elementSize === 'smaller' ? 209.8 :
                elementSize === 'small' ? 255 :
                    elementSize === 'medium' ? 320 : 255
    const noImageUrl = '/static/images/noImage/no-image-available.png';
    return (
        <PostsContentStyledDiv className={'posts-content ' + (viewType ? viewType + '-posts-content' : 'standard')} postElementSize={elementSize}>

            {(posts || []).map((post: PostTypes, index: number) => {
                const title = (post?.translations?.[locale as string]?.title || post?.title as string).replace('#', '');
                const dir = router.locale === 'fa' || router.locale === 'ar' && post?.translations?.[locale as string]?.title ? 'rtl' : 'ltr'
                const viewsNumber = post.views || 0
                const views = _shortNumber(viewsNumber)
                const rating = likeValueCalculator(post.likes, post.disLikes)

                const postProps = {
                    dir,
                    views,
                    rating,
                    noImageUrl,
                    post,
                    postElementSize: elementSize,
                    widgetId,
                    cardWidth,
                    title

                }

                if (post.postType === 'video') {
                    if (elementSize === 'list') {
                        // @ts-ignore
                        return <VideoCardTypeList isSidebar={isSidebar} onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>
                    } else {
                         return <VideoTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>
                    }
                } else if (post.postType === 'promotion') {
                    if (elementSize === 'listSmall') {
                        // @ts-ignore
                        return <PromotionCardListSmall isSidebar={isSidebar} onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>
                    } else {
                        return <PromotionTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>
                    }
                } else if (post.postType === 'article') {
                    return <ArticleTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>
                } else if (post.postType === 'learn') {
                    return <LearnTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>
                }else return (
                    <DefaultTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>
                )
            })}
        </PostsContentStyledDiv>
    );
};

export default Posts