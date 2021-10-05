import React, {useContext} from 'react';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {AppContext} from "../../../context/AppContext";
import {likeValueCalculator} from "../../../_variables/_variables";
import _shortNumber from '../../../_variables/clientVariables/_shortNumber'
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {setLoading} from "../../../store/actions/globalStateActions";
import PromotionCardListSmall from "../PostCard/PromotionTypeCard/PromotionCardListSmall";

const PostElement = dynamic(() => import('../PostCard/PostElement'))
const VideoTypeCard = dynamic(() => import('../PostCard/VideoCardType/VideoTypeCard'))
const PromotionTypeCard = dynamic(() => import('../PostCard/PromotionTypeCard/PromotionTypeCard'))
const ArticleTypeCard = dynamic(() => import('../PostCard/ArticleTypeCard/ArticleTypeCard'))


const PostsContentStyledDiv = styled.div`
  display: flex;
  flex-wrap: ${props=> props.postElementSize === 'listSmall'? 'nowrap' : 'wrap'};
  justify-content: center;
  
  overflow-y: ${props=> props.postElementSize === 'listSmall'? 'scroll' : 'initial'};
  //overflow-x: ${props=> props.postElementSize === 'listSmall'? 'initial' : 'initial'};
  height: ${props=> props.postElementSize === 'listSmall'? '400px' : 'initial'};
  max-width: ${props=> props.postElementSize === 'listSmall'? '100%' : 'initial'};
  flex-direction: ${props=> props.postElementSize === 'listSmall'? 'column' : 'raw'};

  @media only screen and (min-width: 768px) {
    max-width: ${props=> props.postElementSize === 'listSmall'? '320px' : 'initial'};
  }
  
`

const Posts = ({viewType, isMobile, _id, redirectLink, postElementSize, posts, postElementStyle, postElementImageLoaderType, postElementImageLoader, widgetId}) => {
    const contextData = useContext(AppContext);
    const dispatch = useDispatch()
    const router = useRouter()
    const locale = (router.locale || router.query.locale) === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? '' : router.locale || router.query.locale || '';

    const cardWidth = postElementSize === 'listSmall' ? 320 :
                      postElementSize === 'list' ? 116.6 :
                      postElementSize === 'smaller' ? 209.8 :
                      postElementSize === 'small' ? 255 :
                      postElementSize === 'medium' ? 320 : 255

    const noImageUrl = '/static/images/noImage/no-image-available.png';

    return (
        <PostsContentStyledDiv className={'posts-content ' + (viewType ? viewType + '-posts-content' : 'standard')} postElementSize={postElementSize}>

            {(posts || []).map((post,index) => {

                const title = (post?.translations?.[locale]?.title || post?.title).replace('#', '');
                const dir = router.locale === 'fa' || router.locale === 'ar' && post?.translations?.[locale]?.title ? 'rtl' : 'ltr'
                const viewsNumber = post.views || 0
                const views = _shortNumber(viewsNumber)
                const rating = likeValueCalculator(post.likes, post.disLikes)

                if (post.postType === 'video') {
                    return <VideoTypeCard onActivateLoadingHandler={()=> dispatch(setLoading(true))} dir={dir} key={index} views={views} rating={rating} noImageUrl={noImageUrl} post={post} postElementSize={postElementSize} widgetId={widgetId} title={title} cardWidth={cardWidth}/>
                } else if (post.postType === 'promotion') {
                    if (postElementSize === 'listSmall'){
                        return <PromotionCardListSmall onActivateLoadingHandler={ ()=> dispatch(setLoading(true))} dir={dir} key={index} views={views} rating={rating} noImageUrl={noImageUrl} post={post} postElementSize={postElementSize} widgetId={widgetId} title={title} cardWidth={cardWidth}/>
                    }else{
                        return <PromotionTypeCard onActivateLoadingHandler={ ()=> dispatch(setLoading(true))} dir={dir} key={index} views={views} rating={rating} noImageUrl={noImageUrl} post={post} postElementSize={postElementSize} widgetId={widgetId} title={title} cardWidth={cardWidth}/>

                    }
                } else if (post.postType === 'article') {
                    return <ArticleTypeCard onActivateLoadingHandler={ ()=> dispatch(setLoading(true))} dir={dir} key={index} views={views} rating={rating} noImageUrl={noImageUrl} post={post} postElementSize={postElementSize} widgetId={widgetId} title={title} cardWidth={cardWidth}/>
                } else return (
                    <PostElement
                        isMobile={isMobile}
                        onClickLoadingHandler={contextData.functions.loadingHandler}
                        key={index}
                        redirectLink={post.redirectLink}
                        widgetId={widgetId}
                        viewType={viewType}
                        postElementSize={postElementSize}
                        postElementStyle={postElementStyle}
                        postElementImageLoader={postElementImageLoader}
                        postElementImageLoaderType={postElementImageLoaderType}
                        title={title}
                        postType={post.postType}
                        _id={post._id}
                        videoTrailerUrl={post.videoTrailerUrl}
                        price={post.price}
                        duration={post.duration}
                        actors={post.actors}
                        quality={post.quality}
                        rating={post.rating}
                        mainThumbnail={post.mainThumbnail}
                    />
                )
            })}
        </PostsContentStyledDiv>
    );
};

export default Posts