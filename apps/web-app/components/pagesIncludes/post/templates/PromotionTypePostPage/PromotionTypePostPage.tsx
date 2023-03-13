// @ts-nocheck
import React, { useMemo, useRef} from "react";
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
import Csr from "@components/global/commonComponents/Csr";

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

  ${({customStyles}: { customStyles?: string }) => customStyles || ''}
`
const PromotionTypePostPage = () => {
    const descriptionRef = useRef<HTMLDivElement>(null)

    const {post} = useSelector(({posts}: Store) => posts)
    const {customStyles} = useSelector(({settings}: Store) => settings?.currentPageSettings)

    const datePublished = useMemo(() => convertDateToIso(post.createdAt), [post.createdAt])
    const dateModified = useMemo(() => convertDateToIso(post.updatedAt), [post.updatedAt])

    return (
        <Style id={'primary'} className='post-page' customStyles={customStyles}>
            <main id={'main'}>
                <article itemProp={'BlogPosting'} itemScope itemType={'https://schema.org/BlogPosting'}>
                    <header className={'entry-header'}>
                        <PostTitle/>
                        <Csr>
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
                        </Csr>
                    </header>

                    <div className="entry-content">
                        <PostDescription descriptionRef={descriptionRef}/>
                        <div className='entry-header-actions'>
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
                    {!!post?.comments?.length && <CommentsRenderer showComments={true}/> }
                </article>
            </main>
        </Style>
    )
};
export default PromotionTypePostPage
