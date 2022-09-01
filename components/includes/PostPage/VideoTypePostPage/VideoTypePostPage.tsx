import React, {useRef} from 'react';
import styled from "styled-components";
import PostPageStyle from "../PostPageStyle";
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import PostTitle from "../components/PostTitle/PostTitle";
import RelatedPostsRenderer from "@components/includes/PostPage/components/RelatedPostsRenderer";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

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

  #main {
    width: 100%;

    article {
      width: 100%;

      .entry-header {
        width: 100%;
      }
    }
  }

  ${({postPageStyle}: { postPageStyle: string }) => postPageStyle || ''}
`

const VideoTypePostPage = () => {

    const descriptionRef = useRef<HTMLDivElement>(null)

    const pageData = useSelector(({settings, posts}: Store) => {
        return {
            postPageStyle: settings?.design.postPageStyle,
            post: posts.post
        }
    })

    return (
        <VideoTypePostPageStyle id={'primary'} className='post-page' postPageStyle={pageData?.postPageStyle}>
            <main id={'main'}>
                <article itemProp={'video'}
                         itemScope
                         //itemType={pageData.post.videoUrl ? 'https://schema.org/VideoObject' : 'https://schema.org/embedUrl'}
                         itemType={ 'https://schema.org/VideoObject' }>
                    <header className={'entry-header'}>
                        <VideoPlayer descriptionRef={descriptionRef}/>
                        <div className='rating-price-download'>
                            <PostTitle/>
                            <RatingButtons rating={true}/>
                            <DownloadLink
                                downloadLink={pageData?.post.downloadLink || pageData?.post.source}
                                downloadLinks={pageData?.post?.downloadLinks || []}
                                render={pageData?.post?.downloadLink || pageData?.post?.downloadLinks?.length}
                            />
                        </div>
                    </header>
                    <div className="entry-content">
                        <PostDescription descriptionRef={descriptionRef}/>
                        <PostMeta type='actors'/>
                        <PostMeta type='categories'/>
                        <PostMeta type='tags'/>
                    </div>
                    <div className='under-post-widget-area'>
                        <WidgetsRenderer position='underPost'/>
                    </div>
                    <RelatedPostsRenderer/>
                    <CommentFrom/>
                    {pageData?.post?.comments?.length ? <CommentsRenderer/> : null}
                </article>
            </main>

        </VideoTypePostPageStyle>
    );
};
export default VideoTypePostPage;
