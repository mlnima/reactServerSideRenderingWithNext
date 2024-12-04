import React from 'react';
import { fetchTags } from '@lib/fetch-requests/fetchPosts';
import { fetchSettings } from '@lib/fetch-requests/fetchSettings';
import { fetchWidgets } from '@lib/fetch-requests/fetchWidgets';
import { getDictionary } from '../../../get-dictionary';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import SidebarWidgetAreaRenderer from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import tagsMetaGenerator from './components/tagsMetaGenerator/tagsMetaGenerator';
import TagsPageContentRenderer from '@components/metas/TagsPageContentRenderer';
import {IPageProps} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";

const TagsPage = async (props: IPageProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;

    const locale = localDetector(params.lang);
    const dictionary = await getDictionary(locale);
    const settingsData = await fetchSettings({
        requireSettings: ['tagsPageSettings'],
    });
    const sidebar = settingsData?.settings?.tagsPageSettings?.sidebar;

    const widgetsData = await fetchWidgets({
        widgets: [
            'tagsPageTop',
            'tagsPageLeftSidebar',
            'tagsPageBottom',
            'tagsPageRightSidebar',
        ],
        locale,
    });

    const metasData = await fetchTags({
        queryObject: {
            metaType: 'tags',
            lang: locale,
            startWith: searchParams?.startWith || undefined,
        },
        locale,
    });

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
            <main id={'primary'} className={'main tagsPage'}>
                <WidgetsRenderer
                    dictionary={dictionary}
                    locale={locale}
                    widgets={widgetsData.widgets?.['tagsPageTop']}
                    position={'tagsPageTop'}
                />

                <TagsPageContentRenderer
                    locale={locale}
                    metas={metasData?.metas}
                    startWith={searchParams?.startWith as string}
                />

                <WidgetsRenderer
                    dictionary={dictionary}
                    locale={locale}
                    widgets={widgetsData.widgets?.['tagsPageBottom']}
                    position={'tagsPageBottom'}
                />
            </main>

            <SidebarWidgetAreaRenderer
                leftSideWidgets={widgetsData.widgets?.['tagsPageLeftSidebar']}
                rightSideWidgets={widgetsData.widgets?.['tagsPageRightSidebar']}
                dictionary={dictionary}
                locale={locale}
                sidebar={sidebar || 'no'}
                position={'postPage'}
            />
        </div>
    );
};

export default TagsPage;

export const generateMetadata = tagsMetaGenerator;
export const dynamic = 'force-dynamic';
