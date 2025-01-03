import {fetchPosts} from "@lib/fetch-requests/fetchPosts";
import {fetchSettings} from "@lib/fetch-requests/fetchSettings";
import {fetchWidgets} from "@lib/fetch-requests/fetchWidgets";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import {getDictionary} from "../../../get-dictionary";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import PostPage from "@components/PostsPage/PostsPage";
import PostsPageInfo from "@components/PostsPage/PostsPageInfo/PostsPageInfo";
import postsMetaGenerator from "./components/postsMetaGenerator/postsMetaGenerator";
import {IPageProps} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";


const PostsPage = async (props: IPageProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;

    const locale = localDetector(params.lang);
    const dictionary = await getDictionary(locale);

    const settingsData = await fetchSettings({requireSettings: ['postsPageSettings']});
    const sidebar = settingsData?.settings?.postsPageSettings?.sidebar;

    const widgetsData = await fetchWidgets({
        widgets: [
            'postsPageTop',
            'postsPageLeftSidebar',
            'postsPageBottom',
            'postsPageRightSidebar'
        ],
        locale
    });

    const currentPageQuery = searchParams?.page || '0';
    const currentPage = (currentPageQuery) ?
        parseInt(currentPageQuery as string, 10) : 1


    const postsData = await fetchPosts({
        queryObject: {
            sort: searchParams?.sort,
            lang: locale,
            page: currentPage,
            size: searchParams?.size ,
            postType: searchParams?.postType
        },
        locale
    });

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

            <main id={'primary'} className={'main postsPage'}>

                <PostsPageInfo title={postsData?.meta?.translations?.[locale]?.name ?? postsData?.meta?.name}
                               description={
                                   postsData?.meta?.translations?.[locale]?.description ??
                                   postsData?.meta?.description
                               }/>
                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['postsPageTop']}
                                 position={'postsPageTop'}/>
                <PostPage renderPagination
                          posts={postsData?.posts}
                          locale={locale}
                          dictionary={dictionary}
                          totalCount={postsData?.totalCount}
                          currentPage={currentPage}/>
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
