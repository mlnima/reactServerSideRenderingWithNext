import React, {FC} from "react";
import {Post} from "@repo/typescript-types";
import PostTitle from "../PostTitle/PostTitle";
import PostMetasRenderer from "../PostMetasRenderer/PostMetasRenderer";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import {Widget} from "@repo/typescript-types";
import ActionButtons from "../ActionButtons/ActionButtons";
import './LearnTypePostPage.styles.scss'
import RelatedPostsRenderer from "../RelatedPostsRenderer/RelatedPostsRenderer";
import LearnTypePostPageDescription from "./LearnTypePostPageDescription/LearnTypePostPageDescription";
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

const LearnTypePostPage: FC<IProps> =
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
                <main id={'main'}>
                    <div className={'entry-header'}>
                        <div className='entry-header-data'>
                            <PostTitle title={post?.translations?.[locale]?.title ?? post?.title}/>
                        </div>
                    </div>
                    <LearnTypePostPageDescription
                        description={post?.translations?.[locale]?.description ?? post?.description}
                        locale={locale}/>
                    <div className="entry-content">
                        <div className='entry-header-actions'>
                            <ActionButtons rating={true}
                                           dictionary={dictionary}
                                           likes={likes}
                                           disLikes={disLikes}
                                           views={views}
                                           _id={post._id}/>
                        </div>
                        <PostMetasRenderer type='categories' metas={post.categories} dictionary={dictionary}/>
                        <PostMetasRenderer type='tags' metas={post.tags} dictionary={dictionary}/>
                    </div>

                    {post?.status === 'published' && <Comments dictionary={dictionary} postId={post?._id}/>}
                    <RelatedPostsRenderer locale={locale} relatedPosts={relatedPosts} dictionary={dictionary}/>
                    <div className='under-post-widget-area'>
                        <WidgetsRenderer widgets={widgets} position='underPost' hasSidebar={hasSidebar} locale={locale}
                                         dictionary={dictionary}/>
                    </div>
                </main>
            </div>
        )
    }

export default LearnTypePostPage;