import React from "react";
import {fetchSettings, fetchTags, fetchWidgets} from "fetch-requests";
import {i18n} from "../../../i18n-config";
import {getDictionary} from "../../../get-dictionary";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import tagsMetaGenerator from "./components/tagsMetaGenerator/tagsMetaGenerator";
import TagsPageContentRenderer from "@components/metas/TagsPageContentRenderer";

interface IProps {
    params: {
        lang: string
    },
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}

const TagsPage = async ({params, searchParams}: IProps) => {
    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({requireSettings: ['tagsPageSettings']});
    const sidebar = settingsData?.settings?.tagsPageSettings?.sidebar;

    const widgetsData = await fetchWidgets(
        [
            'tagsPageTop',
            'tagsPageLeftSidebar',
            'tagsPageBottom',
            'tagsPageRightSidebar'
        ],
        params?.lang
    );

    const metasData = await fetchTags({
        queryObject: {
            metaType: 'tags',
            lang: params?.lang,
            startWith: searchParams?.startWith || undefined,
        }
    });

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

            <main id={'primary'} className={'main tagsPage'}>
                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['tagsPageTop']}
                                 position={'tagsPageTop'}/>

                <TagsPageContentRenderer locale={locale} metas={metasData?.metas}/>

                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['tagsPageBottom']}
                                 position={'tagsPageBottom'}/>
            </main>

            <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['tagsPageLeftSidebar']}
                                       rightSideWidgets={widgetsData.widgets?.['tagsPageRightSidebar']}
                                       dictionary={dictionary}
                                       locale={locale}
                                       sidebar={sidebar || 'no'}
                                       position={'postPage'}/>

        </div>
    );
};

export default TagsPage;

export const generateMetadata = tagsMetaGenerator;
export const dynamic = 'force-dynamic';