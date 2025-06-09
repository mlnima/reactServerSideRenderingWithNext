import React from 'react';
import { getDictionary } from '../../../get-dictionary';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import SidebarWidgetAreaRenderer from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import CategoriesPageContentRenderer from '@components/metas/CategoriesPageContentRenderer';
import categoriesMetaGenerator from './components/categoriesMetaGenerator/categoriesMetaGenerator';
import { IPageSettings, PageParams, PageSearchParams } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getMetas from "@lib/actions/database/metas/getMetas";
import getWidgets from '@lib/actions/database/widgets/getWidgets';
import getSettings from '@lib/actions/database/settings/getSettings';
import Soft404 from '@components/Soft404/Soft404';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';

interface IProps {
  params: PageParams;
  searchParams?: PageSearchParams;
}

const CategoriesPage = async (props: IProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);

  const { categoriesPageSettings } = unwrapResponse(
    await getSettings(['categoriesPageSettings']) as unknown as ServerActionResponse<{
      categoriesPageSettings: IPageSettings | undefined;
    }>,
  );

  if (!categoriesPageSettings) {
    return <Soft404 dictionary={dictionary} />;
  }

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
  if (!categoriesPageSettings) {
    return <Soft404 dictionary={dictionary} />;
  }

  const currentPageQuery = searchParams?.page;
  const currentPage =
    currentPageQuery && typeof currentPageQuery === 'string'
      ? parseInt(currentPageQuery, 10)
      : 1;

  const { success, data } = await getMetas({
    locale,
    startWith: Array.isArray(searchParams?.startWith)
      ? searchParams?.startWith[0]
      : searchParams?.startWith,
    metaType: 'categories',
    page: currentPage,
  });

  if (!success || !data) {
    return <Soft404 dictionary={dictionary} />;
  }

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
          totalCount={data?.totalCount || 0}
          currentPage={currentPage}
          metas={data?.metas || []}
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
