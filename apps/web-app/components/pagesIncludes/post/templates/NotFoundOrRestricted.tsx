import React, {FC} from "react";
import styled from "styled-components";
import RelatedPostsRenderer from "@components/pagesIncludes/post/components/common/RelatedPostsRenderer";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import {useAppSelector} from "@store_toolkit/hooks";

const PostMetasRenderer = dynamic(() => import('../components/common/PostMetasRenderer/PostMetasRenderer'))
const CommentsRenderer = dynamic(() => import('../components/common/CommentsRenderer/CommentsRenderer'))
const CommentFrom = dynamic(() => import('../components/common/CommentFrom'))
const WidgetsRenderer = dynamic(() => import('../../../includes/WidgetsRenderer/WidgetsRenderer'))

interface IStyles{
    customStyles?:string
}

const Style = styled.div<IStyles>`
  margin: auto;

  #main {
    width: 100%;

    article {
      width: 100%;

      .entry-header {
        width: 100%;

        .entry-header-data {
          h1 {
            text-align: center;
            color: var(--primary-active-color, #f90);
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

  ${({customStyles}) => customStyles || ''}
`;

interface PropTypes {
}

const NotFoundOrRestricted: FC<PropTypes> = ({}) => {
    const {t} = useTranslation('common');

    const {post} = useAppSelector(({posts} ) => posts)
    const {customStyles} = useAppSelector(({settings} ) => settings?.currentPageSettings)

    return (
        <Style id={'primary'} className='post-page' customStyles={customStyles}>
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
                    {post?.comments?.length ? <CommentsRenderer showComments={true}/> : null}
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