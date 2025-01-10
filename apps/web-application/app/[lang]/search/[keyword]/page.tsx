import { getDictionary } from '../../../../get-dictionary';
import SidebarWidgetAreaRenderer from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import PostPage from '@components/PostsPage/PostsPage';
import ActorsPageContentRenderer from '@components/metas/ActorsPageContentRenderer';
import React from 'react';
import { IPageProps, Meta } from '@repo/typescript-types';
import CategoriesPageContentRenderer from '@components/metas/CategoriesPageContentRenderer';
import TagsPageContentRenderer from '@components/metas/TagsPageContentRenderer';
import { capitalizeFirstLetters } from '@repo/shared-util';
import './page.scss';
import searchMetaGenerator from './components/searchMetaGenerator';
import localDetector from '@lib/localDetector';
import { getWidgets } from '@lib/database/operations/widgets';
import { getSearch } from '@lib/database/operations/posts';
import {getSettings} from "@lib/database/operations/settings";

const searchPage = async (props: IPageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);

  const { searchPageSettings,initialSettings } = await getSettings( ['searchPageSettings','initialSettings']);

  const sidebar = searchPageSettings?.sidebar;
  const contentPerPage = initialSettings?.contentSettings?.contentPerPage || 20;

  const widgets = await getWidgets(
    [
      'searchPageTop',
      'searchPageLeftSidebar',
      'searchPageBottom',
      'searchPageRightSidebar',
    ],
    locale
  );

  const currentPageQuery = searchParams?.page;
  const currentPage =
    currentPageQuery && typeof currentPageQuery === 'string'
      ? parseInt(currentPageQuery, 10)
      : 1;

  // const queryObject = {
  //     sort: searchParams?.sort,
  //     lang: locale,
  //     keyword: params?.keyword,
  //     page: currentPage,
  //     // searchType: searchParams?.searchType
  // };

  //const searchData = await fetchSearch({ queryObject, locale });

  const queryObject = {
    sort: searchParams?.sort,
    locale,
    keyword: params?.keyword,
    page: currentPage,
    // searchType: searchParams?.searchType
  };

  const { posts, totalCount, actors, categories, tags } =
    await getSearch({
      keyword: params.keyword,
      page: currentPage,
      locale,
    });

  // const groupingMetas = (metas || []).reduce(
  //   (acc: { [key: string]: Meta[] }, meta: Meta) => {
  //     acc[meta?.type] = [...(acc?.[meta?.type] || []), meta];
  //
  //     return acc;
  //   },
  //   { actors: [], categories: [], tags: [] }
  // );

  return (
    <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
      <main id={'primary'} className={'main searchPage'}>
        {!!queryObject.keyword && (
          <div className={'searchPageTitle'}>
            <span>{`${dictionary['Search Result For'] || 'Search Result For'}: `}</span>
            <h1>
              {capitalizeFirstLetters(decodeURIComponent(queryObject.keyword))}
            </h1>
          </div>
        )}
        <WidgetsRenderer
          dictionary={dictionary}
          locale={locale}
          widgets={widgets?.['searchPageTop']}
          position={'searchPageTop'}
        />
        {actors?.length > 0 && currentPage === 1 && (
          <div className={'metaSection'}>
            <div className={'metaSectionHeader'}>
              <h2 className={'searchSectionTitle'}>
                {dictionary['Actors'] || 'Actors'}:
              </h2>
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
              <h2 className={'searchSectionTitle'}>
                {dictionary['Categories'] || 'Categories'}:
              </h2>
            </div>

            <div className={'metaSectionCardsWrapper'}>
              <CategoriesPageContentRenderer
                renderPagination={false}
                locale={locale}
                totalCount={contentPerPage}
                currentPage={currentPage}
                dictionary={dictionary}
                // contentPerPage={contentPerPage}
                metas={categories}
              />
            </div>
          </div>
        )}
        {tags.length > 0 && currentPage === 1 && (
          <div className={'metaSection'}>
            <div className={'metaSectionHeader'}>
              <h2 className={'searchSectionTitle'}>
                {dictionary['Tags'] || 'Tags'}:
              </h2>
            </div>

            <div className={'metaSectionCardsWrapper'}>
              <TagsPageContentRenderer locale={locale} metas={tags} />
            </div>
          </div>
        )}
        <WidgetsRenderer
          dictionary={dictionary}
          locale={locale}
          widgets={widgets?.['actorPageBottom']}
          position={'searchPageBottom'}
        />
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
