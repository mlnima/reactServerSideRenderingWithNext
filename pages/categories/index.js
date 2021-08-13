import React, {useContext} from 'react';
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";

import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getMultipleMeta} from "../../_variables/ajaxPostsVariables";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import CategoriesRenderer from "../../components/includes/CategoriesPage/Components/CategoriesRenderer/CategoriesRenderer";

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
                currentPage={dataForGettingMeta?.page}
                totalCount={metaSource?.totalCount}
                size={dataForGettingMeta?.size}
                maxPage={Math.ceil(parseInt(metaSource?.totalCount) / parseInt(dataForGettingMeta?.size))}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <CategoriesRenderer categories={metaSource?.metas || []} postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}/>

            <PaginationComponent
                isActive={true}
                currentPage={dataForGettingMeta?.page}
                totalCount={metaSource?.totalCount}
                size={dataForGettingMeta?.size}
                maxPage={Math.ceil(parseInt(metaSource?.totalCount) / parseInt(dataForGettingMeta?.size))}
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

export const getServerSideProps = async ({req, query}) => {
    const firstLoadData = await getFirstLoadData(req, ['categoriesPageTop','categoriesPageLeftSidebar','categoriesPageBottom', 'categoriesPageRightSidebar'], 'categoriesPage')
    const dataForGettingMeta = {
        metaType: 'categories',
        page: parseInt(query?.page) || 1,
        size: parseInt(query?.size) || 30,
        sort: query?.sort || null,
        startWith: query?.startWith || 'any',
        keyword: query?.keyword || null,
        lang: query?.lang || 'default',
        status: 'published'
    }
    const metaData = await getMultipleMeta(dataForGettingMeta, firstLoadData.domainName, true, query.metaType)
    const widgets = firstLoadData.widgets
    const metaSource = metaData.data ? metaData.data : {metas: [], totalCount: 0}
    return {props: {...firstLoadData.settings, query, isMobile: Boolean(firstLoadData.isMobile), widgets, metaSource, dataForGettingMeta, referer: firstLoadData.referer}}
}

export default categoriesPage;
