import SidebarWidgetAreaRenderer
  from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import { getDictionary } from '../../../../get-dictionary';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import PostPage from '@components/PostsPage/PostsPage';
import tagMetaGenerator from './components/tagMetaGenerator/tagMetaGenerator';
import MetaAdminQuickAccessBar from '@components/metas/MetaAdminQuickAccessBar';
import PostsPageInfo from '@components/PostsPage/PostsPageInfo/PostsPageInfo';
import Soft404 from '@components/Soft404/Soft404';
import { IPageProps, IPageSettings } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getSettings from '@lib/actions/database/settings/getSettings';
import getWidgets from '@lib/actions/database/widgets/getWidgets';
import getPosts from '@lib/actions/database/posts/getPosts';
import { isValidObjectId } from '@repo/db';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';

const TagPage = async (props: IPageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const locale = localDetector(params.lang);

  const dictionary = await getDictionary(locale);

  if (!isValidObjectId(params.tagId)) {
    return <Soft404 dictionary={dictionary} />;
  }


  const { tagPageSettings } = unwrapResponse(
    await getSettings(['tagPageSettings']) as unknown as ServerActionResponse<{
      tagPageSettings: IPageSettings | undefined;
    }>,
  );
  const sidebar = tagPageSettings?.sidebar;

  const widgets = await getWidgets(['tagPageTop', 'tagPageLeftSidebar', 'tagPageBottom', 'tagPageRightSidebar'], locale);

  const currentPageQuery = searchParams?.page;
  const currentPage = currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1;

  const { success, data } = await getPosts({
    locale,
    metaId: params?.tagId,
    page: currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1,
  });

  if (!success || !data || !data?.meta) {
    return <Soft404 dictionary={dictionary} />;
  }

  const { meta, posts, totalCount } = data;

  return (
    <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
      <main id={'primary'} className={'main tagPage'}>
        {params.tagId && <MetaAdminQuickAccessBar metaId={params?.tagId} />}

        <PostsPageInfo
          title={meta?.translations?.[locale]?.name ?? meta?.name}
          description={meta?.translations?.[locale]?.description ?? meta?.description}
        />
        <WidgetsRenderer dictionary={dictionary} locale={locale} widgets={widgets?.['tagPageTop']}
                         position={'tagPageTop'} />
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

export default TagPage;

export const generateMetadata = tagMetaGenerator;
