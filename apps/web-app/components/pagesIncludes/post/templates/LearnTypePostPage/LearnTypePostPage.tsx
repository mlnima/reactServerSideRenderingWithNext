// @ts-nocheck
import PostPageStyle from '../../components/styles/PostPageStyle'
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import styled from "styled-components";
import PostTitle from '../../components/common/PostTitle'
import LearnTypePostPageDescription from "../../components/learn/LearnTypePostPageDescription";
import RelatedPostsRenderer from "../../components/common/RelatedPostsRenderer";
import React from "react";
import {Store} from "typescript-types";

const PostMeta = dynamic(() => import('../../components/common/PostMetasRenderer/PostMetasRenderer'))
const CommentsRenderer = dynamic(() => import('../../components/common/CommentsRenderer/CommentsRenderer'))
const CommentFrom = dynamic(() => import('../../components/common/CommentFrom'))
const WidgetsRenderer = dynamic(() => import('../../../../includes/WidgetsRenderer/WidgetsRenderer'))
const RatingButtons = dynamic(() => import('../../components/common/RatingButtons'))

const LearnTypePostPageStyledMain = styled(PostPageStyle)`
  margin: auto;
  #main{
    width: 100%;
    article{
      width: 100%;
      .entry-header {
        width: 100%;
      }
    }
  }
  
  h1 {
    font-size: 4vw;
    width: 90%;
  }

  a {
    color: var(--main-active-color);
  }
  ${({customStyles}: { customStyles?: string }) => customStyles || ''}
`


const LearnTypePostPage = () => {


    const customStyles = useSelector(({settings}: Store) => settings?.currentPageSettings?.customStyles)
    const post = useSelector(({posts}: Store) => posts.post)

    return (
        <LearnTypePostPageStyledMain id={'primary'} className='main post-page' customStyles={customStyles}>
            <main id={'main'}>
                <article>
                    <PostTitle/>
                    <LearnTypePostPageDescription/>
                    <div className='entry-header-actions'>
                        <RatingButtons rating={true}/>
                        {post?.source && post?.source.includes('http') ?
                            <a href={post?.source} className={'link-to-source btn btn-dark'}
                               target={'_blank'}>Source</a>
                            : null
                        }
                    </div>
                    <PostMeta type='tags'/>
                    <PostMeta type='categories'/>
                    <div className='under-post-widget-area'>
                        <WidgetsRenderer position='underPost'/>
                    </div>
                    <RelatedPostsRenderer/>
                    <CommentFrom/>
                    <CommentsRenderer showComments={true}/>
                </article>

            </main>

        </LearnTypePostPageStyledMain>
    );
};
export default LearnTypePostPage;
