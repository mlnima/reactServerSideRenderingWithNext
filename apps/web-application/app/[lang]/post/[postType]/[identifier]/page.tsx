import { getDictionary } from '../../../../../get-dictionary';
import SidebarWidgetAreaRenderer from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import './page.styles.scss';
import postMetaGenerator from './components/postMetaGenerator/postMetaGenerator';
import PostAdminOrAuthorQuickAccessBar from './components/PostAdminOrAuthorQuickAccessBar/PostAdminOrAuthorQuickAccessBar';
import Soft404 from '@components/Soft404/Soft404';
import NotFoundOrRestricted from './components/NotFoundOrRestricted/NotFoundOrRestricted';
import PreviewPost from './components/PreviewPost/PreviewPost';
import VideoTypePostPage from './components/VideoTypePostPage/VideoTypePostPage';
import ArticleTypePostPage from './components/ArticleTypePostPage/ArticleTypePostPage';
import PromotionTypePostPage from './components/PromotionTypePostPage/PromotionTypePostPage';
import LearnTypePostPage from './components/LearnTypePostPage/LearnTypePostPage';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';

import {
  getPost,
  getPostRating,
  getPostViews,
} from '@lib/database/operations/posts';
import { getSettings } from '@lib/database/operations/settings';
import { getWidgets } from '@lib/database/operations/widgets';
import Comments from './components/Comments/Comments';
import React from 'react';
import RelatedPostsRenderer from "./components/RelatedPostsRenderer/RelatedPostsRenderer";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";

export const generateMetadata = postMetaGenerator;

const PostPage = async (props: IPageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);
  const { identifier, postType } = params;

  const { post, relatedPosts } = await getPost(identifier as string);
  const postId = post?._id ? post._id.toString() : null;

  if (!post) {
    return <Soft404 dictionary={dictionary} />;
  }
  // const comments = await getComments({ onDocument: postId });
  const postViews = await getPostViews(postId as unknown as string);
  const postRating = await getPostRating(postId as unknown as string);
  const { postPageSettings } = await getSettings(['postPageSettings']);
  const widgets = await getWidgets(
    ['postPageLeftSidebar', 'postPageRightSidebar', 'underPost'],
    locale
  );
  const sidebar = postPageSettings?.sidebar;

  if (post?.status !== 'published') {
    return (
      <>
        <PostAdminOrAuthorQuickAccessBar
          dictionary={dictionary}
          postId={postId}
          authorId={post?.author?._id}
          status={post.status}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
        />
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
          <main id={'primary'} className="main postPage">
            {searchParams?.preview === 'true' && postType ? (
              <PreviewPost
                widgets={widgets}
                post={post}
                views={postViews}
                likes={postRating.likes}
                disLikes={postRating.disLikes}
                dictionary={dictionary}
                locale={locale}
                sidebar={postPageSettings?.sidebar || 'no'}
                postType={postType}
                relatedPosts={relatedPosts || []}
              />
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
        authorId={post?.author?._id}
        status={post.status}
        createdAt={post.createdAt}
        updatedAt={post.updatedAt}
      />

      <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
        <main id={'primary'} className={'main postPage'}>
          {postType === 'video' ? (
            <VideoTypePostPage
              widgets={widgets?.['underPost']}
              post={post}
              views={postViews}
              likes={postRating.likes}
              disLikes={postRating.disLikes}
              hasSidebar={sidebar}
              relatedPosts={relatedPosts || []}
              dictionary={dictionary}
              locale={locale}
            />
          ) : postType === 'article' ? (
            <ArticleTypePostPage
              widgets={widgets?.['underPost']}
              post={post}
              views={postViews}
              likes={postRating.likes}
              disLikes={postRating.disLikes}
              hasSidebar={sidebar}
              relatedPosts={relatedPosts || []}
              dictionary={dictionary}
              locale={locale}
            />
          ) : postType === 'promotion' ? (
            <PromotionTypePostPage
              widgets={widgets?.['underPost']}
              post={post}
              views={postViews}
              likes={postRating.likes}
              disLikes={postRating.disLikes}
              hasSidebar={sidebar}
              relatedPosts={relatedPosts || []}
              dictionary={dictionary}
              locale={locale}
            />
          ) : postType === 'learn' ? (
            <LearnTypePostPage
              widgets={widgets?.['underPost']}
              post={post}
              views={postViews}
              likes={postRating.likes}
              disLikes={postRating.disLikes}
              hasSidebar={sidebar}
              relatedPosts={relatedPosts || []}
              dictionary={dictionary}
              locale={locale}
            />
          ) : null}
          <RelatedPostsRenderer locale={locale} relatedPosts={relatedPosts || []} dictionary={dictionary}/>
          <div className='under-post-widget-area'>
            <WidgetsRenderer widgets={widgets?.['underPost']} position='underPost' hasSidebar={sidebar} locale={locale}
                             dictionary={dictionary}/>
          </div>
          {post?.status === 'published' && <Comments dictionary={dictionary} postId={post._id}/>}

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