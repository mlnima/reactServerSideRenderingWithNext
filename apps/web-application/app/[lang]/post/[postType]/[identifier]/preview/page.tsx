import { getDictionary } from '../../../../../../get-dictionary';
import SidebarWidgetAreaRenderer
  from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import '../page.styles.scss';
import postMetaGenerator from '../components/postMetaGenerator/postMetaGenerator';
import PostAdminOrAuthorQuickAccessBar
  from '../components/PostAdminOrAuthorQuickAccessBar/PostAdminOrAuthorQuickAccessBar';
import Soft404 from '@components/Soft404/Soft404';
import NotFoundOrRestricted from '../components/NotFoundOrRestricted/NotFoundOrRestricted';
import PreviewPost from '../components/PreviewPost/PreviewPost';
import { Suspense } from 'react';
import { IPageProps, IPageSettings, PostPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getPost from '@lib/actions/database/posts/getPost';
import getSettings from '@lib/actions/database/settings/getSettings';
import getWidgets from '@lib/actions/database/widgets/getWidgets';
import React from 'react';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';

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

  return (

    <Suspense>
      <PostAdminOrAuthorQuickAccessBar
        dictionary={dictionary}
        postId={postId}
        authorId={data?.post?.author?._id}
        status={data?.post.status}
        createdAt={data?.post.createdAt}
        updatedAt={data?.post.updatedAt}
      />


      <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
        <main id={'primary'} className="main postPage">
          {postType ? (
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
    </Suspense>

  );
};

export default PostPage;
