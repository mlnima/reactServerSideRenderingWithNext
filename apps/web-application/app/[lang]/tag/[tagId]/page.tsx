import { fetchPosts } from '@lib/fetch-requests/fetchPosts';
import { fetchSettings } from '@lib/fetch-requests/fetchSettings';
import { fetchWidgets } from '@lib/fetch-requests/fetchWidgets';
import SidebarWidgetAreaRenderer from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import { i18n } from '@i18nConfig';
import { getDictionary } from '../../../../get-dictionary';
import WidgetsRenderer from '@components/widgets/widgetRenderer/WidgetsRenderer';
import PostPage from '@components/PostsPage/PostsPage';
import tagMetaGenerator from './components/tagMetaGenerator/tagMetaGenerator';
import MetaAdminQuickAccessBar from '@components/metas/MetaAdminQuickAccessBar';
import PostsPageInfo from '@components/PostsPage/PostsPageInfo/PostsPageInfo';
import Soft404 from '@components/Soft404/Soft404';
import { mongoIdValidatorByRegex } from '@repo/shared-util';
import {IPageProps} from "@repo/typescript-types";


const TagPage = async (props: IPageProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;

    const locale = i18n.locales.includes(params?.lang) ? params?.lang : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

    const dictionary = await getDictionary(locale);

    if (!mongoIdValidatorByRegex(params.tagId)) {
        return <Soft404 dictionary={dictionary} />;
    }

    const settingsData = await fetchSettings({ requireSettings: ['tagPageSettings'] });
    const sidebar = settingsData?.settings?.tagPageSettings?.sidebar;

    const widgetsData = await fetchWidgets({
        widgets: ['tagPageTop', 'tagPageLeftSidebar', 'tagPageBottom', 'tagPageRightSidebar'],
        locale,
    });

    const currentPageQuery = searchParams?.page;
    const currentPage = currentPageQuery && typeof currentPageQuery === 'string' ? parseInt(currentPageQuery, 10) : 1;

    const postsData = await fetchPosts({
        queryObject: {
            sort: searchParams?.sort,
            lang: params?.lang,
            metaId: params?.tagId,
            page: currentPage,
            size: searchParams?.size,
        },
        locale,
    });

    if (!postsData?.meta) {
        return <Soft404 dictionary={dictionary} />;
    }

    return (
        <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
            <main id={'primary'} className={'main tagPage'}>
                <MetaAdminQuickAccessBar metaId={params?.tagId} />
                <PostsPageInfo
                    title={postsData?.meta?.translations?.[params?.lang]?.name ?? postsData?.meta?.name}
                    description={
                        postsData?.meta?.translations?.[params?.lang]?.description ?? postsData?.meta?.description
                    }
                />
                <WidgetsRenderer
                    dictionary={dictionary}
                    locale={locale}
                    widgets={widgetsData.widgets?.['tagPageTop']}
                    position={'tagPageTop'}
                />
                <PostPage
                    renderPagination
                    posts={postsData?.posts}
                    locale={locale}
                    dictionary={dictionary}
                    totalCount={postsData?.totalCount}
                    currentPage={currentPage}
                />
                <WidgetsRenderer
                    dictionary={dictionary}
                    locale={locale}
                    widgets={widgetsData.widgets?.['categoryPageBottom']}
                    position={'categoryPageBottom'}
                />
            </main>

            <SidebarWidgetAreaRenderer
                leftSideWidgets={widgetsData.widgets?.['categoryPageLeftSidebar']}
                rightSideWidgets={widgetsData.widgets?.['categoryPageRightSidebar']}
                dictionary={dictionary}
                locale={locale}
                sidebar={sidebar || 'no'}
                position={'postPage'}
            />
        </div>
    );
};

export default TagPage;

export const generateMetadata = tagMetaGenerator;

export const dynamic = 'force-dynamic';
