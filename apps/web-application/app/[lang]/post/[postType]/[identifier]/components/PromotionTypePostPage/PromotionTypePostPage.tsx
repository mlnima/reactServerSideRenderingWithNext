import React, { FC } from 'react';
import { Post } from "@repo/typescript-types";
import PostDescription from '../PostDescription/PostDescription';
import PostMetasRenderer from '../PostMetasRenderer/PostMetasRenderer';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import { Widget } from "@repo/typescript-types";
import ActionButtons from '../ActionButtons/ActionButtons';
import './PromotionTypePostPage.scss';
import RelatedPostsRenderer from '../RelatedPostsRenderer/RelatedPostsRenderer';
import Comments from '../Comments/Comments';
import Link from 'next/link';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";

interface IProps {
    post: Post;
    views: number;
    likes: number;
    disLikes: number;
    locale: string;
    hasSidebar?: string;
    dictionary: {
        [key: string]: string;
    };
    widgets: Widget[];
    relatedPosts: Post[];
}

const PromotionTypePostPage: FC<IProps> = ({
    widgets,
    post,
    locale,
    dictionary,
    hasSidebar,
    relatedPosts,
    views,
    likes,
    disLikes,
}) => {
    return (
        <div id={'primary'} className="post-page">
            <main id={'main'}>
                <div className={'entry-header promotionEntryHeader'}>
                    <div className="promotionThumbnailLink">
                        <a href={post?.redirectLink}>
                            <img
                                className="thumbnail"
                                src={post?.mainThumbnail || post?.thumbnail?.filePath}
                                alt="title"
                            />
                        </a>
                        {post?.redirectLink &&
                            <Link href={post?.redirectLink} className="btn btn-primary redirectLink" target="_blank">
                            <h1>
                                {post?.translations?.[locale]?.title ?? post?.title}
                                <FontAwesomeIcon className={'rating-icon'} icon={faArrowUpRightFromSquare}/>
                            </h1>
                        </Link>
                        }
                    </div>

                </div>

                <div className="entry-content">
                    <PostDescription description={post?.translations?.[locale]?.description ?? post?.description} />
                    <div className="entry-header-actions">
                        <ActionButtons
                            rating={true}
                            dictionary={dictionary}
                            likes={likes}
                            disLikes={disLikes}
                            views={views}
                            _id={post._id}
                        />
                    </div>
                    <PostMetasRenderer type="categories" metas={post.categories} dictionary={dictionary} />
                    <PostMetasRenderer type="tags" metas={post.tags} dictionary={dictionary} />
                </div>

                {post?.status === 'published' && <Comments dictionary={dictionary} postId={post?._id}/>}
                <RelatedPostsRenderer locale={locale} relatedPosts={relatedPosts} dictionary={dictionary} />
                <div className="under-post-widget-area">
                    <WidgetsRenderer
                        widgets={widgets}
                        position="underPost"
                        hasSidebar={hasSidebar}
                        locale={locale}
                        dictionary={dictionary}
                    />
                </div>
            </main>
        </div>
    );
};

export default PromotionTypePostPage;
