import React, {FC} from "react";
import {Post} from "typescript-types";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import PostTitle from "../PostTitle/PostTitle";
import PostDescription from "../PostDescription/PostDescription";
import PostMetasRenderer from "../PostMetasRenderer/PostMetasRenderer";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import {Widget} from "typescript-types";
import ActionButtons from "../ActionButtons/ActionButtons";
import RelatedPostsRenderer from "../RelatedPostsRenderer/RelatedPostsRenderer";
import Comments from "../Comments/Comments";

interface IProps {
    post: Post,
    views: number,
    likes: number,
    disLikes: number,
    locale: string,
    hasSidebar?: string,
    dictionary: {
        [key: string]: string
    },
    widgets: Widget[],
    relatedPosts: Post[],
}

const VideoTypePostPage: FC<IProps> =
    ({
         widgets,
         post,
         locale,
         dictionary,
         hasSidebar,
         relatedPosts,
         views,
         likes,
         disLikes
     }) => {

        return (
            <div id={'primary'} className='post-page'>
                <div className={'entry-header'}>
                    <VideoPlayer post={post} dictionary={dictionary} locale={locale}/>
                    <div className='entry-header-data'>
                        <PostTitle title={post?.translations?.[locale]?.title ?? post?.title}/>
                        <div className='entry-header-actions'>
                            <ActionButtons rating={true}
                                           dictionary={dictionary}
                                           likes={likes}
                                           disLikes={disLikes}
                                           views={views}
                                           _id={post._id}/>
                        </div>
                    </div>
                </div>
                <div className="entry-content">
                    <PostDescription description={post?.translations?.[locale]?.description ?? post?.description}/>
                    <PostMetasRenderer type='actors' metas={post.actors} dictionary={dictionary}/>
                    <PostMetasRenderer type='categories' metas={post.categories} dictionary={dictionary}/>
                    <PostMetasRenderer type='tags' metas={post.tags} dictionary={dictionary}/>
                </div>
                {post?.status === 'published' && <Comments dictionary={dictionary} postId={post?._id}/>}

                <RelatedPostsRenderer locale={locale} relatedPosts={relatedPosts} dictionary={dictionary}/>
                <div className='under-post-widget-area'>
                    <WidgetsRenderer widgets={widgets} position='underPost' hasSidebar={hasSidebar} locale={locale}
                                     dictionary={dictionary}/>
                </div>
            </div>
        )
    }

export default VideoTypePostPage;