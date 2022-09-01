import React, {FC, useMemo, useRef} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import PostTitle from "@components/includes/PostPage/components/PostTitle/PostTitle";
import PostDescription from "@components/includes/PostPage/components/PostDescription/PostDescription";
import PostMeta from "../components/PostMeta/PostMeta";
import RelatedPostsRenderer from "@components/includes/PostPage/components/RelatedPostsRenderer";
import WidgetsRenderer from "@components/includes/WidgetsRenderer/WidgetsRenderer";
import CommentFrom from "@components/includes/PostPage/components/CommentFrom/CommentFrom";
import CommentsRenderer from "@components/includes/PostPage/components/CommentsRenderer/CommentsRenderer";
import PostPageStyle from "@components/includes/PostPage/PostPageStyle";
import convertDateToIso from "@_variables/clientVariables/convertDateToIso";
import RatingButtons from "@components/includes/PostPage/components/RatingButtons/RatingButtons";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

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

interface ArticleTypePostPagePropTypes {
}

const ArticleTypePostPage: FC<ArticleTypePostPagePropTypes> = (props) => {
    const descriptionRef = useRef<HTMLDivElement>(null)

    const {postPageStyle, post} = useSelector(({settings, posts}: Store) => {
        return {
            postPageStyle: settings?.design.postPageStyle,
            post: posts.post
        }
    })

    const datePublished = useMemo(()=>convertDateToIso(post.createdAt),[post.createdAt])
    const dateModified = useMemo(()=>convertDateToIso(post.updatedAt),[post.updatedAt ])

    return (
        <Style id={'primary'} className='post-page' postPageStyle={postPageStyle}>
            <main id={'main'}>
                <article itemScope itemType={'https://schema.org/BlogPosting'}>
                    <header className={'entry-header'}>
                        <PostTitle/>
                        {!!post.title &&   <meta itemProp="name" content={post.title}/>}
                        {!!post.title &&   <meta itemProp="headline" content={post.title}/>}
                        {/*//@ts-ignore*/}
                        {(!!descriptionRef?.current && !!descriptionRef?.current?.textContent)&&
                        <meta itemProp="description" content={descriptionRef?.current?.textContent}/>}
                        {!!post.mainThumbnail &&    <meta itemProp="thumbnailUrl" content={post.mainThumbnail}/>}
                        {(!!descriptionRef?.current && !!descriptionRef?.current?.textContent) &&
                        <meta itemProp="articleBody" content={ descriptionRef?.current?.textContent}/>}
                        {!!datePublished && <meta itemProp="datePublished" content={datePublished}/>}
                        {!!dateModified && <meta itemProp="dateModified" content={dateModified}/>}
                    </header>
                    <div className="entry-content">
                        <PostDescription descriptionRef={descriptionRef}/>
                        <div className='rating-price-download'>
                            <RatingButtons rating={true}/>
                        </div>
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
export default ArticleTypePostPage
