import React, {FC, useMemo, useRef} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import PostTitle from "@components/includes/PostPage/components/PostTitle/PostTitle";
import PostDescription from "@components/includes/PostPage/components/PostDescription/PostDescription";
import PostMetasRenderer from "../components/PostMetasRenderer/PostMetasRenderer";
import RelatedPostsRenderer from "@components/includes/PostPage/components/RelatedPostsRenderer";
import WidgetsRenderer from "@components/includes/WidgetsRenderer/WidgetsRenderer";
import CommentFrom from "@components/includes/PostPage/components/CommentFrom/CommentFrom";
import CommentsRenderer from "@components/includes/PostPage/components/CommentsRenderer/CommentsRenderer";
import PostPageStyle from "@components/includes/PostPage/PostPageStyle";
import convertDateToIso from "@_variables/_clientVariables/clientVariables/convertDateToIso";
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
        .promotion-thumbnail-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .main-thumbnail {
            margin: auto;
            max-width: 320px;
          }

          .redirect-link {
            color: var(--main-text-color);
            padding: 10px 20px;
            border: var(--main-text-color) 1px solid;
          }
        }
      }
    }
  }

  ${({postPageStyle}: { postPageStyle: string }) => postPageStyle || ''}
`

interface PromotionTypePostPagePropTypes {

}

const PromotionTypePostPage: FC<PromotionTypePostPagePropTypes> = ({}) => {
    const descriptionRef = useRef<HTMLDivElement>(null)

    const {postPageStyle, post} = useSelector(({settings, posts}: Store) => {
        return {
            postPageStyle: settings?.design.postPageStyle,
            post: posts.post
        }
    })

    const datePublished = useMemo(() => convertDateToIso(post.createdAt), [post.createdAt])
    const dateModified = useMemo(() => convertDateToIso(post.updatedAt), [post.updatedAt])

    return (
        <Style id={'primary'} className='post-page' postPageStyle={postPageStyle}>
            <main id={'main'}>
                <article itemProp={'BlogPosting'} itemScope itemType={'https://schema.org/BlogPosting'}>
                    <header className={'entry-header'}>
                        <PostTitle/>
                        {!!post.title && <meta itemProp="name" content={post.title}/>}
                        {!!post.title && <meta itemProp="headline" content={post.title}/>}
                        {(!!descriptionRef?.current && !!descriptionRef?.current?.textContent) &&
                        <meta itemProp="description" content={descriptionRef?.current?.textContent}/>}
                        {!!post.mainThumbnail && <meta itemProp="thumbnailUrl" content={post.mainThumbnail}/>}
                        {(!!descriptionRef?.current && !!descriptionRef?.current?.textContent) &&
                        <meta itemProp="articleBody" content={descriptionRef?.current?.textContent}/>}
                        {!!datePublished && <meta itemProp="datePublished" content={datePublished}/>}
                        {!!dateModified && <meta itemProp="dateModified" content={dateModified}/>}
                        <div className='promotion-thumbnail-link'>
                            <a href={post?.redirectLink}>
                                <img className='main-thumbnail' src={post?.mainThumbnail} alt="title"/></a>
                            <a href={post?.redirectLink} className='redirect-link' target='_blank'>go
                                to {post?.title}</a>
                        </div>
                    </header>

                    <div className="entry-content">
                        <PostDescription descriptionRef={descriptionRef}/>
                        <div className='rating-price-download'>
                            <RatingButtons rating={true}/>
                        </div>
                        <PostMetasRenderer type='categories'/>
                        <PostMetasRenderer type='tags'/>
                    </div>
                    <div className='under-post-widget-area'>
                        <WidgetsRenderer position='underPost'/>
                    </div>
                    <RelatedPostsRenderer/>
                    <CommentFrom/>
                    {post?.comments?.length ? <CommentsRenderer  showComments={true}/> : null}
                </article>
            </main>
        </Style>
    )
};
export default PromotionTypePostPage
