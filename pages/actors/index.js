import React, {useContext} from 'react';
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getMultipleMeta} from "../../_variables/ajaxPostsVariables";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import ActorsRenderer from "../../components/includes/ActorsPage/Components/ActorsRenderer/ActorsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
const ActorsPageStyledDiv = styled.div`
  grid-area:main;
  .actors{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 100%;
  }
`
const actorsPage = ({metaSource, identity, dataForGettingMeta,design,widgets,referer,isMobile}) => {
    const contextData = useContext(AppContext);
    const router = useRouter();
    const isWithSidebar = identity?.data?.metaPageSidebar || contextData?.siteIdentity?.metaPageSidebar;

    return (
        <ActorsPageStyledDiv className={isWithSidebar ? 'content main ' : 'content main '}>
            <WidgetsRenderer
                isMobile={isMobile}
                widgets={widgets.filter(w=>w.data.position === 'actorsPageTop' )}
                position={'actorsPageTop'}
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
                maxPage={Math.ceil(parseInt(metaSource?.totalCount) / parseInt(router.query?.size || 60) )}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <ActorsRenderer actors={metaSource?.metas || []} postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}/>


            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={metaSource?.totalCount}
                size={parseInt(router.query?.size) || 60}
                maxPage={Math.ceil(parseInt(metaSource?.totalCount) / parseInt(router.query?.size || 60) )}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <WidgetsRenderer
                isMobile={isMobile}
                widgets={widgets.filter(w=>w.data.position === 'actorsPageBottom' )}
                position={'actorsPageBottom'}
                referer={referer}
                currentPageSidebar={identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                postElementStyle={design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                postElementImageLoader={design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                postElementImageLoaderType={design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
            />
        </ActorsPageStyledDiv>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['actorsPageTop','actorsPageLeftSidebar','actorsPageBottom', 'actorsPageRightSidebar'], 'actorsPage')
    // const sort = context.query?.sort ? {sort: context.query?.sort}: {}
    // const keyword = context.query?.keyword ? { keyword: encodeURIComponent(context.query?.keyword)}: {}
    const dataForGettingMeta = {
        metaType: 'actors',
        page: context.query?.page ?  parseInt(context.query?.page) : 1,
        size: context.query?.size ? parseInt(context.query?.size) : 60,
        startWith: context.query?.startWith || 'any',
        lang: context.query?.lang || 'default',
        status: 'published',

    }
    const metaData = await getMultipleMeta(context.query,'actors', true)
    const metaSource = metaData.data ? metaData.data : {metas: [], totalCount: 0}

    return {props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            ...firstLoadData.settings,
            query:context.query,
            isMobile: Boolean(firstLoadData.isMobile),
            widgets:firstLoadData?.widgets || [],
            metaSource,
            // dataForGettingMeta,
            referer: firstLoadData.referer
    }}
}

export default actorsPage;
