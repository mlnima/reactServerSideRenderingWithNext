import React, {useRef} from 'react';
import styled from "styled-components";
import PostPageStyle from "../PostPageStyle";
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import PostTitle from "../components/PostTitle/PostTitle";
import RelatedPostsRenderer from "../components/RelatedPostsRenderer";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
// import ShowHideCommentsButton
//     from "@components/includes/PostPage/components/ShowHideCommentsButton/ShowHideCommentsButton";

const PostMetasRenderer = dynamic(() => import('../components/PostMetasRenderer/PostMetasRenderer'))
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
        border-bottom: var(--default-border);
        .entry-header-data {
          .entry-header-actions {
            //padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
          }
        }
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
        .entry-header{
          .entry-header-data{
            .entry-header-actions{
              margin-bottom: 10px;
              .rating-buttons,.show-hide-comments,.download-button{
                .rating-item,.show-hide-comments-button,.download-link{
                  flex-direction: row;
                  p {
                    margin: 0 0 0 5px;
                    font-size: small;
                    padding: 0;
                  }
                }
              }
            }
          }

        }
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
    // const [showComments, setShowComments] = useState(false)
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
                    //itemType={pageData.post.videoUrl ? 'https://schema.org/VideoObject' : 'https://schema.org/embedUrl'}
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
