import React from "react";
import {getDictionary} from "../../../get-dictionary";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import actorsMetaGenerator from "./components/actorsMetaGenerator/actorsMetaGenerator";
import ActorsPageContentRenderer from "@components/metas/ActorsPageContentRenderer";
import './page.styles.scss';
import {PageParams, PageSearchParams} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";
import getWidgets from '@lib/actions/database/operations/widgets/getWidgets';
import getMetas from "@lib/actions/database/operations/metas/getMetas";
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import Soft404 from '@components/Soft404/Soft404';

interface IProps {
    params: PageParams,
    searchParams?: PageSearchParams,
}

const actorsPage = async (props: IProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;
    const locale = localDetector(params.lang);
    const dictionary = await getDictionary(locale);

    const { actorsPageSettings } = await getSettings(['actorsPageSettings']);
    const sidebar = actorsPageSettings?.sidebar;

    const widgets = await getWidgets(
        [
            'actorsPageTop',
            'actorsPageLeftSidebar',
            'actorsPageBottom',
            'actorsPageRightSidebar'
        ],
        locale
    );

    const currentPageQuery = searchParams?.page;
    const currentPage = (currentPageQuery && typeof currentPageQuery === 'string') ?
        parseInt(currentPageQuery, 10) : 1


    const { success, data }= await getMetas({
        locale,
        startWith: Array.isArray(searchParams?.startWith)
            ? searchParams?.startWith[0]
            : searchParams?.startWith,
        metaType: 'actors',
        page: currentPage,
    });

  if (!success || !data) {
    return <Soft404 dictionary={dictionary} />;
  }

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

            <main id={'primary'} className={'main actorsPage'}>
                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgets?.['actorsPageTop']}
                                 position={'actorsPageTop'}/>

                <ActorsPageContentRenderer renderPagination
                                           totalCount={data?.totalCount || 0}
                                           currentPage={currentPage}
                                           locale={locale}
                                           dictionary={dictionary}
                                           metas={data?.metas || []}/>


                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgets?.['actorsPageBottom']}
                                 position={'actorsPageBottom'}/>
            </main>
            <SidebarWidgetAreaRenderer leftSideWidgets={widgets?.['actorsPageLeftSidebar']}
                                       rightSideWidgets={widgets?.['actorsPageRightSidebar']}
                                       dictionary={dictionary}
                                       locale={locale}
                                       sidebar={sidebar || 'no'}
                                       position={'postPage'}/>
        </div>
    );
};

export default actorsPage;

export const generateMetadata = actorsMetaGenerator;
