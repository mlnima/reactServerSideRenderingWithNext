import React, { useRef} from "react";
import styled from "styled-components";
import PostTitle from "../../components/common/PostTitle";
import PostDescription from "../../components/common/description/Description";
import PostMetasRenderer from "../../components/common/PostMetasRenderer/PostMetasRenderer";
import RelatedPostsRenderer from "../../components/common/RelatedPostsRenderer";
import WidgetsRenderer from "../../../../includes/WidgetsRenderer/WidgetsRenderer";
import CommentFrom from "../../components/common/CommentFrom";
import CommentsRenderer from "../../components/common/CommentsRenderer/CommentsRenderer";
import PostPageStyle from "../../components/styles/PostPageStyle";
import {convertDateToIsoString} from "custom-util"
import RatingButtons from "../../components/common/RatingButtons";
import Csr from "@components/global/commonComponents/Csr";
import {useAppSelector} from "@store_toolkit/hooks";

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

  ${({customStyles}: { customStyles?: string }) => customStyles || ''}
`

const ArticleTypePostPage = () => {
    const descriptionRef = useRef<HTMLDivElement>(null)

    const {post} = useAppSelector(({posts} ) => posts)
    const {customStyles} = useAppSelector(({settings} ) => settings?.currentPageSettings)

    return (
        //@ts-ignore
        <Style id={'primary'} className='post-page' customStyles={customStyles}>
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
                                <meta itemProp="datePublished" content={convertDateToIsoString(post.createdAt)}/>}
                            {!!post.updatedAt &&
                                //@ts-ignore
                                <meta itemProp="dateModified" content={convertDateToIsoString(post.updatedAt)}/>}
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
