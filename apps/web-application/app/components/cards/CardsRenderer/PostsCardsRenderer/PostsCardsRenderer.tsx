import { FC } from 'react';
import { IContentSettings, IPost } from '@repo/typescript-types';
import dynamic from 'next/dynamic';
// import './PostsCardsRenderer.scss';
import '../staticCardsWrapper.styles.scss'
const ArticlePostCard = dynamic(() => import('../../cardsComponents/ArticlePostCard/ArticlePostCard'));
const PromotionPostCard = dynamic(() => import('../../cardsComponents/PromotionPostCard/PromotionPostCard'));
const LearnPostCard = dynamic(() => import('../../cardsComponents/LearnPostCard/LearnPostCard'));
const VideoPostCard = dynamic(() => import('../../cardsComponents/VideoPostCard/VideoPostCard'));
const AdPostCard = dynamic(() => import('../../cardsComponents/AdPostCard/AdPostCard'));

interface IProps {
  isSidebar?: boolean,
  locale: string,
  posts?: IPost[],
  previewMode?: boolean,
  dictionary: {
    [key: string]: string
  }
  contentSettings?: IContentSettings;
}

const PostsCardsRenderer: FC<IProps> = async (
  {
    posts,
    locale,
    isSidebar,
    previewMode,
    dictionary,
    contentSettings,
  }) => {

  return (
    // <div className={`postsCardsWrapper${isSidebar ? 'Sidebar' : ''}`}>
    <div className={`staticCardsWrapper${isSidebar ? 'Sidebar' : ''}`}>
      {(posts || []).map((post: IPost, index: number) => {
        const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
        // console.log('defaultLocale=> ',defaultLocale)
        const imagesAllowedDomainsForNextImage = (process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES || '').split(' ') || [];

        const previewModeQuery = previewMode ? '?preview=true' : '';
        //&& post?.status !== 'published'
        const postUrl = locale === defaultLocale ?
          `/post/${post?.postType}/${post._id}${previewModeQuery}` :
          `/${locale}${`/post/${post?.postType}/${post._id}`}${previewModeQuery}`;

        const isNextImageAllowed = post.mainThumbnail ?
          imagesAllowedDomainsForNextImage?.some(domain => post.mainThumbnail?.includes(domain)) :
          false;

        //const settings =  ServerSideStore.getPostSettings(post?.postType)
        // @ts-expect-error: its fine
        const settings = contentSettings?.postSettings?.[post?.postType];

        // console.log(`settings=> `,settings)

        return post?.postType === 'video' ?
          <VideoPostCard index={index}
                         isSidebar={isSidebar}
                         postUrl={postUrl}
                         post={post}
                         locale={locale}
                         dictionary={dictionary}
                         settings={settings}
                         isNextImageAllowed={isNextImageAllowed}
                         key={post._id} /> :
          post?.postType === 'article' ?
            <ArticlePostCard index={index}
                             isSidebar={isSidebar}
                             postUrl={postUrl}
                             post={post}
                             locale={locale}
                             dictionary={dictionary}
                             settings={settings}
                             isNextImageAllowed={isNextImageAllowed}
                             key={post._id} /> :
            post?.postType === 'promotion' ?
              <PromotionPostCard numberOfCardsPerRowInMobile={2} index={index}
                                 postUrl={postUrl}
                                 post={post}
                                 locale={locale}
                                 dictionary={dictionary}
                                 settings={settings}
                                 isNextImageAllowed={isNextImageAllowed}
                                 isSidebar={isSidebar}
                                 key={post._id} /> :
              post?.postType === 'learn' ?
                <LearnPostCard numberOfCardsPerRowInMobile={2} index={index}
                               postUrl={postUrl}
                               post={post}
                               locale={locale}
                               dictionary={dictionary}
                               settings={settings}
                               isNextImageAllowed={isNextImageAllowed}
                               isSidebar={isSidebar}
                               key={post._id} /> :
                post?.postType === 'ad' ?
                  <AdPostCard numberOfCardsPerRowInMobile={2} index={index}
                              postUrl={postUrl}
                              post={post}
                              locale={locale}
                              dictionary={dictionary}
                              settings={settings}
                              isNextImageAllowed={isNextImageAllowed}
                              isSidebar={isSidebar}
                              key={post._id} /> :
                  null;
      })}

    </div>
  );
};
export default PostsCardsRenderer;
