import {fetchPosts, fetchSettings, fetchWidgets} from "fetch-requests";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import {i18n} from "../../../i18n-config";
import {getDictionary} from "../../../get-dictionary";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import PostPage from "@components/PostsPage/PostsPage";

import PostsPageInfo from "@components/PostsPage/PostsPageInfo/PostsPageInfo";
import postsMetaGenerator from "./components/postsMetaGenerator/postsMetaGenerator";

interface IProps {
    params: {
        lang: string
    },
    searchParams?: {
        [key: string]: string | string[] | undefined
        postType?:string,
        page?: string,
    }
}

const PostsPage = async ({params, searchParams}: IProps) => {

    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);

    const settingsData = await fetchSettings({requireSettings: ['postsPageSettings']});
    const sidebar = settingsData?.settings?.postsPageSettings?.sidebar;

    const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']})
    const numberOfCardsPerPage = initialSettingsData?.settings?.initialSettings?.postCardsSettings?.numberOfCardsPerPage;

    const widgetsData = await fetchWidgets({
        widgets: [
            'postsPageTop',
            'postsPageLeftSidebar',
            'postsPageBottom',
            'postsPageRightSidebar'
        ],
        locale
    });

    const currentPageQuery = searchParams?.page;
    const currentPage = (currentPageQuery) ?
        parseInt(currentPageQuery, 10) : 1

    const postsData = await fetchPosts({
        queryObject: {
            sort: searchParams?.sort,
            lang: params?.lang,
            page: currentPage,
            size: searchParams?.size || numberOfCardsPerPage,
            postType: searchParams?.postType
        },
        locale
    });

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

            <main id={'primary'} className={'main postsPage'}>

                <PostsPageInfo title={postsData?.meta?.translations?.[params?.lang]?.name ?? postsData?.meta?.name}
                               description={
                                   postsData?.meta?.translations?.[params?.lang]?.description ??
                                   postsData?.meta?.description
                               }/>
                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['postsPageTop']}
                                 position={'postsPageTop'}/>
                <PostPage renderPagination
                          posts={postsData?.posts}
                          locale={locale}
                          totalCount={postsData?.totalCount}
                          currentPage={currentPage}
                          numberOfCardsPerPage={numberOfCardsPerPage}/>
                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['postsPageBottom']}
                                 position={'postsPageBottom'}/>
            </main>

            <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['postsPageLeftSidebar']}
                                       rightSideWidgets={widgetsData.widgets?.['postsPageRightSidebar']}
                                       dictionary={dictionary}
                                       locale={locale}
                                       sidebar={sidebar || 'no'}
                                       position={'postPage'}/>
        </div>
    )
}

export default PostsPage;

export const generateMetadata = postsMetaGenerator;
export const dynamic = 'force-dynamic';