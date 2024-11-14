import { i18n } from '../../../../i18n-config';
import { getDictionary } from '../../../../get-dictionary';
import { fetchSearch } from '@lib/fetch-requests/fetchPosts';
import { fetchSettings } from '@lib/fetch-requests/fetchSettings';
import { fetchWidgets } from '@lib/fetch-requests/fetchWidgets';
import SidebarWidgetAreaRenderer from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import PostPage from '@components/PostsPage/PostsPage';
import ActorsPageContentRenderer from '@components/metas/ActorsPageContentRenderer';
import React from 'react';
import {IPageProps, Meta} from "@repo/typescript-types";
import CategoriesPageContentRenderer from '@components/metas/CategoriesPageContentRenderer';
import TagsPageContentRenderer from '@components/metas/TagsPageContentRenderer';
import { capitalizeFirstLetters } from '@repo/shared-util';
import './page.scss';
import searchMetaGenerator from './components/searchMetaGenerator';

const searchPage = async (props: IPageProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;

    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);

    const settingsData = await fetchSettings({ requireSettings: ['searchPageSettings'] });
    const sidebar = settingsData?.settings?.searchPageSettings?.sidebar;
    const initialSettingsData = await fetchSettings({ requireSettings: ['initialSettings'] });
    const contentPerPage = initialSettingsData?.settings?.initialSettings?.contentSettings?.contentPerPage;

    const widgetsData = await fetchWidgets({
        widgets: ['searchPageTop', 'searchPageLeftSidebar', 'searchPageBottom', 'searchPageRightSidebar'],
        locale,
    });

    const currentPageQuery = searchParams?.page;
    const currentPage = currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1;

    const queryObject = {
        sort: searchParams?.sort,
        lang: params?.lang,
        keyword: params?.keyword,
        page: currentPage,
        // searchType: searchParams?.searchType
    };

    const searchData = await fetchSearch({ queryObject, locale });

    const groupingMetas = (searchData?.metas || []).reduce(
        (acc: { [key: string]: Meta[] }, meta: Meta) => {
            acc[meta?.type] = [...(acc?.[meta?.type] || []), meta];

            return acc;
        },
        { actors: [], categories: [], tags: [] },
    );

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
            <main id={'primary'} className={'main searchPage'}>
                {!!queryObject.keyword && (
                    <div className={'searchPageTitle'}>
                        <span>{`${dictionary['Search Result For'] || 'Search Result For'}: `}</span>
                        <h1>{capitalizeFirstLetters(decodeURIComponent(queryObject.keyword))}</h1>
                    </div>
                )}
                <WidgetsRenderer
                    dictionary={dictionary}
                    locale={locale}
                    widgets={widgetsData.widgets?.['searchPageTop']}
                    position={'searchPageTop'}
                />
                {groupingMetas.actors?.length > 0 && currentPage === 1 && (
                    <div className={'metaSection'}>
                        <div className={'metaSectionHeader'}>
                            <h2 className={'searchSectionTitle'}>{dictionary['Actors'] || 'Actors'}:</h2>
                        </div>

                        <div className={'metaSectionCardsWrapper'}>
                            <ActorsPageContentRenderer
                                renderPagination={false}
                                totalCount={contentPerPage}
                                currentPage={currentPage}
                                dictionary={dictionary}
                                locale={locale}
                                metas={groupingMetas.actors}
                            />
                        </div>
                    </div>
                )}
                <PostPage
                    renderPagination={searchData?.totalCount > contentPerPage}
                    posts={searchData?.posts}
                    locale={locale}
                    dictionary={dictionary}
                    totalCount={searchData?.totalCount}
                    currentPage={currentPage}
                />

                {groupingMetas.categories?.length > 0 && currentPage === 1 && (
                    <div className={'metaSection'}>
                        <div className={'metaSectionHeader'}>
                            <h2 className={'searchSectionTitle'}>{dictionary['Categories'] || 'Categories'}:</h2>
                        </div>

                        <div className={'metaSectionCardsWrapper'}>
                            <CategoriesPageContentRenderer
                                renderPagination={false}
                                locale={locale}
                                totalCount={contentPerPage}
                                currentPage={currentPage}
                                dictionary={dictionary}
                                contentPerPage={contentPerPage}
                                metas={groupingMetas.categories}
                            />
                        </div>
                    </div>
                )}
                {groupingMetas.tags.length > 0 && currentPage === 1 && (
                    <div className={'metaSection'}>
                        <div className={'metaSectionHeader'}>
                            <h2 className={'searchSectionTitle'}>{dictionary['Tags'] || 'Tags'}:</h2>
                        </div>

                        <div className={'metaSectionCardsWrapper'}>
                            <TagsPageContentRenderer locale={locale} metas={groupingMetas?.tags} />
                        </div>
                    </div>
                )}
                <WidgetsRenderer
                    dictionary={dictionary}
                    locale={locale}
                    widgets={widgetsData.widgets?.['actorPageBottom']}
                    position={'searchPageBottom'}
                />
            </main>
            <SidebarWidgetAreaRenderer
                leftSideWidgets={widgetsData.widgets?.['searchPageLeftSidebar']}
                rightSideWidgets={widgetsData.widgets?.['searchPageRightSidebar']}
                dictionary={dictionary}
                locale={locale}
                sidebar={sidebar || 'no'}
                position={'searchPage'}
            />
        </div>
    );
};

export const generateMetadata = searchMetaGenerator;
export default searchPage;
