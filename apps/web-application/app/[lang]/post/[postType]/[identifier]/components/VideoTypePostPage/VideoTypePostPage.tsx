import React, {FC} from "react";
import {Post} from "typescript-types/dist/src/Post";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import PostTitle from "../PostTitle/PostTitle";
import PostDescription from "../PostDescription/PostDescription";
import PostMetasRenderer from "../PostMetasRenderer/PostMetasRenderer";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import {Widget} from "typescript-types/dist/src/widgets/Widget";
import RatingButtons from "../RatingButtons/RatingButtons";

interface IProps {
    post: Post,
    locale: string,
    hasSidebar?: string,
    dictionary: {
        [key: string]: string
    },
    widgets: Widget[],
}

const VideoTypePostPage: FC<IProps> = ({widgets, post, locale, dictionary,hasSidebar}) => {

    return (
        <div id={'primary'} className='post-page'>
            <main id={'main'}>
                <div className={'entry-header'}>
                    <VideoPlayer post={post} dictionary={dictionary} locale={locale}/>
                    <div className='entry-header-data'>
                        <PostTitle title={post?.translations?.[locale]?.title ?? post?.title}/>

                        <div className='entry-header-actions'>
                            <RatingButtons rating={true}
                                           dictionary={dictionary}
                                           likes={post.likes}
                                           disLikes={post.disLikes}
                                           views={post.views}
                                           _id={post._id}/>
                        </div>

                    </div>

                </div>
                <div className="entry-content">
                    <PostDescription description={post?.translations?.[locale]?.description ?? post?.description}/>
                    <PostMetasRenderer type='actors' metas={post.actors}/>
                    <PostMetasRenderer type='categories' metas={post.categories}/>
                    <PostMetasRenderer type='tags' metas={post.tags}/>
                </div>
                <div className='under-post-widget-area'>
                    <WidgetsRenderer widgets={widgets} position='underPost'  hasSidebar={hasSidebar} locale={locale} dictionary={dictionary}/>
                </div>

            </main>
        </div>
    )
}

export default VideoTypePostPage;