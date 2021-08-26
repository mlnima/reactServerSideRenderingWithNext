import React, {useContext} from 'react';
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";

import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getMultipleMeta} from "../../_variables/ajaxPostsVariables";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import CategoriesRenderer from "../../components/includes/CategoriesPage/Components/CategoriesRenderer/CategoriesRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const categoriesPage = ({metaSource, identity, dataForGettingMeta,design,widgets,referer,isMobile}) => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const isWithSidebar = identity?.data?.metaPageSidebar || contextData?.siteIdentity?.metaPageSidebar
    return (
        <div className={isWithSidebar ? 'content main ' : 'content main '}>
            <style jsx>{`
                .content{
                  grid-area:main;
                }
                .categories{
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                    max-width: 100%;
                }
            `}</style>
            <WidgetsRenderer
                isMobile={isMobile}
                widgets={widgets.filter(w=>w.data.position === 'categoriesPageTop' )}
                position={'categoriesPageTop'}
                referer={referer}
                currentPageSidebar={identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                postElementStyle={design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                postElementImageLoader={design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                postElementImageLoaderType={design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
            />
            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={metaSource?.totalCount}
                size={parseInt(router.query?.size) || 60}
                maxPage={Math.ceil(parseInt(metaSource?.totalCount) / parseInt(router.query?.size|| 60) )}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <CategoriesRenderer categories={metaSource?.metas || []} postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}/>

            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={metaSource?.totalCount}
                size={parseInt(router.query?.size) || 60}
                maxPage={Math.ceil(parseInt(metaSource?.totalCount) / parseInt(router.query?.size|| 60) )}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <WidgetsRenderer
                isMobile={isMobile}
                widgets={widgets.filter(w=>w.data.position === 'categoriesPageBottom' )}
                position={'categoriesPageBottom'}
                referer={referer}
                currentPageSidebar={identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                postElementStyle={design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                postElementImageLoader={design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                postElementImageLoaderType={design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
            />
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['categoriesPageTop','categoriesPageLeftSidebar','categoriesPageBottom', 'categoriesPageRightSidebar'], 'categoriesPage')
    // const sort = context.query?.sort ? {sort: context.query?.sort}: {}
    // const keyword = context.query?.keyword ? { keyword: encodeURIComponent(context.query?.keyword)}: {}
    // const dataForGettingMeta = {
    //     metaType: 'categories',
    //     page: context.query?.page ?  parseInt(context.query?.page) : 1,
    //     size: context.query?.size ? parseInt(context.query?.size) : 60,
    //     startWith: context.query?.startWith || 'any',
    //     lang: context.query?.lang || 'default',
    //     status: 'published',
    //     ...sort,
    //     ...keyword
    // }
    const metaData = await getMultipleMeta(context.query,'categories', true)
    const widgets = firstLoadData.widgets
    const metaSource = metaData.data ? metaData.data : {metas: [], totalCount: 0}
    return {props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            ...firstLoadData.settings,
            query:context.query,
            isMobile: Boolean(firstLoadData.isMobile),
            widgets,
            metaSource,
            // dataForGettingMeta,
            referer: firstLoadData.referer
    }}
}

export default categoriesPage;
