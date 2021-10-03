import React from 'react';
import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getMultipleMeta} from "../../_variables/ajaxPostsVariables";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import CategoriesRenderer from "../../components/includes/pagesComponents/categoriesPageComponents/Components/CategoriesRenderer/CategoriesRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {useSelector} from "react-redux";
import {settingsPropTypes, WidgetsStateInterface} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {wrapper} from "../../store/store";
const CategoriesPageStyledDiv = styled.div`
  grid-area: main;
  .categories {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 100%;
  }
`
const categoriesPage = ({metaSource, referer, isMobile}: ClientPagesTypes) => {

    const settings = useSelector((state : settingsPropTypes) => state.settings);
    const router = useRouter()

    const isWithSidebar = settings.identity?.metaPageSidebar
    return (
        <CategoriesPageStyledDiv className={isWithSidebar ? 'content main ' : 'content main '}>
            <WidgetsRenderer
                isMobile={isMobile}
                position={'categoriesPageTop'}
                referer={referer}
            />
            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={metaSource?.totalCount}
                // @ts-ignore
                size={parseInt(router.query?.size) || 60}
                // @ts-ignore
                maxPage={Math.ceil(parseInt(metaSource?.totalCount) / parseInt(router.query?.size || 60))}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <CategoriesRenderer categories={metaSource?.metas || []} postElementSize={settings.design?.postElementSize} metaData={undefined}/>

            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={metaSource?.totalCount}
                // @ts-ignore
                size={parseInt(router.query?.size) || 60}
                // @ts-ignore
                maxPage={Math.ceil(parseInt(metaSource?.totalCount) / parseInt(router.query?.size || 60))}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <WidgetsRenderer
                isMobile={isMobile}
                position={'categoriesPageBottom'}
                referer={referer}
            />
        </CategoriesPageStyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['categoriesPageTop', 'categoriesPageLeftSidebar', 'categoriesPageBottom', 'categoriesPageRightSidebar'],store);
    const metaData = await getMultipleMeta(context.query, 'categories', true);
    const metaSource = metaData.data ? metaData.data : {metas: [], totalCount: 0}
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common','customTranslation'])),
            ...firstLoadData,
            query:context.query,
            metaSource,
        }
    }

});

export default categoriesPage;
