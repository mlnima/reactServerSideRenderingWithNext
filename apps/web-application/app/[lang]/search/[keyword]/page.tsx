import {i18n} from "../../../../i18n-config";
import {getDictionary} from "../../../../get-dictionary";
import {fetchSearch, fetchSettings, fetchWidgets} from "fetch-requests";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import PostPage from "@components/PostsPage/PostsPage";
import ActorsPageContentRenderer from "@components/metas/ActorsPageContentRenderer";
import React from "react";
import {Meta} from "typescript-types/dist/src/Meta";
import CategoriesPageContentRenderer from "@components/metas/CategoriesPageContentRenderer";
import TagsPageContentRenderer from "@components/metas/TagsPageContentRenderer";
import {capitalizeFirstLetters} from "custom-util";
import './page.styles.scss'

interface IProps {
    params: {
        lang: string,
        keyword: string
    },
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}

const searchPage = async ({params, searchParams}: IProps) => {
    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);

    const settingsData = await fetchSettings({requireSettings: ['searchPageSettings']});
    const sidebar = settingsData?.settings?.searchPageSettings?.sidebar;
    const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']})
    const numberOfCardsPerPage = initialSettingsData?.settings?.initialSettings?.postCardsSettings?.numberOfCardsPerPage;

    const widgetsData = await fetchWidgets(
        [
            'searchPageTop',
            'searchPageLeftSidebar',
            'searchPageBottom',
            'searchPageRightSidebar'
        ],
        params?.lang
    );

    const currentPageQuery = searchParams?.page;
    const currentPage = (currentPageQuery && typeof currentPageQuery === 'string') ?
        parseInt(currentPageQuery, 10) : 1

    const queryObject = {
        sort: searchParams?.sort,
        lang: params?.lang,
        keyword: params?.keyword,
        page: currentPage,
        size: numberOfCardsPerPage,
        // searchType: searchParams?.searchType
    }

    const searchData = await fetchSearch({queryObject});


    const groupingMetas = searchData.metas.reduce((acc: { [key: string]: Meta[] }, meta: Meta) => {

        acc[meta?.type] = [...acc?.[meta?.type] || [], meta]

        return acc
    }, {actors: [], categories: [], tags: []})


    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
            <main id={'primary'} className={'main searchPage'}>
                <div className={'searchPageTitle'}>
                    {!!queryObject.keyword && <h1>{capitalizeFirstLetters(decodeURIComponent(queryObject.keyword))}</h1> }
                </div>

                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['searchPageTop']}
                                 position={'searchPageTop'}/>
                {groupingMetas.actors?.length > 0 &&
                    <>
                        <h2>{dictionary['Actors'] || 'Actors'}</h2>
                        <ActorsPageContentRenderer renderPagination={false}
                                                   totalCount={numberOfCardsPerPage}
                                                   currentPage={currentPage}
                                                   locale={locale}
                                                   numberOfCardsPerPage={numberOfCardsPerPage}
                                                   metas={groupingMetas.actors}/>
                    </>
                }
                <PostPage renderPagination={searchData?.totalCount > numberOfCardsPerPage}
                          posts={searchData?.posts}
                          locale={locale}
                          totalCount={searchData?.totalCount}
                          currentPage={currentPage}
                          numberOfCardsPerPage={numberOfCardsPerPage}/>



                {groupingMetas.categories?.length > 0 &&
                    <>
                        <h2>{dictionary['Categories'] || 'Categories'}</h2>
                        <CategoriesPageContentRenderer renderPagination={false}
                                                       locale={locale}
                                                       totalCount={numberOfCardsPerPage}
                                                       currentPage={currentPage}
                                                       numberOfCardsPerPage={numberOfCardsPerPage}
                                                       metas={groupingMetas.categories}/>
                    </>
                }
                {groupingMetas.tags.length > 0 &&
                    <>
                        <h2>{dictionary['Tags'] || 'Tags'}</h2>
                        <TagsPageContentRenderer locale={locale} metas={groupingMetas?.tags}/>
                    </>
                }
                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['actorPageBottom']}
                                 position={'searchPageBottom'}/>
            </main>
            <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['searchPageLeftSidebar']}
                                       rightSideWidgets={widgetsData.widgets?.['searchPageRightSidebar']}
                                       dictionary={dictionary}
                                       locale={locale}
                                       sidebar={sidebar || 'no'}
                                       position={'searchPage'}/>
        </div>
    )
}

export default searchPage;