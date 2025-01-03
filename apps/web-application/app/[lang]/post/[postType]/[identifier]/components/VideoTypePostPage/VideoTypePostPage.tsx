import React, {FC} from "react";
import {Post} from "@repo/typescript-types";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import PostTitle from "../PostTitle/PostTitle";
import PostDescription from "../PostDescription/PostDescription";
import PostMetasRenderer from "../PostMetasRenderer/PostMetasRenderer";
import {Widget} from "@repo/typescript-types";
import ActionButtons from "../ActionButtons/ActionButtons";

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
         post,
         locale,
         dictionary,
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
            </div>
        )
    }

export default VideoTypePostPage;