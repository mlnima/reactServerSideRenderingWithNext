import React, {FC} from "react";
import {Post} from "typescript-types/dist/src/Post";
import PostTitle from "../PostTitle/PostTitle";
import PostMetasRenderer from "../PostMetasRenderer/PostMetasRenderer";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import {Widget} from "typescript-types/dist/src/widgets/Widget";
import RatingButtons from "../RatingButtons/RatingButtons";
import './LearnTypePostPage.styles.scss'
import RelatedPostsRenderer from "../RelatedPostsRenderer/RelatedPostsRenderer";
import LearnTypePostPageDescription from "./LearnTypePostPageDescription/LearnTypePostPageDescription";
import Comments from "../Comments/Comments";

interface IProps {
    post: Post,
    locale: string,
    hasSidebar?: string,
    dictionary: {
        [key: string]: string
    },
    widgets: Widget[],
    relatedPosts: {
        actorsRelatedPosts: {}[],
        categoriesRelatedPosts: {}[],
        tagsRelatedPosts: {}[]
    }
}

const LearnTypePostPage: FC<IProps> = ({widgets, post, locale, dictionary,hasSidebar,relatedPosts}) => {




    return (
        <div id={'primary'} className='post-page'>
            <main id={'main'}>
                <div className={'entry-header'}>
                    <div className='entry-header-data'>
                        <PostTitle title={post?.translations?.[locale]?.title ?? post?.title}/>
                    </div>
                </div>
                <LearnTypePostPageDescription description={post?.translations?.[locale]?.description ?? post?.description}
                                              locale={locale}/>
                <div className="entry-content">
                    <div className='entry-header-actions'>
                        <RatingButtons rating={true}
                                       dictionary={dictionary}
                                       likes={post.likes}
                                       disLikes={post.disLikes}
                                       views={post.views}
                                       _id={post._id}/>
                    </div>
                    <PostMetasRenderer type='categories' metas={post.categories} dictionary={dictionary}/>
                    <PostMetasRenderer type='tags' metas={post.tags} dictionary={dictionary}/>
                </div>
                <div className='under-post-widget-area'>
                    <WidgetsRenderer widgets={widgets} position='underPost'  hasSidebar={hasSidebar} locale={locale} dictionary={dictionary}/>
                </div>
                <Comments dictionary={dictionary} postId={post?._id}/>
                <RelatedPostsRenderer locale={locale} relatedPosts={relatedPosts} dictionary={dictionary}/>
            </main>
        </div>
    )
}

export default LearnTypePostPage;