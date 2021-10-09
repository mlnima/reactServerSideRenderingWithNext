import React, {useContext} from 'react';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {AppContext} from "../../../context/AppContext";
import {likeValueCalculator} from "../../../_variables/_variables";
import _shortNumber from '../../../_variables/clientVariables/_shortNumber'
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../../store/actions/globalStateActions";
import PromotionCardListSmall from "../PostCard/PromotionTypeCard/PromotionCardListSmall";
import {settingsPropTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
import {PostTypes} from "../../../_variables/TypeScriptTypes/PostTypes";

const PostElement = dynamic(() => import('../PostCard/PostElement'))
const VideoTypeCard = dynamic(() => import('../PostCard/VideoCardType/VideoTypeCard'))
const PromotionTypeCard = dynamic(() => import('../PostCard/PromotionTypeCard/PromotionTypeCard'))
const ArticleTypeCard = dynamic(() => import('../PostCard/ArticleTypeCard/ArticleTypeCard'))


const PostsContentStyledDiv = styled.div`
  display: flex;
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
    viewType: string;
    isMobile: boolean;
    _id: string;
    posts: PostTypes[];
    widgetId: string

}


const Posts = ({viewType, isMobile, _id, posts, widgetId}: PostsComponentTypes) => {
    const settings = useSelector((state: settingsPropTypes) => state.settings);
    const contextData = useContext(AppContext);
    const dispatch = useDispatch()
    const router = useRouter()
    const locale = (router.locale || router.query.locale) === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? '' : router.locale || router.query.locale || '';

    const cardWidth = settings.design?.postElementSize === 'listSmall' ? 320 :
        settings.design?.postElementSize === 'list' ? 116.6 :
            settings.design?.postElementSize === 'smaller' ? 209.8 :
                settings.design?.postElementSize === 'small' ? 255 :
                    settings.design?.postElementSize === 'medium' ? 320 : 255

    const noImageUrl = '/static/images/noImage/no-image-available.png';

    return (
        <PostsContentStyledDiv className={'posts-content ' + (viewType ? viewType + '-posts-content' : 'standard')} postElementSize={settings.design?.postElementSize}>

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
                    postElementSize: settings.design?.postElementSize,
                    widgetId,
                    cardWidth,
                    title

                }

                if (post.postType === 'video') {
                    return <VideoTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>
                } else if (post.postType === 'promotion') {
                    if (settings.design?.postElementSize === 'listSmall') {
                        // @ts-ignore
                        return <PromotionCardListSmall onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>
                    } else {
                        return <PromotionTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>

                    }
                } else if (post.postType === 'article') {
                    return <ArticleTypeCard onActivateLoadingHandler={() => dispatch(setLoading(true))} {...postProps} key={index}/>
                } else return (
                    <PostElement
                        {...postProps}
                        isMobile={isMobile}
                        onClickLoadingHandler={contextData.functions.loadingHandler}
                        key={index}
                        redirectLink={post.redirectLink}

                        viewType={viewType}

                        postElementStyle={settings.design?.postElementStyle}
                        postElementImageLoader={settings.design?.postElementImageLoader}
                        postElementImageLoaderType={settings.design?.postElementImageLoaderType}

                        postType={post.postType}
                        _id={post._id}
                        videoTrailerUrl={post.videoTrailerUrl}
                        price={post.price}
                        duration={post.duration}
                        actors={post.actors}
                        quality={post.quality}

                        mainThumbnail={post.mainThumbnail}
                    />
                )
            })}
        </PostsContentStyledDiv>
    );
};

export default Posts