import React from 'react';
import styled from "styled-components";
import PostPageStyledMain from "../PostPageStyle";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
import PostTitle from "../components/PostTitle/PostTitle";
import RelatedPostsRenderer from "@components/includes/PostPage/components/RelatedPostsRenderer";
// const PostMetaDataToSiteHead = dynamic(() =>
//     import('../components/PostMetaDataToSiteHead/PostMetaDataToSiteHead'))
const EditLinkForAdmin = dynamic(() =>
    import('../components/EditLinkForAdmin/EditLinkForAdmin'), {ssr: false})
const PostMeta = dynamic(() => import('../components/PostMeta/PostMeta'))
const CommentsRenderer = dynamic(() => import('../components/CommentsRenderer/CommentsRenderer'))
const CommentFrom = dynamic(() => import('../components/CommentFrom/CommentFrom'))
const WidgetsRenderer = dynamic(() => import('../../WidgetsRenderer/WidgetsRenderer'))
const RatingButtons = dynamic(() => import('../components/RatingButtons/RatingButtons'))
const DownloadLink = dynamic(() => import('../components/DownloadLink/DownloadLink'))
// const Price = dynamic(() => import('../components/Price/Price'))
const VideoPlayer = dynamic(() => import('../components/VideoPlayer/VideoPlayer'))
const PostDescription = dynamic(() => import('../components/PostDescription/PostDescription'))

const VideoTypePostPageStyledMain = styled(PostPageStyledMain)`
  margin: auto;
`
const VideoTypePostPage = () => {

    const videoTypePostPageData = useSelector(({settings, user, posts}: StoreTypes) => {
        return {
            postPageStyle: settings?.design.postPageStyle,
            role: user?.userData?.role,
            post: posts.post
        }
    })

    return (
        <VideoTypePostPageStyledMain className='main post-page' postPageStyle={videoTypePostPageData?.postPageStyle}>
            {videoTypePostPageData?.role === 'administrator' ? <EditLinkForAdmin/> : null}
            {/*<PostMetaDataToSiteHead/>*/}
            <VideoPlayer/>
            <PostTitle/>
            <div className='rating-price-download'>
                <RatingButtons rating={true}/>
                <DownloadLink
                    downloadLink={videoTypePostPageData?.post.downloadLink || videoTypePostPageData?.post.source}
                    downloadLinks={videoTypePostPageData?.post?.downloadLinks || []}
                    render={videoTypePostPageData?.post?.downloadLink || videoTypePostPageData?.post?.downloadLinks?.length}
                />
            </div>
            <PostDescription />
            <PostMeta type='actors'/>
            <PostMeta type='tags'/>
            <PostMeta type='categories'/>
            <div className='under-post-widget-area'>
                <WidgetsRenderer position='underPost'/>
            </div>
            <RelatedPostsRenderer/>
            <CommentFrom/>
            {videoTypePostPageData?.post?.comments?.length ? <CommentsRenderer/> : null}
        </VideoTypePostPageStyledMain>
    );
};
export default VideoTypePostPage;


// {videoTypePostPageData?.post.postType === 'product' ?
//     <Price price={videoTypePostPageData?.post.price} currency={videoTypePostPageData?.post.currency}/>
//     : null
// }