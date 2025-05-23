import SidebarWidgetAreaRenderer
  from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import { getDictionary } from '../../../../get-dictionary';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import PostPage from '@components/PostsPage/PostsPage';
import categoryMetaGenerator from './components/categoryMetaGenerator/categoryMetaGenerator';
import MetaAdminQuickAccessBar from '@components/metas/MetaAdminQuickAccessBar';
import PostsPageInfo from '@components/PostsPage/PostsPageInfo/PostsPageInfo';
import Soft404 from '@components/Soft404/Soft404';
import { IPageSettings, PageParams, PageSearchParams } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getSettings from '@lib/actions/database/settings/getSettings';
import getWidgets from '@lib/actions/database/widgets/getWidgets';
import getPosts from '@lib/actions/database/posts/getPosts';
import { isValidObjectId } from '@repo/db';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';

interface IProps {
  params: PageParams;
  searchParams?: PageSearchParams;
}

const CategoryPage = async (props: IProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);

  if (!isValidObjectId(params?.categoryId)) {
    return <Soft404 dictionary={dictionary} />;
  }

  const { categoryPageSettings } = unwrapResponse(
    await getSettings(['categoryPageSettings']) as unknown as ServerActionResponse<{
      categoryPageSettings: IPageSettings | undefined;
    }>,
  );


  const sidebar = categoryPageSettings?.sidebar;
  // const sidebar = 'both';

  const widgets = await getWidgets(['categoryPageTop', 'categoryPageLeftSidebar', 'categoryPageBottom', 'categoryPageRightSidebar'], locale);

  const currentPageQuery = searchParams?.page;
  const currentPage = currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1;

  const { success, data } = await getPosts({
    locale,
    metaId: params?.categoryId,
    page: currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1,
  });

  if (!success || !data || !data?.meta) {
    return <Soft404 dictionary={dictionary} />;
  }

  const { posts, meta, totalCount } = data;


  return (
    <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
      <main id={'primary'} className={'main categoryPage'}>
        {params.categoryId && <MetaAdminQuickAccessBar metaId={params?.categoryId} />}

        <PostsPageInfo
          title={meta?.translations?.[locale]?.name ?? meta?.name}
          description={meta?.translations?.[locale]?.description ?? meta?.description}
        />
        <WidgetsRenderer
          dictionary={dictionary}
          locale={locale}
          widgets={widgets?.['categoryPageTop']}
          position={'categoryPageTop'}
        />
        <PostPage
          renderPagination
          posts={posts || []}
          locale={locale}
          dictionary={dictionary}
          totalCount={totalCount || 0}
          currentPage={currentPage}
        />
        <WidgetsRenderer
          dictionary={dictionary}
          locale={locale}
          widgets={widgets?.['categoryPageBottom']}
          position={'categoryPageBottom'}
        />
      </main>

      <SidebarWidgetAreaRenderer
        leftSideWidgets={widgets?.['categoryPageLeftSidebar']}
        rightSideWidgets={widgets?.['categoryPageRightSidebar']}
        dictionary={dictionary}
        locale={locale}
        sidebar={sidebar || 'no'}
        position={'postPage'}
      />
    </div>
  );
};

export default CategoryPage;

export const generateMetadata = categoryMetaGenerator;

