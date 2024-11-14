
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
import Soft404 from "@components/Soft404/Soft404";
import {mongoIdValidatorByRegex} from "@repo/shared-util";
import {PageParams, PageSearchParams} from "@repo/typescript-types";

interface IProps {
    params: PageParams,
    searchParams?: PageSearchParams,
}

const ActorPage = async (props: IProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;

    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);

    if (!mongoIdValidatorByRegex(params?.actorId)) {
        return <Soft404 dictionary={dictionary} />;
    }

    const settingsData = await fetchSettings({requireSettings: ['actorPageSettings']});
    const sidebar = settingsData?.settings?.actorPageSettings?.sidebar;

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
            size: searchParams?.size
        },
        locale
    });

    if (!!params?.actorId && !postsData?.meta){
        return <Soft404 dictionary={dictionary}/>
    }

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
            <main id={'primary'} className={'main actorPage'}>
                <MetaAdminQuickAccessBar metaId={params?.actorId} />
                <ActorBio actorData={postsData?.meta} />
                <WidgetsRenderer
                    dictionary={dictionary}
                    locale={locale}
                    widgets={widgetsData.widgets?.['actorPageTop']}
                    position={'actorPageTop'}
                />
                <PostPage
                    renderPagination
                    posts={postsData?.posts}
                    dictionary={dictionary}
                    locale={locale}
                    totalCount={postsData?.totalCount}
                    currentPage={currentPage}
                />
                <WidgetsRenderer
                    dictionary={dictionary}
                    locale={locale}
                    widgets={widgetsData.widgets?.['actorPageBottom']}
                    position={'actorPageBottom'}
                />
            </main>

            <SidebarWidgetAreaRenderer
                leftSideWidgets={widgetsData.widgets?.['actorPageLeftSidebar']}
                rightSideWidgets={widgetsData.widgets?.['actorPageRightSidebar']}
                dictionary={dictionary}
                locale={locale}
                sidebar={sidebar || 'no'}
                position={'actorPage'}
            />
        </div>
    );
}

export default ActorPage;

export const generateMetadata = actorMetaGenerator;
export const dynamic = 'force-dynamic';