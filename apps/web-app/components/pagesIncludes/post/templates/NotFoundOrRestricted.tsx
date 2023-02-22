import React, {FC} from "react";
import styled from "styled-components";
import RelatedPostsRenderer from "@components/pagesIncludes/post/components/common/RelatedPostsRenderer";
import dynamic from "next/dynamic";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import useTranslation from "next-translate/useTranslation";

const PostMetasRenderer = dynamic(() => import('../components/common/PostMetasRenderer/PostMetasRenderer'))
const CommentsRenderer = dynamic(() => import('../components/common/CommentsRenderer/CommentsRenderer'))
const CommentFrom = dynamic(() => import('../components/common/CommentFrom'))
const WidgetsRenderer = dynamic(() => import('../../../includes/WidgetsRenderer/WidgetsRenderer'))

const Style = styled.div`
  margin: auto;

  #main {
    width: 100%;

    article {
      width: 100%;

      .entry-header {
        width: 100%;
        .entry-header-data{
          h1{
            text-align: center;
            color: var(--main-active-color,#f90);
            padding: 8px;
            box-sizing: border-box;
          }
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
`;

interface PropTypes {
}

const NotFoundOrRestricted: FC<PropTypes> = ({}) => {
    const {t} = useTranslation('common');
    const pageData = useSelector(({settings, posts}: Store) => {
        return {
            postPageStyle: settings?.design.postPageStyle,
            post: posts.post
        }
    })
    return (
        <Style id={'primary'} className='post-page' postPageStyle={pageData?.postPageStyle}>
            <main id={'main'}>
                <article>
                    <header className={'entry-header'}>
                        <div className='entry-header-data'>
                            <h1>{t<string>(`This Post is Restricted, Deleted, or is Unpublished`)}</h1>
                        </div>
                    </header>

                    <div className="entry-content">
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
        </Style>
    )
};
export default NotFoundOrRestricted;