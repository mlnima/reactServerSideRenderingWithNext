import { getDictionary } from '../../../../get-dictionary';
import SidebarWidgetAreaRenderer from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import PostPage from '@components/PostsPage/PostsPage';
import ActorsPageContentRenderer from '@components/metas/ActorsPageContentRenderer';
import React from 'react';
import { IPageProps, IMeta, IPost, IInitialSettings, IPageSettings } from '@repo/typescript-types';
import CategoriesPageContentRenderer from '@components/metas/CategoriesPageContentRenderer';
import TagsPageContentRenderer from '@components/metas/TagsPageContentRenderer';
import { capitalizeFirstLetters } from '@repo/utils/dist/src';
import './page.scss';
import searchMetaGenerator from './components/searchMetaGenerator';
import localDetector from '@lib/localDetector';
import getWidgets from '@lib/actions/database/widgets/getWidgets';
import getSearch from '@lib/actions/database/search/getSearch';
import getSettings from '@lib/actions/database/settings/getSettings';
import Soft404 from '@components/Soft404/Soft404';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';

const searchPage = async (props: IPageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);

  const { initialSettings } = unwrapResponse(
    (await getSettings(['initialSettings'])) as unknown as ServerActionResponse<{
      initialSettings: IInitialSettings | undefined;
    }>,
  );

  const { searchPageSettings } = unwrapResponse(
    (await getSettings(['searchPageSettings'])) as unknown as ServerActionResponse<{
      searchPageSettings: IPageSettings | undefined;
    }>,
  );

  const sidebar = searchPageSettings?.sidebar;
  const contentPerPage = initialSettings?.contentSettings?.contentPerPage || 20;

  const widgets = await getWidgets(['searchPageTop', 'searchPageLeftSidebar', 'searchPageBottom', 'searchPageRightSidebar'], locale);

  const currentPageQuery = searchParams?.page;
  const currentPage = currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1;

  const queryObject = {
    sort: searchParams?.sort,
    locale,
    keyword: params?.keyword,
    page: currentPage,
    // searchType: searchParams?.searchType
  };

  const { success, data, message } = (await getSearch({
    keyword: params.keyword,
    page: currentPage,
    locale,
  })) as ServerActionResponse<{
    posts: IPost[];
    totalCount: number;
    actors: IMeta[];
    categories: IMeta[];
    tags: IMeta[];
  }>;

  if (!success || !data) {
    return <Soft404 dictionary={dictionary} message={message} />;
  }

  const { posts, totalCount, actors, categories, tags } = data;

  return (
    <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
      <main id={'primary'} className={'main searchPage'}>
        {!!queryObject.keyword && (
          <div className={'searchPageTitle'}>
            <span>{`${dictionary['Search Result For'] || 'Search Result For'}: `}</span>
            <h1>{capitalizeFirstLetters(decodeURIComponent(queryObject.keyword))}</h1>
          </div>
        )}
        <WidgetsRenderer dictionary={dictionary} locale={locale} widgets={widgets?.['searchPageTop']} position={'searchPageTop'} />
        {actors?.length > 0 && currentPage === 1 && (
          <div className={'metaSection'}>
            <div className={'metaSectionHeader'}>
              <h2 className={'searchSectionTitle'}>{dictionary['Actors'] || 'Actors'}:</h2>
            </div>

            <div className={'metaSectionCardsWrapper'}>
              <ActorsPageContentRenderer
                renderPagination={false}
                totalCount={contentPerPage}
                currentPage={currentPage}
                dictionary={dictionary}
                locale={locale}
                metas={actors}
              />
            </div>
          </div>
        )}
        <PostPage
          renderPagination={totalCount > contentPerPage}
          posts={posts}
          locale={locale}
          dictionary={dictionary}
          totalCount={totalCount}
          currentPage={currentPage}
        />

        {categories?.length > 0 && currentPage === 1 && (
          <div className={'metaSection'}>
            <div className={'metaSectionHeader'}>
              <h2 className={'searchSectionTitle'}>{dictionary['Categories'] || 'Categories'}:</h2>
            </div>

            <div className={'metaSectionCardsWrapper'}>
              <CategoriesPageContentRenderer
                renderPagination={false}
                locale={locale}
                totalCount={contentPerPage}
                currentPage={currentPage}
                dictionary={dictionary}
                metas={categories}
              />
            </div>
          </div>
        )}
        {tags.length > 0 && currentPage === 1 && (
          <div className={'metaSection'}>
            <div className={'metaSectionHeader'}>
              <h2 className={'searchSectionTitle'}>{dictionary['Tags'] || 'Tags'}:</h2>
            </div>

            <div className={'metaSectionCardsWrapper'}>
              <TagsPageContentRenderer locale={locale} metas={tags} />
            </div>
          </div>
        )}
        <WidgetsRenderer dictionary={dictionary} locale={locale} widgets={widgets?.['actorPageBottom']} position={'searchPageBottom'} />
      </main>
      <SidebarWidgetAreaRenderer
        leftSideWidgets={widgets?.['searchPageLeftSidebar']}
        rightSideWidgets={widgets?.['searchPageRightSidebar']}
        dictionary={dictionary}
        locale={locale}
        sidebar={sidebar || 'no'}
        position={'searchPage'}
      />
    </div>
  );
};

export const generateMetadata = searchMetaGenerator;
export default searchPage;
