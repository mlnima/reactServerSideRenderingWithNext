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
import {Store} from "typescript-types";
import StartDate from "@components/pagesIncludes/post/components/common/StartDate";
import AddToCalendar from "@components/pagesIncludes/post/components/event/AddToCalendar";
import AttendButtons from "@components/pagesIncludes/post/components/event/AttendButtons";


const Style = styled(PostPageStyle)`
  
  #main {
    
    article {
      .entry-header {
        width: 100%;

        h1 {
          text-align: initial;
          font-weight: 700;
          line-height: 1.375;
          font-size: 1.875rem;
        }
      }

      .entry-content {
    
        .info-action-section{
          margin-top: 20px;
       
          display: flex;
          justify-content: flex-start;
          gap: 8px;
          align-items: center;
        }
        .rating-price-download {
          display: flex;
          justify-content: flex-start;
        }
      }
    }
  }

  ${({postPageStyle}: { postPageStyle: string }) => postPageStyle || ''}
`

interface EventTypePostPagePropTypes {
}

const EventTypePostPage: FC<EventTypePostPagePropTypes> = () => {
    const descriptionRef = useRef<HTMLDivElement>(null)

    const {postPageStyle, post, userData} = useSelector(({settings, posts, user}: Store) => {
        return {
            userData: user.userData,
            postPageStyle: settings?.design.postPageStyle,
            post: posts.post
        }
    })

    const datePublished = useMemo(() => convertDateToIso(post.createdAt), [post.createdAt])
    const dateModified = useMemo(() => convertDateToIso(post.updatedAt), [post.updatedAt])

    const isUserAttending = useMemo(() => {
        return post.uniqueData?.attenders?.includes(userData._id)
    }, [post, userData])

    return (
        <Style id={'primary'} className='post-page' postPageStyle={postPageStyle}>
            <main id={'main'}>
                <article itemScope itemType={'https://schema.org/BlogPosting'}>
                    <header className={'entry-header'}>
                        {/*//@ts-ignore*/}
                        <StartDate startDate={post?.uniqueData?.startDate}/>
                        <PostTitle/>
                        <p className={'sub-content'}>{post.uniqueData?.capacity - post.uniqueData?.attenders?.length } place left</p>
                        {!!post.title && <meta itemProp="name" content={post.title}/>}
                        {!!post.title && <meta itemProp="headline" content={post.title}/>}
                        {/*//@ts-ignore*/}
                        {(!!descriptionRef?.current && !!descriptionRef?.current?.textContent) &&
                            <meta itemProp="description" content={descriptionRef?.current?.textContent}/>}
                        {!!post.mainThumbnail && <meta itemProp="thumbnailUrl" content={post.mainThumbnail}/>}
                        {(!!descriptionRef?.current && !!descriptionRef?.current?.textContent) &&
                            <meta itemProp="articleBody" content={descriptionRef?.current?.textContent}/>}
                        {!!datePublished && <meta itemProp="datePublished" content={datePublished}/>}
                        {!!dateModified && <meta itemProp="dateModified" content={dateModified}/>}
                    </header>
                    <div className="entry-content">
                        <PostDescription descriptionRef={descriptionRef}/>
                        <div className={'info-action-section sub-content'}>

                            <AttendButtons isUserAttending={isUserAttending}
                                           postId={post._id}
                                           userId={userData._id}
                            />
                            {!!isUserAttending && <AddToCalendar startDate={post.uniqueData.startDate}
                                                                 endDate={post.uniqueData.startDate || post.uniqueData.startDate}
                                                                 eventName={post.title}/>}
                        </div>


                        <PostMetasRenderer type='categories'/>
                        <PostMetasRenderer type='tags'/>
                    </div>
                    <CommentFrom/>
                    {!!post?.comments?.length && <CommentsRenderer showComments={true}/>}
                    <div className='under-post-widget-area'>
                        <WidgetsRenderer position='underPost'/>
                    </div>
                    <RelatedPostsRenderer/>

                </article>
            </main>
        </Style>
    )
};
export default EventTypePostPage
