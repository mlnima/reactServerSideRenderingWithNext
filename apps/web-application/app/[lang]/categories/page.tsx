import React from "react";
import {fetchMetas, fetchSettings, fetchWidgets} from "fetch-requests";
import {i18n} from "@i18nConfig";
import {getDictionary} from "../../../get-dictionary";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import CategoriesPageContentRenderer from "@components/metas/CategoriesPageContentRenderer";
import categoriesMetaGenerator from "./components/categoriesMetaGenerator/categoriesMetaGenerator";

interface IProps {
    params: {
        lang: string
    },
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}

const CategoriesPage = async ({params, searchParams}: IProps) => {
    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({requireSettings: ['categoriesPageSettings']});
    const sidebar = settingsData?.settings?.categoriesPageSettings?.sidebar;
    const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']})
    const numberOfCardsPerPage = initialSettingsData?.settings?.initialSettings?.postCardsSettings?.numberOfCardsPerPage;

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
            size: searchParams?.size || numberOfCardsPerPage,
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
                                               totalCount={metasData?.totalCount}
                                               currentPage={currentPage}
                                               numberOfCardsPerPage={numberOfCardsPerPage}
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