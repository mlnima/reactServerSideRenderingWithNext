import {fetchPosts, fetchSettings, fetchWidgets} from "fetch-requests";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import {i18n} from "../../../../i18n-config";
import {getDictionary} from "../../../../get-dictionary";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import PostPage from "@components/PostsPage/PostsPage";
import categoryMetaGenerator from "./components/categoryMetaGenerator/categoryMetaGenerator";
import MetaAdminQuickAccessBar from "@components/metas/MetaAdminQuickAccessBar";
import PostsPageInfo from "@components/PostsPage/PostsPageInfo/PostsPageInfo";

interface IProps {
    params: {
        lang: string
        categoryId: string,
    },
    searchParams?: {
        [key: string]: string | string[] | undefined
    }
}

const CategoryPage = async ({params, searchParams}: IProps) => {

    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const dictionary = await getDictionary(locale);

    const settingsData = await fetchSettings(['categoryPageSettings']);
    const sidebar = settingsData?.settings?.categoryPageSettings?.sidebar;

    const initialSettingsData = await fetchSettings(['initialSettings'])
    const numberOfCardsPerPage = initialSettingsData?.settings?.initialSettings?.postCardsSettings?.numberOfCardsPerPage;
    const widgetsData = await fetchWidgets(
        [
            'categoryPageTop',
            'categoryPageLeftSidebar',
            'categoryPageBottom',
            'categoryPageRightSidebar'
        ],
        params?.lang
    );

    const currentPageQuery = searchParams?.page;
    const currentPage = (currentPageQuery && typeof currentPageQuery === 'string') ?
        parseInt(currentPageQuery, 10) : 1

    const postsData = await fetchPosts({
        queryObject: {
            sort: searchParams?.sort,
            lang: params?.lang,
            metaId: params?.categoryId,
            page: currentPage,
            size: searchParams?.size || numberOfCardsPerPage
        }
    });

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

            <main id={'primary'} className={'main categoryPage'}>
                <MetaAdminQuickAccessBar metaId={params?.categoryId}/>
                <PostsPageInfo title={postsData?.meta?.translations?.[params?.lang]?.name ?? postsData?.meta?.name}
                               description={
                                   postsData?.meta?.translations?.[params?.lang]?.description ??
                                   postsData?.meta?.description
                               }/>
                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['categoryPageTop']}
                                 position={'categoryPageTop'}/>
                <PostPage renderPagination
                          posts={postsData?.posts}
                          locale={locale}
                          totalCount={postsData?.totalCount}
                          currentPage={currentPage}
                          numberOfCardsPerPage={numberOfCardsPerPage}/>
                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['categoryPageBottom']}
                                 position={'categoryPageBottom'}/>
            </main>

            <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['categoryPageLeftSidebar']}
                                       rightSideWidgets={widgetsData.widgets?.['categoryPageRightSidebar']}
                                       dictionary={dictionary}
                                       locale={locale}
                                       sidebar={sidebar || 'no'}
                                       position={'postPage'}/>
        </div>
    )
}

export default CategoryPage;

export const generateMetadata = categoryMetaGenerator;
export const dynamic = 'force-dynamic';