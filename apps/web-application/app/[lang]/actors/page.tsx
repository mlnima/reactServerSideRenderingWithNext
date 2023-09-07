import React from "react";
import {fetchMetas, fetchSettings, fetchWidgets} from "fetch-requests";
import {i18n} from "../../../i18n-config";
import {getDictionary} from "../../../get-dictionary";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import actorsMetaGenerator from "./components/actorsMetaGenerator/actorsMetaGenerator";
import ActorsPageContentRenderer from "@components/metas/ActorsPageContentRenderer";
import './page.styles.scss';

interface IProps {
    params: {
        lang: string
    },
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}

const actorsPage = async ({params, searchParams}: IProps) => {
    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({requireSettings: ['actorsPageSettings']});
    const sidebar = settingsData?.settings?.actorsPageSettings?.sidebar;
    const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']})
    const numberOfCardsPerPage = initialSettingsData?.settings?.initialSettings?.postCardsSettings?.numberOfCardsPerPage;

    const widgetsData = await fetchWidgets(
        [
            'actorsPageTop',
            'actorsPageLeftSidebar',
            'actorsPageBottom',
            'actorsPageRightSidebar'
        ],
        params?.lang
    );

    const currentPageQuery = searchParams?.page;
    const currentPage = (currentPageQuery && typeof currentPageQuery === 'string') ?
        parseInt(currentPageQuery, 10) : 1

    const metasData = await fetchMetas({
        queryObject: {
            metaType: 'actors',
            sort: searchParams?.sort || '',
            lang: params?.lang,
            page: currentPage,
            size: searchParams?.size || numberOfCardsPerPage,
            startWith: searchParams?.startWith || undefined,
        }
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
                                           numberOfCardsPerPage={numberOfCardsPerPage}
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