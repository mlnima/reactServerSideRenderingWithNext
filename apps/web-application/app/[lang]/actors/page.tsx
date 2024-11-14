import React from "react";
import {fetchMetas} from "@lib/fetch-requests/fetchPosts";
import {fetchSettings} from "@lib/fetch-requests/fetchSettings";
import {fetchWidgets} from "@lib/fetch-requests/fetchWidgets";
import {i18n} from "../../../i18n-config";
import {getDictionary} from "../../../get-dictionary";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import actorsMetaGenerator from "./components/actorsMetaGenerator/actorsMetaGenerator";
import ActorsPageContentRenderer from "@components/metas/ActorsPageContentRenderer";
import './page.styles.scss';
import {PageParams, PageSearchParams} from "@repo/typescript-types";

interface IProps {
    params: PageParams,
    searchParams?: PageSearchParams,
}

const actorsPage = async (props: IProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;
    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({requireSettings: ['actorsPageSettings']});
    const sidebar = settingsData?.settings?.actorsPageSettings?.sidebar;
    const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']})
    const contentPerPage = initialSettingsData?.settings?.initialSettings?.contentSettings?.contentPerPage;

    const widgetsData = await fetchWidgets({
        widgets: [
            'actorsPageTop',
            'actorsPageLeftSidebar',
            'actorsPageBottom',
            'actorsPageRightSidebar'
        ],
        locale
    });

    const currentPageQuery = searchParams?.page;
    const currentPage = (currentPageQuery && typeof currentPageQuery === 'string') ?
        parseInt(currentPageQuery, 10) : 1

    const metasData = await fetchMetas({
        queryObject: {
            metaType: 'actors',
            sort: searchParams?.sort || undefined,
            page: currentPage,
            size: searchParams?.size  ,
            startWith: searchParams?.startWith || undefined
        },
        locale
    });

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

            <main id={'primary'} className={'main actorsPage'}>
                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['actorsPageTop']}
                                 position={'actorsPageTop'}/>

                <ActorsPageContentRenderer renderPagination
                                           totalCount={metasData?.totalCount}
                                           currentPage={currentPage}
                                           locale={locale}
                                           dictionary={dictionary}
                                           metas={metasData?.metas}/>


                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['actorsPageBottom']}
                                 position={'actorsPageBottom'}/>
            </main>
            <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['actorsPageLeftSidebar']}
                                       rightSideWidgets={widgetsData.widgets?.['actorsPageRightSidebar']}
                                       dictionary={dictionary}
                                       locale={locale}
                                       sidebar={sidebar || 'no'}
                                       position={'postPage'}/>
        </div>
    );
};

export default actorsPage;

export const generateMetadata = actorsMetaGenerator;
export const dynamic = 'force-dynamic';