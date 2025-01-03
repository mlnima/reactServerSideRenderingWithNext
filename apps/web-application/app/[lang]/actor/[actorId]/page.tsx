import SidebarWidgetAreaRenderer from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import { getDictionary } from '../../../../get-dictionary';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import PostPage from '@components/PostsPage/PostsPage';
import actorMetaGenerator from './components/actorMetaGenerator/actorMetaGenerator';
import MetaAdminQuickAccessBar from '@components/metas/MetaAdminQuickAccessBar';
import ActorBio from './components/ActorBio/ActorBio';
import Soft404 from '@components/Soft404/Soft404';
import { PageParams, PageSearchParams } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import { isValidObjectId } from '@repo/db/dist/src/tools';
import { getSettings } from '@lib/database/operations/settings';
import { getWidgets } from '@lib/database/operations/widgets';
import { getPosts } from '@lib/database/operations/posts';

interface IProps {
  params: PageParams;
  searchParams?: PageSearchParams;
}

const ActorPage = async (props: IProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);

  if (!isValidObjectId(params?.actorId)) {
    return <Soft404 dictionary={dictionary} />;
  }

  const { actorPageSettings } = await getSettings(['actorPageSettings']);

  const sidebar = actorPageSettings?.sidebar;

  const widgets = await getWidgets(['actorPageTop', 'actorPageLeftSidebar', 'actorPageBottom', 'actorPageRightSidebar'], locale);

  const currentPageQuery = searchParams?.page;
  const currentPage = currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1;

  const { meta, posts, totalCount } = await getPosts({
    locale,
    metaId: params?.actorId,
    page: currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1,
  });

  if (!!params?.actorId && !meta) {
    return <Soft404 dictionary={dictionary} />;
  }

  return (
    <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
      <main id={'primary'} className={'main actorPage'}>
        {params.actorId && <MetaAdminQuickAccessBar metaId={params.actorId} />}
        {meta && <ActorBio actorData={meta} />}

        <WidgetsRenderer dictionary={dictionary} locale={locale} widgets={widgets?.['actorPageTop']} position={'actorPageTop'} />
        <PostPage
          renderPagination
          posts={posts || []}
          dictionary={dictionary}
          locale={locale}
          totalCount={totalCount || 0}
          currentPage={currentPage}
        />
        <WidgetsRenderer dictionary={dictionary} locale={locale} widgets={widgets?.['actorPageBottom']} position={'actorPageBottom'} />
      </main>

      <SidebarWidgetAreaRenderer
        leftSideWidgets={widgets?.['actorPageLeftSidebar']}
        rightSideWidgets={widgets?.['actorPageRightSidebar']}
        dictionary={dictionary}
        locale={locale}
        sidebar={sidebar || 'no'}
        position={'actorPage'}
      />
    </div>
  );
};

export default ActorPage;

export const generateMetadata = actorMetaGenerator;
