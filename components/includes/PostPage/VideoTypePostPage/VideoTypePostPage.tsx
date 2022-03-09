import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import PostPageStyledMain from "../PostPageStyle";
import {useSelector} from "react-redux";
import { StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
import {likeDislikeView} from "@_variables/ajaxPostsVariables";
import {animateScroll}  from "react-scroll";
import PostTitle from "../components/PostTitle/PostTitle";
const PostMetaDataToSiteHead = dynamic(() => import('../components/PostMetaDataToSiteHead/PostMetaDataToSiteHead'))
const EditLinkForAdmin = dynamic(() => import('../components/EditLinkForAdmin/EditLinkForAdmin'), {ssr: false})
const PostMeta = dynamic(() => import('../components/PostMeta/PostMeta'))
const CommentsRenderer = dynamic(() => import('../components/CommentsRenderer/CommentsRenderer'))
const CommentFrom = dynamic(() => import('../components/CommentFrom/CommentFrom'))
const WidgetsRenderer = dynamic(() => import('../../WidgetsRenderer/WidgetsRenderer'))
const RatingButtons = dynamic(() => import('../components/RatingButtons/RatingButtons'))
const DownloadLink = dynamic(() => import('../components/DownloadLink/DownloadLink'))
const Price = dynamic(() => import('../components/Price/Price'))
const VideoPlayer = dynamic(() => import('../components/VideoPlayer/VideoPlayer'))
const PostDescription = dynamic(() => import('../components/PostDescription/PostDescription'))

const VideoTypePostPageStyledMain = styled(PostPageStyledMain)`

`
const VideoTypePostPage = () => {

    const videoTypePostPageData = useSelector((store: StoreTypes) => {
        return{
            postPageStyle:store?.settings?.design.postPageStyle,
            userData:store?.user?.userData,
            post:store.posts.post
        }
    })



    const [ratingAndViewData, setRatingAndViewData] = useState({
        like: 0,
        disLike: 0,
        view: 0
    })

    useEffect(() => {
        animateScroll.scrollToTop();
        likeDislikeView(videoTypePostPageData?.post._id, 'views').then(res => {
            // @ts-ignore
            if (res.data.updatedData) {
                // @ts-ignore
                setRatingAndViewData(res.data.updatedData)
            }
        })
    }, []);


    return (
        <VideoTypePostPageStyledMain className='main post-page' postPageStyle={videoTypePostPageData?.postPageStyle}>
            {videoTypePostPageData?.userData?.role === 'administrator' ?
                <EditLinkForAdmin _id={videoTypePostPageData?.post._id} status={videoTypePostPageData?.post.status}/>
                : null
            }
            <PostMetaDataToSiteHead/>
            {videoTypePostPageData?.post.postType === 'video' ? <VideoPlayer post={videoTypePostPageData?.post}/> : null}
            <PostTitle title={videoTypePostPageData?.post.title} translations={videoTypePostPageData?.post.translations}/>
            <div className='rating-price-download'>
                <RatingButtons _id={videoTypePostPageData?.post._id}
                               ratingAndViewData={ratingAndViewData}
                               setRatingAndViewData={setRatingAndViewData}
                               rating={true}
                />
                {videoTypePostPageData?.post.postType === 'product' ?
                    <Price price={videoTypePostPageData?.post.price} currency={videoTypePostPageData?.post.currency}/>
                    : null
                }
                <DownloadLink downloadLink={videoTypePostPageData?.post.downloadLink || videoTypePostPageData?.post.source}
                              downloadLinks={videoTypePostPageData?.post?.downloadLinks || []}
                              render={videoTypePostPageData?.post.downloadLink || videoTypePostPageData?.post.downloadLinks.length }
                />
            </div>
            <PostDescription description={videoTypePostPageData?.post.description}
                             translations={videoTypePostPageData?.post.translations}
            />
            <PostMeta type='actors' data={videoTypePostPageData?.post.actors || []}/>
            <PostMeta type='tags' data={videoTypePostPageData?.post.tags || []}/>
            <PostMeta type='categories' data={videoTypePostPageData?.post.categories || []}/>
            <div className='under-post-widget-area'>
                <WidgetsRenderer position='underPost'/>
            </div>
            <CommentFrom documentId={videoTypePostPageData?.post._id} />
            {videoTypePostPageData?.post?.comments?.length ? <CommentsRenderer/> : null}
        </VideoTypePostPageStyledMain>
    );
};
export default VideoTypePostPage;
