import React, {FC, useRef} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import PostTitle from "@components/includes/PostPage/components/PostTitle/PostTitle";
import PostDescription from "@components/includes/PostPage/components/PostDescription/PostDescription";
import PostMeta from "../components/PostMeta/PostMeta";
import RelatedPostsRenderer from "@components/includes/PostPage/components/RelatedPostsRenderer";
import WidgetsRenderer from "@components/includes/WidgetsRenderer/WidgetsRenderer";
import CommentFrom from "@components/includes/PostPage/components/CommentFrom/CommentFrom";
import CommentsRenderer from "@components/includes/PostPage/components/CommentsRenderer/CommentsRenderer";
import PostPageStyle from "@components/includes/PostPage/PostPageStyle";

const Style = styled(PostPageStyle)`
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

interface ComponentPropTypes {
}

const Component: FC<ComponentPropTypes> = (props) => {
    const descriptionRef = useRef<HTMLDivElement>(null)

    const {postPageStyle, post} = useSelector(({settings, posts}: StoreTypes) => {
        return {
            postPageStyle: settings?.design.postPageStyle,
            post: posts.post
        }
    })
    return (
        <Style id={'primary'} className='post-page' postPageStyle={postPageStyle}>
            <main id={'main'}>
                <article itemProp={'video'} itemScope>
                    <header className={'entry-header'}>
                        <PostTitle/>
                        <div className='promotion-thumbnail-link'>
                            <a href={post?.redirectLink}>
                                <img className='main-thumbnail' src={post?.mainThumbnail} alt="title"/></a>
                            <a href={post?.redirectLink} className='redirect-link' target='_blank'>go
                                to {post?.title}</a>
                        </div>
                    </header>
                    <div className="entry-content">
                        <PostDescription descriptionRef={descriptionRef}/>
                        <PostMeta type='categories'/>
                        <PostMeta type='tags'/>
                    </div>
                    <div className='under-post-widget-area'>
                        <WidgetsRenderer position='underPost'/>
                    </div>
                    <RelatedPostsRenderer/>
                    <CommentFrom/>
                    {post?.comments?.length ? <CommentsRenderer/> : null}
                </article>
            </main>
        </Style>
    )
};
export default Component
