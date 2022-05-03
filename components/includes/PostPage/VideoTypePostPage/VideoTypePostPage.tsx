import React from 'react';
import styled from "styled-components";
import PostPageStyle from "../PostPageStyle";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
import PostTitle from "../components/PostTitle/PostTitle";
import RelatedPostsRenderer from "@components/includes/PostPage/components/RelatedPostsRenderer";

const PostMeta = dynamic(() => import('../components/PostMeta/PostMeta'))
const CommentsRenderer = dynamic(() => import('../components/CommentsRenderer/CommentsRenderer'))
const CommentFrom = dynamic(() => import('../components/CommentFrom/CommentFrom'))
const WidgetsRenderer = dynamic(() => import('../../WidgetsRenderer/WidgetsRenderer'))
const RatingButtons = dynamic(() => import('../components/RatingButtons/RatingButtons'))
const DownloadLink = dynamic(() => import('../components/DownloadLink/DownloadLink'))

const VideoPlayer = dynamic(() => import('../components/VideoPlayer/VideoPlayer'))
const PostDescription = dynamic(() => import('../components/PostDescription/PostDescription'))

const VideoTypePostPageStyle = styled(PostPageStyle)`
  margin: auto;
  #main{
    width: 100%;
    .entry-header {
      width: 100%;
    }
  }


  ${({postPageStyle}: { postPageStyle: string }) => postPageStyle || ''}
`

const VideoTypePostPage = () => {

    const videoTypePostPageData = useSelector(({settings, posts}: StoreTypes) => {
        return {
            postPageStyle: settings?.design.postPageStyle,
            post: posts.post
        }
    })

    return (
        <VideoTypePostPageStyle id={'primary'} className='post-page' postPageStyle={videoTypePostPageData?.postPageStyle}>
            <main id={'main'}>
                <header className={'entry-header'}>
                    <VideoPlayer/>
                    <div className='rating-price-download'>
                        <RatingButtons rating={true}/>
                        <DownloadLink
                            downloadLink={videoTypePostPageData?.post.downloadLink || videoTypePostPageData?.post.source}
                            downloadLinks={videoTypePostPageData?.post?.downloadLinks || []}
                            render={videoTypePostPageData?.post?.downloadLink || videoTypePostPageData?.post?.downloadLinks?.length}
                        />
                    </div>
                </header>
                <div className="entry-content">
                    <PostTitle/>
                    <PostDescription/>
                    <PostMeta type='actors'/>
                    <PostMeta type='tags'/>
                    <PostMeta type='categories'/>
                </div>
                <div className='under-post-widget-area'>
                    <WidgetsRenderer position='underPost'/>
                </div>
                <RelatedPostsRenderer/>
                <CommentFrom/>
                {videoTypePostPageData?.post?.comments?.length ? <CommentsRenderer/> : null}
            </main>
        </VideoTypePostPageStyle>
    );
};
export default VideoTypePostPage;
