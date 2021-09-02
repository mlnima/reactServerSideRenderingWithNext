import React, {useContext} from 'react';
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getMultipleMeta} from "../../_variables/ajaxPostsVariables";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import TagsRenderer from "../../components/includes/TagsPage/Components/TagsRenderer/TagsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import styled from "styled-components";

const TagsPageStyledDiv = styled.div`
  grid-area: main;
  .tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 100%;
  }
`
const tagsPage = ({metaSource, identity, dataForGettingMeta, design, widgets, referer, isMobile}) => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const isWithSidebar = identity?.data?.metaPageSidebar || contextData?.siteIdentity?.metaPageSidebar
    return (
        <TagsPageStyledDiv className={isWithSidebar ? 'content main ' : 'content main '}>
            <WidgetsRenderer
                isMobile={isMobile}
                widgets={widgets.filter(w => w.data.position === 'tagsPageTop')}
                position={'tagsPageTop'}
                referer={referer}
                currentPageSidebar={identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                postElementStyle={design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                postElementImageLoader={design?.data?.postElementImageLoader || contextData.siteDesign.postElementImageLoader}
                postElementImageLoaderType={design?.data?.postElementImageLoaderType || contextData.siteDesign.postElementImageLoader}
            />
            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={metaSource?.totalCount}
                size={parseInt(router.query?.size) || 60}
                maxPage={Math.ceil(parseInt(metaSource?.totalCount) / parseInt(router.query?.size || 60))}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <TagsRenderer tags={metaSource?.metas || []} postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}/>

            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={metaSource?.totalCount}
                size={parseInt(router.query?.size) || 60}
                maxPage={Math.ceil(parseInt(metaSource?.totalCount) / parseInt(router.query?.size || 60))}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <WidgetsRenderer
                isMobile={isMobile}
                widgets={widgets.filter(w => w.data.position === 'tagsPageBottom')}
                position={'tagsPageBottom'}
                referer={referer}
                currentPageSidebar={identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                postElementStyle={design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                postElementImageLoader={design?.data?.postElementImageLoader || contextData.siteDesign.postElementImageLoader}
                postElementImageLoaderType={design?.data?.postElementImageLoaderType || contextData.siteDesign.postElementImageLoader}
            />
        </TagsPageStyledDiv>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['tagsPageTop', 'tagsPageLeftSidebar', 'tagsPageBottom', 'tagsPageRightSidebar'], 'tagsPage')

    const metaData = await getMultipleMeta(context.query, 'tags', true)
    const metaSource = metaData.data ? metaData.data : {metas: [], totalCount: 0}
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'customTranslation'])),
            ...firstLoadData.settings,
            query: context.query,
            isMobile: Boolean(firstLoadData.isMobile),
            widgets:firstLoadData?.widgets || [],
            metaSource,
            // dataForGettingMeta,
            referer: firstLoadData.referer
        }
    }
}

export default tagsPage;
