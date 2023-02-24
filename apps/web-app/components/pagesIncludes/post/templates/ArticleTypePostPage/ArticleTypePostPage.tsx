import React, {useMemo, useRef} from "react";
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
      }

      .entry-content {
        .rating-price-download {
          display: flex;
          justify-content: flex-start;
        }
      }
    }
  }

  ${({postPageStyle}: { postPageStyle: string }) => postPageStyle || ''}
`

const ArticleTypePostPage = () => {
    const descriptionRef = useRef<HTMLDivElement>(null)

    const {postPageStyle, post} = useSelector(({settings, posts}: Store) => {
        return {
            postPageStyle: settings?.design.postPageStyle,
            post: posts.post
        }
    })

    return (
        <Style id={'primary'} className='post-page'
               //@ts-ignore
               postPageStyle={postPageStyle}>
            <main id={'main'}>
                <article itemScope itemType={'https://schema.org/BlogPosting'}>
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

                            {!!post.createdAt &&
                                //@ts-ignore
                                <meta itemProp="datePublished" content={convertDateToIso(post.createdAt)}/>}
                            {!!post.updatedAt &&
                                //@ts-ignore
                                <meta itemProp="dateModified" content={convertDateToIso(post.updatedAt)}/>}
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
                    {!!post?.comments?.length && <CommentsRenderer showComments={true}/>}

                </article>
            </main>
        </Style>
    )
};
export default ArticleTypePostPage
