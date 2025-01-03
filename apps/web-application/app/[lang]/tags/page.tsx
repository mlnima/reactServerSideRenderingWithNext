import React from 'react';
import { getDictionary } from '../../../get-dictionary';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import SidebarWidgetAreaRenderer from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import tagsMetaGenerator from './components/tagsMetaGenerator/tagsMetaGenerator';
import TagsPageContentRenderer from '@components/metas/TagsPageContentRenderer';
import {IPageProps} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";
import {getMetas} from "@lib/database/operations/metas";
import {getWidgets} from "@lib/database/operations/widgets";
import {getSettings} from "@lib/database/operations/settings";

const TagsPage = async (props: IPageProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;

    const locale = localDetector(params.lang);
    const dictionary = await getDictionary(locale);

    const { tagsPageSettings } = await getSettings(['tagsPageSettings']);
    const sidebar = tagsPageSettings?.sidebar;



    const widgets = await getWidgets(
        [
            'tagsPageTop',
            'tagsPageLeftSidebar',
            'tagsPageBottom',
            'tagsPageRightSidebar',
        ],
        locale
    );



    const { metas } = await getMetas({
        locale,
        startWith: Array.isArray(searchParams?.startWith)
            ? searchParams?.startWith[0]
            : searchParams?.startWith,
        metaType: 'tags',
        page: 1,
        count : 1000
    });

    console.log('\x1b[33m%s\x1b[0m','metas => ',metas );
    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
            <main id={'primary'} className={'main tagsPage'}>
                <WidgetsRenderer
                    dictionary={dictionary}
                    locale={locale}
                    widgets={widgets?.['tagsPageTop']}
                    position={'tagsPageTop'}
                />

                <TagsPageContentRenderer
                    locale={locale}
                    metas={metas || []}
                    startWith={searchParams?.startWith as string}
                />

                <WidgetsRenderer
                    dictionary={dictionary}
                    locale={locale}
                    widgets={widgets?.['tagsPageBottom']}
                    position={'tagsPageBottom'}
                />
            </main>

            <SidebarWidgetAreaRenderer
                leftSideWidgets={widgets?.['tagsPageLeftSidebar']}
                rightSideWidgets={widgets?.['tagsPageRightSidebar']}
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

