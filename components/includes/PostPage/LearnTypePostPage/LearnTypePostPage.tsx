import PostPageStyle from '../PostPageStyle'
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
import styled from "styled-components";
import PostTitle from '../components/PostTitle/PostTitle'
import LearnTypePostPageDescription from "./components/LearnTypePostPageDescription";
import RelatedPostsRenderer from "@components/includes/PostPage/components/RelatedPostsRenderer";
import React from "react";

const PostMeta = dynamic(() => import('../components/PostMeta/PostMeta'))
const CommentsRenderer = dynamic(() => import('../components/CommentsRenderer/CommentsRenderer'))
const CommentFrom = dynamic(() => import('../components/CommentFrom/CommentFrom'))
const WidgetsRenderer = dynamic(() => import('../../WidgetsRenderer/WidgetsRenderer'))
const RatingButtons = dynamic(() => import('../components/RatingButtons/RatingButtons'))

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
  
  //.rating-price-download {
  //  display: flex;
  //  flex-wrap: wrap;
  //  justify-content: space-between;
  //  width: 98%;
  //
  //  .link-to-source {
  //    display: flex;
  //    justify-content: center;
  //    align-items: center;
  //    margin: 5px 0;
  //  }
  //}

  h1 {
    font-size: 4vw;
    width: 90%;
  }

  a {
    color: var(--main-active-color);
  }
  ${({postPageStyle}: { postPageStyle: string }) => postPageStyle || ''}
`


const LearnTypePostPage = () => {

    const learnTypePostPageData = useSelector(({settings, posts}: StoreTypes) => {
        return {
            postPageStyle: settings?.design.postPageStyle,
            post: posts.post,
        }
    })

    return (
        <LearnTypePostPageStyledMain id={'primary'} className='main post-page' postPageStyle={learnTypePostPageData.postPageStyle}>
            <main id={'main'}>
                <article>
                    <PostTitle/>
                    <LearnTypePostPageDescription/>
                    <div className='rating-price-download'>
                        <RatingButtons rating={true}/>
                        {learnTypePostPageData.post?.source && learnTypePostPageData.post?.source.includes('http') ?
                            <a href={learnTypePostPageData.post?.source} className={'link-to-source btn btn-info'}
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
                    <CommentsRenderer/>
                </article>

            </main>

        </LearnTypePostPageStyledMain>
    );
};
export default LearnTypePostPage;


// {learnTypePostPageData.post?.comments?.length ? <CommentsRenderer/> : null}