import React, {useRef} from 'react';
import styled from "styled-components";
import PostPageStyle from "../../components/styles/PostPageStyle";
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import PostTitle from "../../components/common/PostTitle";
import RelatedPostsRenderer from "../../components/common/RelatedPostsRenderer";
import {Store} from "typescript-types";
const PostMetasRenderer = dynamic(() => import('../../components/common/PostMetasRenderer/PostMetasRenderer'))
const CommentsRenderer = dynamic(() => import('../../components/common/CommentsRenderer/CommentsRenderer'))
const CommentFrom = dynamic(() => import('../../components/common/CommentFrom'))
const WidgetsRenderer = dynamic(() => import('../../../../includes/WidgetsRenderer/WidgetsRenderer'))
const RatingButtons = dynamic(() => import('../../components/common/RatingButtons'))
const DownloadLink = dynamic(() => import('../../components/common/DownloadLink'))
const VideoPlayer = dynamic(() => import('../../components/video/VideoPlayer'))
const PostDescription = dynamic(() => import('../../components/common/description/Description'))

const VideoTypePostPageStyle = styled(PostPageStyle)`
  margin: auto;
  #main {
    width: 100%;
    article {
      width: 100%;
      .entry-header {
        width: 100%;
        border-bottom: var(--default-border);
      }

      .entry-content {
        .actors-container {
          border-top: var(--default-border);
        }
      }
    }
  }

  @media only screen and (min-width: 768px) {
    #main {
      article {
        .entry-content {
          box-sizing: border-box;
        }
      }
    }
  }

  ${({postPageStyle}: { postPageStyle: string }) => postPageStyle || ''}
`

const VideoTypePostPage = () => {
    const pageContentRef = useRef()
    const descriptionRef = useRef<HTMLDivElement>(null)
    const pageData = useSelector(({settings, posts}: Store) => {
        return {
            postPageStyle: settings?.design.postPageStyle,
            post: posts.post
        }
    })

    return (
        <VideoTypePostPageStyle id={'primary'} className='post-page' postPageStyle={pageData?.postPageStyle}
                                ref={pageContentRef}>
            <main id={'main'}>
                <article itemProp={'video'}
                         itemScope
                         itemType={'https://schema.org/VideoObject'}>
                    <header className={'entry-header'}>
                        <VideoPlayer descriptionRef={descriptionRef}/>

                        <div className='entry-header-data'>
                            <PostTitle/>
                            <div className='entry-header-actions'>
                                <RatingButtons rating={true}/>
                                {(pageData?.post?.downloadLink || pageData?.post.source)&&
                                    <DownloadLink downloadLink={pageData?.post.downloadLink || pageData?.post.source}
                                        downloadLinks={pageData?.post?.downloadLinks || []}
                                    />
                                }
                            </div>
                        </div>
                    </header>

                    <div className="entry-content">
                        <PostDescription descriptionRef={descriptionRef}/>
                        <PostMetasRenderer type='actors'/>
                        <PostMetasRenderer type='categories'/>
                        <PostMetasRenderer type='tags'/>
                    </div>
                    <CommentFrom/>
                    {pageData?.post?.comments?.length ? <CommentsRenderer showComments={true}/> : null}
                    <div className='under-post-widget-area'>
                        <WidgetsRenderer position='underPost'/>
                    </div>
                    <RelatedPostsRenderer/>

                </article>
            </main>

        </VideoTypePostPageStyle>
    );
};
export default VideoTypePostPage;
