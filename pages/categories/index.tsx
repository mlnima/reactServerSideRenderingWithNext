import React from 'react';
import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getMultipleMeta} from "../../_variables/ajaxPostsVariables";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import CategoriesRenderer from "../../components/includes/pagesComponents/categoriesPageComponents/Components/CategoriesRenderer/CategoriesRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {settingsPropTypes, StoreTypes, WidgetsStateInterface} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {wrapper} from "../../store/store";
import {SET_CATEGORIES_METAS} from "../../store/types";

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
const categoriesPage = () => {

    const isWithSidebar = useSelector((state: settingsPropTypes) => state.settings?.identity?.metaPageSidebar);
    const totalCount = useSelector((state: StoreTypes) => state.posts.totalCount)
    const router = useRouter()

    return (
        <CategoriesPageStyledDiv className={isWithSidebar ? 'content main ' : 'content main '}>
            <WidgetsRenderer
                position={'categoriesPageTop'}
            />
            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={totalCount}
                // @ts-ignore
                size={parseInt(router.query?.size) || 60}
                // @ts-ignore
                maxPage={Math.ceil(totalCount / parseInt(router.query?.size || 60))}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <CategoriesRenderer metaData={undefined} postElementSize={undefined}/>

            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={totalCount}
                // @ts-ignore
                size={parseInt(router.query?.size) || 60}
                // @ts-ignore
                maxPage={Math.ceil(totalCount / parseInt(router.query?.size || 60))}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <WidgetsRenderer
                position={'categoriesPageBottom'}
            />
        </CategoriesPageStyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['categoriesPageTop', 'categoriesPageLeftSidebar', 'categoriesPageBottom', 'categoriesPageRightSidebar'], store);
    const metaData = await getMultipleMeta(context.query, 'categories', true);

    store.dispatch({
        type: SET_CATEGORIES_METAS,
        payload: {
            // @ts-ignore
            categoriesMetas: metaData.data?.metas || [],
            // @ts-ignore
            totalCount: metaData.data?.totalCount || 0,
        }
    })
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            ...firstLoadData,
        }
    }

});

export default categoriesPage;
