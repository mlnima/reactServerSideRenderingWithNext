import {fetchPosts, fetchSettings, fetchWidgets} from "fetch-requests";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import {i18n} from "../../../../i18n-config";
import {getDictionary} from "../../../../get-dictionary";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import PostPage from "@components/PostsPage/PostsPage";
import actorMetaGenerator from "./components/actorMetaGenerator/actorMetaGenerator";
import MetaAdminQuickAccessBar from "@components/metas/MetaAdminQuickAccessBar";
import PostsPageInfo from "@components/PostsPage/PostsPageInfo/PostsPageInfo";
import ActorBio from "./components/ActorBio/ActorBio";

interface IProps {
    params: {
        lang: string
        actorId: string,
    },
    searchParams?: {
        [key: string]: string | string[] | undefined
    },
    page: string | string[]
}

export const dynamic = 'force-dynamic';

export const generateMetadata = actorMetaGenerator;

const ActorPage = async ({params, searchParams}: IProps) => {

    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const dictionary = await getDictionary(locale);

    const settingsData = await fetchSettings(['actorPageSettings']);
    const sidebar = settingsData?.settings?.actorPageSettings?.sidebar;

    const initialSettingsData = await fetchSettings(['initialSettings'])
    const numberOfCardsPerPage = initialSettingsData?.settings?.initialSettings?.postCardsSettings?.numberOfCardsPerPage;
    const widgetsData = await fetchWidgets(
        [
            'actorPageTop',
            'actorPageLeftSidebar',
            'actorPageBottom',
            'actorPageRightSidebar'
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
            metaId: params?.actorId,
            page: currentPage,
            size: searchParams?.size || numberOfCardsPerPage
        }
    });

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar inner-content`}>

            <main id={'primary'} className={'main posts-page'}>
                <MetaAdminQuickAccessBar metaId={params?.actorId}/>
                <ActorBio actorData={postsData?.meta}/>
                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['actorPageTop']}
                                 position={'actorPageTop'}/>
                <PostPage renderPagination
                          posts={postsData?.posts}
                          locale={locale}
                          totalCount={postsData?.totalCount}
                          currentPage={currentPage}
                          numberOfCardsPerPage={numberOfCardsPerPage}/>
                <WidgetsRenderer dictionary={dictionary}
                                 locale={locale}
                                 widgets={widgetsData.widgets?.['actorPageBottom']}
                                 position={'actorPageBottom'}/>
            </main>

            <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['actorPageLeftSidebar']}
                                       rightSideWidgets={widgetsData.widgets?.['actorPageRightSidebar']}
                                       dictionary={dictionary}
                                       locale={locale}
                                       sidebar={sidebar || 'no'}
                                       position={'actorPage'}/>
        </div>
    )
}

export default ActorPage;
