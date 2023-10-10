import React, {FC} from "react";
import './NotFoundOrRestricted.styles.scss';
import Link from "next/link";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import RelatedPostsRenderer from "../RelatedPostsRenderer/RelatedPostsRenderer";
import {Widget} from "typescript-types/dist/src/widgets/Widget";
import Comments from "../Comments/Comments";
import {Post} from "typescript-types/dist/src/Post";

interface PropTypes {
    dictionary: {
        [key: string]: string
    },
    widgets: Widget[],
    hasSidebar?: string,
    locale: string,
    post: Post,
    relatedPosts: Post[],
}

const NotFoundOrRestricted: FC<PropTypes> = ({dictionary,widgets,relatedPosts,hasSidebar,locale,post}) => {
    return (
        <div id={'primary'} className='post-page'>
                <div className={'notFoundOrRestricted'}>
                    <div className='entry-header-data'>
                        <h1>{
                            dictionary?.['This Content is Restricted, Deleted, or is Unpublished'] ||
                            'This Content is Restricted, Deleted, or is Unpublished'
                        }</h1>
                        <Link href="/" className='back-to-homepage'>
                            <h2>
                                {dictionary?.['Go To Homepage'] || 'Go To Homepage'}
                            </h2>
                        </Link>
                    </div>
                </div>
            <div className='under-post-widget-area'>
                <WidgetsRenderer widgets={widgets} position='underPost' hasSidebar={hasSidebar} locale={locale}
                                 dictionary={dictionary}/>
            </div>
            <Comments dictionary={dictionary} postId={post?._id}/>
            <RelatedPostsRenderer locale={locale} relatedPosts={relatedPosts} dictionary={dictionary}/>
        </div>

    )
};
export default NotFoundOrRestricted;