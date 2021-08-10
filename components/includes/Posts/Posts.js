import React, {useState, useEffect, useContext, useMemo} from 'react';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {AppContext} from "../../../context/AppContext";
import _ from "lodash";
import {likeValueCalculator} from "../../../_variables/_variables";

const PostElement = dynamic(() => import('../PostCard/PostElement'))
const VideoTypeCard = dynamic(() => import('../PostCard/VideoCardType/VideoTypeCard'))
const PromotionTypeCard = dynamic(() => import('../PostCard/PromotionTypeCard/PromotionTypeCard'))
const ArticleTypeCard = dynamic(() => import('../PostCard/ArticleTypeCard/ArticleTypeCard'))


const Posts = ({viewType, isMobile, _id, redirectLink, postElementSize, posts, postElementStyle, postElementImageLoaderType, postElementImageLoader, widgetId}) => {
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
              .posts-content {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
              }
            `}</style>
            {(posts || []).map(post => {

                const title = (post?.translations?.[locale]?.title || post?.title).replace('#', '');

                const views = useMemo(() => {
                    const viewsNumber = post.views || 0
                    return viewsNumber > 1000 && viewsNumber < 1000000 ? (viewsNumber / 1000).toFixed(1) + 'K' :
                        viewsNumber > 1000000 ? (viewsNumber / 1000000).toFixed(1) + 'M' :
                            viewsNumber
                }, [])


                const rating = useMemo(() => {
                    return likeValueCalculator(post.likes, post.disLikes)
                }, [])

                if (post.postType === 'video') {
                    return <VideoTypeCard key={_.uniqueId('video_')} views={views} rating={rating} noImageUrl={noImageUrl} post={post} postElementSize={postElementSize} widgetId={widgetId} title={title} cardWidth={cardWidth}/>
                } else if (post.postType === 'promotion') {
                    return <PromotionTypeCard key={_.uniqueId('promotion_')} views={views} rating={rating} noImageUrl={noImageUrl} post={post} postElementSize={postElementSize} widgetId={widgetId} title={title} cardWidth={cardWidth}/>

                } else if (post.postType === 'article') {
                    return <ArticleTypeCard key={_.uniqueId('article_')} views={views} rating={rating} noImageUrl={noImageUrl} post={post} postElementSize={postElementSize} widgetId={widgetId} title={title} cardWidth={cardWidth}/>

                } else return (
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