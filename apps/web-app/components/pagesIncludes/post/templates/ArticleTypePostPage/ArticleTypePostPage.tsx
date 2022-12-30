import React, {FC, useMemo, useRef} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import PostTitle from "../../components/common/PostTitle";
import PostDescription from "../../components/common/description/Description";
import PostMetasRenderer from "../../components/common/PostMetasRenderer/PostMetasRenderer";
import RelatedPostsRenderer from "../../components/common/RelatedPostsRenderer";
import WidgetsRenderer from "../../../../includes/WidgetsRenderer/WidgetsRenderer";
import CommentFrom from "../../components/common/CommentFrom";
import CommentsRenderer from "../../components/common/CommentsRenderer/CommentsRenderer";
import PostPageStyle from "../../components/styles/PostPageStyle";
import convertDateToIso from "@_variables/_clientVariables/clientVariables/convertDateToIso";
import RatingButtons from "../../components/common/RatingButtons";
import {Store} from "typescript-types";

const Style = styled(PostPageStyle)`
  margin: auto;

  #main {
    width: 100%;

    article {
      width: 100%;

      .entry-header {
        width: 100%;
      }
      .entry-content{
        .rating-price-download{
          display: flex;
          justify-content: flex-start;
        }
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
                        <div className='entry-header-actions'>
                            <RatingButtons rating={true}/>
                        </div>
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
export default ArticleTypePostPage