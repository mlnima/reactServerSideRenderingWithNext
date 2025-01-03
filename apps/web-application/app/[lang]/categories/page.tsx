import React from 'react';
import { getDictionary } from '../../../get-dictionary';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import SidebarWidgetAreaRenderer from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import CategoriesPageContentRenderer from '@components/metas/CategoriesPageContentRenderer';
import categoriesMetaGenerator from './components/categoriesMetaGenerator/categoriesMetaGenerator';
import { PageParams, PageSearchParams } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import { getMetas } from '@lib/database/operations/metas';
import { getWidgets } from '@lib/database/operations/widgets';
import {getSettings} from "@lib/database/operations/settings";

interface IProps {
  params: PageParams;
  searchParams?: PageSearchParams;
}

const CategoriesPage = async (props: IProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);
  const { categoriesPageSettings } = await getSettings(['categoriesPageSettings']);
  const sidebar = categoriesPageSettings?.sidebar;

  const widgets = await getWidgets(
    [
      'categoriesPageTop',
      'categoriesPageLeftSidebar',
      'categoriesPageBottom',
      'categoriesPageRightSidebar',
    ],
    locale
  );

  const currentPageQuery = searchParams?.page;
  const currentPage =
    currentPageQuery && typeof currentPageQuery === 'string'
      ? parseInt(currentPageQuery, 10)
      : 1;

  const { metas, totalCount } = await getMetas({
    locale,
    startWith: Array.isArray(searchParams?.startWith)
      ? searchParams?.startWith[0]
      : searchParams?.startWith,
    metaType: 'categories',
    page: currentPage,
  });

  return (
    <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
      <main id={'primary'} className={'main categoriesPage'}>
        <WidgetsRenderer
          dictionary={dictionary}
          locale={locale}
          widgets={widgets?.['categoriesPageTop']}
          position={'categoriesPageTop'}
        />

        <CategoriesPageContentRenderer
          renderPagination
          locale={locale}
          dictionary={dictionary}
          totalCount={totalCount || 0}
          currentPage={currentPage}
          metas={metas || []}
        />

        <WidgetsRenderer
          dictionary={dictionary}
          locale={locale}
          widgets={widgets?.['categoriesPageBottom']}
          position={'categoriesPageBottom'}
        />
      </main>

      <SidebarWidgetAreaRenderer
        leftSideWidgets={widgets?.['categoriesPageLeftSidebar']}
        rightSideWidgets={widgets?.['categoriesPageRightSidebar']}
        dictionary={dictionary}
        locale={locale}
        sidebar={sidebar || 'no'}
        position={'postPage'}
      />
    </div>
  );
};

export default CategoriesPage;

export const generateMetadata = categoriesMetaGenerator;
