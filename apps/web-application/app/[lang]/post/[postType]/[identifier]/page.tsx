import { getDictionary } from '../../../../../get-dictionary';
import SidebarWidgetAreaRenderer
  from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import './page.styles.scss';
import postMetaGenerator from './components/postMetaGenerator/postMetaGenerator';
import PostAdminOrAuthorQuickAccessBar
  from './components/PostAdminOrAuthorQuickAccessBar/PostAdminOrAuthorQuickAccessBar';
import Soft404 from '@components/Soft404/Soft404';
import NotFoundOrRestricted from './components/NotFoundOrRestricted/NotFoundOrRestricted';
import PreviewPost from './components/PreviewPost/PreviewPost';
import {Suspense} from 'react';

// import VideoTypePostPage from './components/VideoTypePostPage/VideoTypePostPage';
// import ArticleTypePostPage from './components/ArticleTypePostPage/ArticleTypePostPage';
// import PromotionTypePostPage from './components/PromotionTypePostPage/PromotionTypePostPage';
// import LearnTypePostPage from './components/LearnTypePostPage/LearnTypePostPage';

const VideoTypePostPage = dynamic(() => import('./components/VideoTypePostPage/VideoTypePostPage'));
const ArticleTypePostPage = dynamic(() => import('./components/ArticleTypePostPage/ArticleTypePostPage'));
const PromotionTypePostPage = dynamic(() => import('./components/PromotionTypePostPage/PromotionTypePostPage'));
const LearnTypePostPage = dynamic(() => import('./components/LearnTypePostPage/LearnTypePostPage'));



import { IPageProps, IPageSettings, PostPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getPost from '@lib/actions/database/posts/getPost';
// import getPostRating from '@lib/actions/database/posts/getPostRating';
// import getPostViews from '@lib/actions/database/posts/getPostViews';
import getSettings from '@lib/actions/database/settings/getSettings';
import getWidgets from '@lib/actions/database/widgets/getWidgets';
import Comments from './components/Comments/Comments';
import React from 'react';
import RelatedPostsRenderer from './components/RelatedPostsRenderer/RelatedPostsRenderer';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';
import dynamic from 'next/dynamic';

export const generateMetadata = postMetaGenerator;

const PostPage = async (props: IPageProps) => {


  const searchParams = await props.searchParams;
  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);
  const { identifier, postType } = params;
  const { data, success } = await getPost(identifier as string);

  if (!success || !data || !data.post) {
    return <Soft404 dictionary={dictionary} />;
  }

  const postId = data?.post._id;

  // const postViews = await getPostViews(postId as unknown as string);
  //
  // const postRating = await getPostRating(postId as unknown as string);

  // const { likes } = unwrapResponse(
  //   await getPostRating(postId as unknown as string) as unknown as ServerActionResponse<{
  //     likes: number
  //   }>,
  // );


  const { postPageSettings } = unwrapResponse(
    await getSettings(['postPageSettings']) as unknown as ServerActionResponse<{
      postPageSettings: IPageSettings | undefined;
    }>,
  );

  const widgets = await getWidgets(
    ['postPageLeftSidebar', 'postPageRightSidebar', 'underPost'],
    locale,
  );

  const sidebar = postPageSettings?.sidebar;


  const postProps: PostPageProps = {
    widgets: widgets?.['underPost'],
    post: data?.post,
    views: data.post?.views || 0,
    likes: data.post?.likes || 0,
    hasSidebar: !!sidebar,
    relatedPosts: data?.relatedPosts || [],
    dictionary: dictionary,
    locale: locale,
  };


  if (data?.post?.status !== 'published') {
    return (
      <>
        <Suspense>
          <PostAdminOrAuthorQuickAccessBar
            dictionary={dictionary}
            postId={postId}
            authorId={data?.post?.author?._id}
            status={data?.post.status}
            createdAt={data?.post.createdAt}
            updatedAt={data?.post.updatedAt}
          />
        </Suspense>

        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
          <main id={'primary'} className="main postPage">
            {searchParams?.preview === 'true' && postType ? (
              <PreviewPost{...postProps} postType={postType} />
            ) : (
              <NotFoundOrRestricted dictionary={dictionary} />
            )}

          </main>
          <SidebarWidgetAreaRenderer
            leftSideWidgets={widgets?.['postPageLeftSidebar']}
            rightSideWidgets={widgets?.['postPageRightSidebar']}
            dictionary={dictionary}
            locale={locale}
            sidebar={postPageSettings?.sidebar || 'no'}
            position={'postPage'}
          />
        </div>
      </>
    );
  }

  return (
    <>
      {/*<ViewPostClient _id={postData?.post?._id}/>*/}
      <PostAdminOrAuthorQuickAccessBar
        dictionary={dictionary}
        postId={postId}
        authorId={data?.post?.author?._id}
        status={data?.post.status}
        createdAt={data?.post.createdAt}
        updatedAt={data?.post.updatedAt}
      />

      <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
        <main id={'primary'} className={'main postPage'}>
          {postType === 'video' ? <VideoTypePostPage {...postProps} /> : postType === 'article' ? (
            <ArticleTypePostPage {...postProps} />
          ) : postType === 'promotion' ? (
            <PromotionTypePostPage {...postProps} />
          ) : postType === 'learn' ? (
            <LearnTypePostPage {...postProps} />
          ) : null}
          <RelatedPostsRenderer locale={locale} relatedPosts={data?.relatedPosts || []} dictionary={dictionary} />
          <div className="under-post-widget-area">
            <WidgetsRenderer widgets={widgets?.['underPost']} position="underPost" hasSidebar={sidebar} locale={locale}
                             dictionary={dictionary} />
          </div>
          {(data.post._id && data?.post?.status === 'published') &&
            <Comments dictionary={dictionary} postId={data.post._id} />}

        </main>
        <SidebarWidgetAreaRenderer
          leftSideWidgets={widgets?.['postPageLeftSidebar']}
          rightSideWidgets={widgets?.['postPageRightSidebar']}
          dictionary={dictionary}
          locale={locale}
          sidebar={sidebar || 'no'}
          position={'postPage'}
        />
      </div>
    </>
  );
};

export default PostPage;

// console.log(`post=> `, typeof post?._id);
//
// const postData = identifier ? await fetchPost({identifier}) : {};
// const postViewData = await fetchPostViews({identifier:postData?.post?._id,revalidate: 120});
// const postRatingData = await fetchPostRating({identifier:postData?.post?._id});


//
// else if (postData?.post?.status !== 'published' && searchParams?.preview) {
//     return (
//         <>
//             <PreviewPost widgetsData={widgetsData}
//                          post={postData.post}
//                          dictionary={dictionary}
//                          locale={locale}
//                          sidebar={sidebar || 'no'}
//                          postType={postType}
//                          relatedPosts={postData.relatedPosts}
//
//             />
//         </>
//
//     )
// }