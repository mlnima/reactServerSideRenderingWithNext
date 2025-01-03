import SidebarWidgetAreaRenderer from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import { getDictionary } from '../../../../get-dictionary';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import PostPage from '@components/PostsPage/PostsPage';
import tagMetaGenerator from './components/tagMetaGenerator/tagMetaGenerator';
import MetaAdminQuickAccessBar from '@components/metas/MetaAdminQuickAccessBar';
import PostsPageInfo from '@components/PostsPage/PostsPageInfo/PostsPageInfo';
import Soft404 from '@components/Soft404/Soft404';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import { isValidObjectId } from '@repo/db/dist/src/tools';
import { getSettings } from '@lib/database/operations/settings';
import { getWidgets } from '@lib/database/operations/widgets';
import { getPosts } from '@lib/database/operations/posts';

const TagPage = async (props: IPageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const locale = localDetector(params.lang);

  const dictionary = await getDictionary(locale);

  if (!isValidObjectId(params.tagId)) {
    return <Soft404 dictionary={dictionary} />;
  }

  const { tagPageSettings } = await getSettings(['tagPageSettings']);
  const sidebar = tagPageSettings?.sidebar;

  const widgets = await getWidgets(['tagPageTop', 'tagPageLeftSidebar', 'tagPageBottom', 'tagPageRightSidebar'], locale);

  const currentPageQuery = searchParams?.page;
  const currentPage = currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1;

  const { meta, posts, totalCount } = await getPosts({
    locale,
    metaId: params?.tagId,
    page: currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1,
  });

  if (!meta) {
    return <Soft404 dictionary={dictionary} />;
  }

  return (
    <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
      <main id={'primary'} className={'main tagPage'}>
        {params.tagId && <MetaAdminQuickAccessBar metaId={params?.tagId} />}

        <PostsPageInfo
          title={meta?.translations?.[locale]?.name ?? meta?.name}
          description={meta?.translations?.[locale]?.description ?? meta?.description}
        />
        <WidgetsRenderer dictionary={dictionary} locale={locale} widgets={widgets?.['tagPageTop']} position={'tagPageTop'} />
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
