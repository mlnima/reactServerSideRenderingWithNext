import SidebarWidgetAreaRenderer
  from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import { getDictionary } from '../../../get-dictionary';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import PostPage from '@components/PostsPage/PostsPage';
import postsMetaGenerator from './components/postsMetaGenerator/postsMetaGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getWidgets from '@lib/actions/database/operations/widgets/getWidgets';
import getPosts from '@lib/actions/database/operations/posts/getPosts';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import Soft404 from '@components/Soft404/Soft404';

const PostsPage = async (props: IPageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);
  const { postsPageSettings } = await getSettings(['postsPageSettings']);
  const sidebar = postsPageSettings?.sidebar;

  const widgets = await getWidgets([
      'postsPageTop',
      'postsPageLeftSidebar',
      'postsPageBottom',
      'postsPageRightSidebar',
    ],
    locale,
  );

  const currentPageQuery = searchParams?.page || '1';
  const currentPage = (currentPageQuery) ?
    parseInt(currentPageQuery as string, 10) : 1;


  const { success, data } = await getPosts({
    locale,
    page: currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1,
  });


  if (!success || !data) {
    return <Soft404 dictionary={dictionary} />;
  }


  const { posts, totalCount } = data;

  return (
    <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

      <main id={'primary'} className={'main postsPage'}>

        {/*<PostsPageInfo title={meta?.translations?.[locale]?.name ?? meta?.name}*/}
        {/*               description={*/}
        {/*                   meta?.translations?.[locale]?.description ??*/}
        {/*                   meta?.description*/}
        {/*               }/>*/}
        <WidgetsRenderer dictionary={dictionary}
                         locale={locale}
                         widgets={widgets?.['postsPageTop']}
                         position={'postsPageTop'} />
        <PostPage renderPagination
                  posts={posts}
                  locale={locale}
                  dictionary={dictionary}
                  totalCount={totalCount}
                  currentPage={currentPage} />
        <WidgetsRenderer dictionary={dictionary}
                         locale={locale}
                         widgets={widgets?.['postsPageBottom']}
                         position={'postsPageBottom'} />
      </main>

      <SidebarWidgetAreaRenderer leftSideWidgets={widgets?.['postsPageLeftSidebar']}
                                 rightSideWidgets={widgets?.['postsPageRightSidebar']}
                                 dictionary={dictionary}
                                 locale={locale}
                                 sidebar={sidebar || 'no'}
                                 position={'postPage'} />
    </div>
  );
};

export default PostsPage;
export const generateMetadata = postsMetaGenerator;
