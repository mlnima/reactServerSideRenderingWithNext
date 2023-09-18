import {FC} from "react";
import {Post} from "typescript-types";
import dynamic from "next/dynamic";
import '../staticCardsWrapper.styles.scss'

const ArticlePostCard = dynamic(() => import('../../cardsComponents/ArticlePostCard/ArticlePostCard'))
const PromotionPostCard = dynamic(() => import('../../cardsComponents/PromotionPostCard/PromotionPostCard'))
const LearnPostCard = dynamic(() => import('../../cardsComponents/LearnPostCard/LearnPostCard'))
const VideoPostCard = dynamic(() => import('../../cardsComponents/VideoPostCard/VideoPostCard'))
const AdPostCard = dynamic(() => import('../../cardsComponents/AdPostCard/AdPostCard'))

interface IProps {
    isSidebar?: boolean,
    locale: string,
    posts?: Post[],
}

const PostsCardsRenderer: FC<IProps> = ({posts, locale, isSidebar}) => {

    return (
        <div className={`staticCardsWrapper${isSidebar ? 'Sidebar' : ''}`}>
            {(posts || []).map((post: Post, index: number) => {

                const imagesAllowedDomainsForNextImage = process.env?.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES?.split(' ') || []
                const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

                const postUrl = locale === defaultLocale ?
                    `/post/${post?.postType}/${post._id}` :
                    `/${locale}${`/post/${post?.postType}/${post._id}`}`;

                const isNextIImageAllowed = post.mainThumbnail ?
                    imagesAllowedDomainsForNextImage?.some(domain => post.mainThumbnail?.includes(domain)) :
                    false

                return post?.postType === 'video' ?
                    <VideoPostCard index={index}
                                   isSidebar={isSidebar}
                                   postUrl={postUrl}
                                   post={post}
                                   locale={locale}
                                   isNextIImageAllowed={isNextIImageAllowed}
                                   key={post._id}/> :
                    post?.postType === 'article' ?
                        <ArticlePostCard index={index}
                                         isSidebar={isSidebar}
                                         postUrl={postUrl}
                                         post={post}
                                         locale={locale}
                                         isNextIImageAllowed={isNextIImageAllowed}
                                         key={post._id}/> :
                        post?.postType === 'promotion' ?
                            <PromotionPostCard numberOfCardsPerRowInMobile={2} index={index}
                                               postUrl={postUrl}
                                               post={post}
                                               locale={locale}
                                               isNextIImageAllowed={isNextIImageAllowed}
                                               isSidebar={isSidebar}
                                               key={post._id}/> :
                            post?.postType === 'learn' ?
                                <LearnPostCard numberOfCardsPerRowInMobile={2} index={index}
                                               postUrl={postUrl}
                                               post={post}
                                               locale={locale}
                                               isNextIImageAllowed={isNextIImageAllowed}
                                               isSidebar={isSidebar}
                                               key={post._id}/> :
                                post?.postType === 'ad' ?
                                    <AdPostCard numberOfCardsPerRowInMobile={2} index={index}
                                                postUrl={postUrl}
                                                post={post}
                                                locale={locale}
                                                isNextIImageAllowed={isNextIImageAllowed}
                                                isSidebar={isSidebar}
                                                key={post._id}/> :
                                    null
            })}

        </div>
    )
};
export default PostsCardsRenderer;
