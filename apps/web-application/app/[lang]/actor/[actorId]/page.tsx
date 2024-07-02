
import {fetchPosts} from "@lib/fetch-requests/fetchPosts";
import {fetchSettings} from "@lib/fetch-requests/fetchSettings";
import {fetchWidgets} from "@lib/fetch-requests/fetchWidgets";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import {i18n} from "@i18nConfig";
import {getDictionary} from "../../../../get-dictionary";
import WidgetsRenderer from "@components/widgets/widgetRenderer/WidgetsRenderer";
import PostPage from "@components/PostsPage/PostsPage";
import actorMetaGenerator from "./components/actorMetaGenerator/actorMetaGenerator";
import MetaAdminQuickAccessBar from "@components/metas/MetaAdminQuickAccessBar";
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



const ActorPage = async ({params, searchParams}: IProps) => {

    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);

    const settingsData = await fetchSettings({requireSettings: ['actorPageSettings']});
    const sidebar = settingsData?.settings?.actorPageSettings?.sidebar;

    const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']})
    const numberOfCardsPerPage = initialSettingsData?.settings?.initialSettings?.layoutSettings?.numberOfCardsPerPage;

    const widgetsData = await fetchWidgets({
        widgets: [
            'actorPageTop',
            'actorPageLeftSidebar',
            'actorPageBottom',
            'actorPageRightSidebar'
        ],
        locale
    });

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
        },
        locale
    });

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

            <main id={'primary'} className={'main actorPage'}>
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

export const generateMetadata = actorMetaGenerator;
export const dynamic = 'force-dynamic';