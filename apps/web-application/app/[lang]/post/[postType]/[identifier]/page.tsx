import { getDictionary } from '../../../../../get-dictionary';
import SidebarWidgetAreaRenderer
  from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import './page.styles.scss';
import postMetaGenerator from './components/postMetaGenerator/postMetaGenerator';
import PostAdminOrAuthorQuickAccessBar
  from './components/PostAdminOrAuthorQuickAccessBar/PostAdminOrAuthorQuickAccessBar';
import Soft404 from '@components/Soft404/Soft404';
import NotFoundOrRestricted from './components/NotFoundOrRestricted/NotFoundOrRestricted';
import { IPageProps, IPageSettings, PostPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getPost from '@lib/actions/database/posts/getPost';
import getSettings from '@lib/actions/database/settings/getSettings';
import getWidgets from '@lib/actions/database/widgets/getWidgets';
import Comments from './components/Comments/Comments';
import React from 'react';
import RelatedPostsRenderer from './components/RelatedPostsRenderer/RelatedPostsRenderer';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';
import dynamic from 'next/dynamic';
import ViewPostClient from './components/ViewPostClient/ViewPostClient';
const VideoTypePostPage = dynamic(() => import('./components/VideoTypePostPage/VideoTypePostPage'));
const ArticleTypePostPage = dynamic(() => import('./components/ArticleTypePostPage/ArticleTypePostPage'));
const PromotionTypePostPage = dynamic(() => import('./components/PromotionTypePostPage/PromotionTypePostPage'));
const LearnTypePostPage = dynamic(() => import('./components/LearnTypePostPage/LearnTypePostPage'));

export const generateMetadata = postMetaGenerator;

const PostPage = async (props: IPageProps) => {

  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);
  const { identifier, postType } = params;
  const { data, success } = await getPost(identifier as string);

  if (!success || !data || !data.post) {
    return <Soft404 dictionary={dictionary} />;
  }

  const postId = data?.post._id;

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


  if (data?.post?.status !== 'published') return <NotFoundOrRestricted dictionary={dictionary} />

  return (
    <>

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
      <ViewPostClient _id={data.post._id}/>
    </>
  );
};

export default PostPage;



//*****************************DO NOT DELETE***************************
// const postViews = await getPostViews(postId as unknown as string);
//
// const postRating = await getPostRating(postId as unknown as string);

// const { likes } = unwrapResponse(
//   await getPostRating(postId as unknown as string) as unknown as ServerActionResponse<{
//     likes: number
//   }>,
// );
