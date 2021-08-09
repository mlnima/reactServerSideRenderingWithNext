import React, {useState, useEffect, useContext,useMemo} from 'react';
import dynamic from "next/dynamic";
const PostElement = dynamic(() => import('../PostCard/PostElement'))
import {useRouter} from "next/router";
import {AppContext} from "../../../context/AppContext";
import VideoTypeCard from "../PostCard/VideoCardType/VideoTypeCard";
import _ from "lodash";
import PromotionTypeCard from "../PostCard/PromotionTypeCard/PromotionTypeCard";
import ArticleTypeCard from "../PostCard/ArticleTypeCard/ArticleTypeCard";

const Posts = ({viewType, isMobile, _id,redirectLink, postElementSize, posts, postElementStyle,postElementImageLoaderType,postElementImageLoader,widgetId}) => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const locale = (router.locale || router.query.locale) === process.env.REACT_APP_DEFAULT_LOCAL ? '' : router.locale || router.query.locale || '';
    const [state, setState] = useState({
        imageWidth: 255,
    })
    const cardWidth = useMemo(() => {
        return postElementSize === 'list' ? 116.6 :
               postElementSize === 'smaller' ? 209.8 :
               postElementSize === 'small' ? 255 :
               postElementSize === 'medium' ? 320 : 255
    }, [])

    const noImageUrl = '/static/images/noImage/no-image-available.png';






    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) {
                setState({
                    ...state,
                    imageWidth: window.innerWidth,
                })
            }
        }
    }, []);


    return (
        <div className={'posts-content ' + (viewType ? viewType + '-posts-content' : 'standard')}>
            <style jsx>{`
                    .posts-content{
                       display: flex;
                       flex-wrap: wrap;
                       justify-content: center;
                    }
            `}</style>
            {(posts || []).map(post => {

                const title = (post?.translations?.[locale]?.title || post?.title).replace('#', '')

                if (post.postType==='video'){
                   return <VideoTypeCard key={_.uniqueId('video_')} noImageUrl={noImageUrl} post={post} postElementSize={postElementSize} widgetId={widgetId} title={title} cardWidth={cardWidth}/>
                }else if (post.postType==='promotion'){
                    return <PromotionTypeCard key={_.uniqueId('promotion_') } noImageUrl={noImageUrl} post={post} postElementSize={postElementSize} widgetId={widgetId} title={title} cardWidth={cardWidth}/>

                }else if (post.postType==='article'){
                    return <ArticleTypeCard key={_.uniqueId('promotion_') } noImageUrl={noImageUrl} post={post} postElementSize={postElementSize} widgetId={widgetId} title={title} cardWidth={cardWidth}/>

                }else return (
                    <PostElement
                        isMobile={isMobile}
                        onClickLoadingHandler={contextData.functions.loadingHandler}
                        key={post._id}
                        redirectLink={post.redirectLink}
                        widgetId={widgetId}
                        viewType={viewType}
                        postElementSize={postElementSize}
                        postElementStyle={postElementStyle}
                        postElementImageLoader={postElementImageLoader}
                        postElementImageLoaderType={postElementImageLoaderType}
                        title={title}
                        imageWidth={state.imageWidth}
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
        </div>
    );
};

export default Posts