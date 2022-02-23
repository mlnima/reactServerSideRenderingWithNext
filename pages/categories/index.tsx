import React from 'react';
import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import {getFirstLoadData} from "@_variables/ajaxVariables";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import CategoriesRenderer
    from "../../components/includes/pagesComponents/categoriesPageComponents/Components/CategoriesRenderer/CategoriesRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {settingsPropTypes, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {wrapper} from "@store/store";
import {getMetas} from "@store/clientActions/postsAction";

const CategoriesPageStyledMain = styled.main`
  grid-area: main;
`
const categoriesPage = () => {
    const router = useRouter()
    const isWithSidebar = useSelector((store: settingsPropTypes) => store.settings?.identity?.metaPageSidebar);
    const totalCount = useSelector((store: StoreTypes) => store.posts.totalCount)
    const postsCountPerPage = router.query?.size ? parseInt(router.query?.size as string) :
        useSelector((store: StoreTypes) => parseInt(store?.settings?.identity?.postsCountPerPage || '20'))

    return (
        <CategoriesPageStyledMain className={isWithSidebar ? 'content main ' : 'content main '}>
            <WidgetsRenderer position={'categoriesPageTop'}/>
            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={totalCount}
                size={postsCountPerPage}
                maxPage={Math.ceil(totalCount / postsCountPerPage)}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <CategoriesRenderer postElementSize={undefined}/>

            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={totalCount}
                size={postsCountPerPage}
                maxPage={Math.ceil(totalCount / postsCountPerPage)}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <WidgetsRenderer position={'categoriesPageBottom'}/>
        </CategoriesPageStyledMain>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    await getFirstLoadData(
        context.req,
        ['categoriesPageTop', 'categoriesPageLeftSidebar', 'categoriesPageBottom', 'categoriesPageRightSidebar'],
        store,
        context.locale
    );

    // @ts-ignore
    await store.dispatch(getMetas(context.query, 'categories', true))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation']))
        }
    }

});

export default categoriesPage;
