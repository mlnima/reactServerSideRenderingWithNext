import React from "react";
import {fetchMetas} from "@lib/fetch-requests/fetchPosts";
import {fetchSettings} from "@lib/fetch-requests/fetchSettings";
import {fetchWidgets} from "@lib/fetch-requests/fetchWidgets";
import {getDictionary} from "../../../get-dictionary";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import CategoriesPageContentRenderer from "@components/metas/CategoriesPageContentRenderer";
import categoriesMetaGenerator from "./components/categoriesMetaGenerator/categoriesMetaGenerator";
import {PageParams, PageSearchParams} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";

interface IProps {
    params: PageParams,
    searchParams?: PageSearchParams,
}

const CategoriesPage = async (props: IProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;
    const locale = localDetector(params.lang);
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({requireSettings: ['categoriesPageSettings']});
    const sidebar = settingsData?.settings?.categoriesPageSettings?.sidebar;

    const widgetsData = await fetchWidgets({
        widgets: [
            'categoriesPageTop',
            'categoriesPageLeftSidebar',
            'categoriesPageBottom',
            'categoriesPageRightSidebar'
        ],
        locale
    });

    const currentPageQuery = searchParams?.page;
    const currentPage = (currentPageQuery && typeof currentPageQuery === 'string') ?
        parseInt(currentPageQuery, 10) : 1

    const metasData = await fetchMetas({
        queryObject: {
            metaType: 'categories',
            sort: searchParams?.sort || undefined,
            page: currentPage,
            size: searchParams?.size  ,
            startWith: searchParams?.startWith || undefined
        },
        locale
    });

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

            <main id={'primary'} className={'main categoriesPage'}>
                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['categoriesPageTop']}
                                 position={'categoriesPageTop'}/>

                <CategoriesPageContentRenderer renderPagination
                                               locale={locale}
                                               dictionary={dictionary}
                                               totalCount={metasData?.totalCount}
                                               currentPage={currentPage}
                                               metas={metasData?.metas}/>

                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['categoriesPageBottom']}
                                 position={'categoriesPageBottom'}/>
            </main>

            <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['categoriesPageLeftSidebar']}
                                       rightSideWidgets={widgetsData.widgets?.['categoriesPageRightSidebar']}
                                       dictionary={dictionary}
                                       locale={locale}
                                       sidebar={sidebar || 'no'}
                                       position={'postPage'}/>

        </div>
    );
};

export default CategoriesPage;

export const generateMetadata = categoriesMetaGenerator;
export const dynamic = 'force-dynamic';