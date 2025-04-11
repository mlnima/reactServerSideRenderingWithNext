import SidebarWidgetAreaRenderer
  from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import { getDictionary } from '../../../../get-dictionary';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import PostPage from '@components/PostsPage/PostsPage';
import actorMetaGenerator from './components/actorMetaGenerator/actorMetaGenerator';
import MetaAdminQuickAccessBar from '@components/metas/MetaAdminQuickAccessBar';
import ActorBio from './components/ActorBio/ActorBio';
import Soft404 from '@components/Soft404/Soft404';
import { IMeta, IPost, PageParams, PageSearchParams, IInitialSettings } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import getWidgets from '@lib/actions/database/operations/widgets/getWidgets';
import getPosts from '@lib/actions/database/operations/posts/getPosts';
import { isValidObjectId } from '@repo/db';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';

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

  const { initialSettings } = unwrapResponse(
    await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
      initialSettings: IInitialSettings | undefined
    }>,
  );

  const {
    data: { actorPageSettings: { sidebar = 'no' } = {} } = {},
  } = await getSettings(['actorPageSettings']) as unknown as ServerActionResponse<{
    actorPageSettings: { sidebar: boolean }
  }>;
  // we can get the widget dynamically later so if there is no sidebar enabled we can avoid getting them from db

  const widgets = await getWidgets(['actorPageTop', 'actorPageLeftSidebar', 'actorPageBottom', 'actorPageRightSidebar'], locale);

  const currentPageQuery = searchParams?.page;
  const currentPage = currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1;

  const {
    success: isGettingPostSucceed,
    data: { posts = [], meta = null, totalCount = 0 } = {},
  } = await getPosts({
    locale,
    metaId: params?.actorId,
    page: currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1,
  }) as unknown as ServerActionResponse<{
    posts: IPost[],
    meta: IMeta | null,
    totalCount: number
  }>;


  if (!isGettingPostSucceed || !meta) {
    return <Soft404 dictionary={dictionary} />;
  }

  return (
    <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
      <main id={'primary'} className={'main actorPage'}>
        {params.actorId && <MetaAdminQuickAccessBar metaId={params.actorId} />}
        {meta && <ActorBio actorData={meta} />}

        <WidgetsRenderer dictionary={dictionary} locale={locale} widgets={widgets?.['actorPageTop']}
                         position={'actorPageTop'} />
        <PostPage
          renderPagination
          posts={posts || []}
          dictionary={dictionary}
          locale={locale}
          totalCount={totalCount || 0}
          currentPage={currentPage}
          contentSettings={initialSettings?.contentSettings}
        />
        <WidgetsRenderer dictionary={dictionary} locale={locale} widgets={widgets?.['actorPageBottom']}
                         position={'actorPageBottom'} />
      </main>

      <SidebarWidgetAreaRenderer
        leftSideWidgets={widgets?.['actorPageLeftSidebar']}
        rightSideWidgets={widgets?.['actorPageRightSidebar']}
        dictionary={dictionary}
        locale={locale}
        sidebar={sidebar || 'no'}
        position={'actorPage'}
        contentSettings={initialSettings?.contentSettings}
      />
    </div>
  );
};

export default ActorPage;

export const generateMetadata = actorMetaGenerator;
