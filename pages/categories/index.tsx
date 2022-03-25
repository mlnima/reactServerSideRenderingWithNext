import React from 'react';
import {useRouter} from "next/router";
import PaginationComponent from "@components/includes/PaginationComponent/PaginationComponent";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import CategoriesRenderer
    from "../../components/includes/pagesComponents/categoriesPageComponents/Components/CategoriesRenderer/CategoriesRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {settingsPropTypes, StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {wrapper} from "@store/store";
import {getMetas} from "@store/clientActions/postsAction";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";

const CategoriesPageStyledMain = styled.main`
  grid-area: main;
`
const categoriesPage = () => {
    const {query} = useRouter()
    const isWithSidebar = useSelector((store: settingsPropTypes) => store.settings?.identity?.metaPageSidebar);
    const totalCount = useSelector((store: StoreTypes) => store.posts.totalCount)
    const postsCountPerPage = query?.size ? parseInt(query?.size as string) :
        useSelector((store: StoreTypes) => parseInt(store?.settings?.identity?.postsCountPerPage || '20'))

    return (
        <CategoriesPageStyledMain className={isWithSidebar ? 'content main ' : 'content main '}>
            <WidgetsRenderer position={'categoriesPageTop'}/>
            <PaginationComponent
                isActive={true}
                currentPage={query?.page ? parseInt(query?.page as string) : 1}
                totalCount={totalCount}
                size={postsCountPerPage}
                maxPage={Math.ceil(totalCount / postsCountPerPage)}
            />

            <CategoriesRenderer postElementSize={undefined}/>

            <PaginationComponent
                isActive={true}
                currentPage={query?.page ? parseInt(query?.page as string) : 1}
                totalCount={totalCount}
                size={postsCountPerPage}
                maxPage={Math.ceil(totalCount / postsCountPerPage)}
            />
            <WidgetsRenderer position={'categoriesPageBottom'}/>
        </CategoriesPageStyledMain>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await store.dispatch(getDefaultPageData(
        context,
        [
            'categoriesPageTop',
            'categoriesPageLeftSidebar',
            'categoriesPageBottom',
            'categoriesPageRightSidebar'
        ],
        {
            setHeadData: true,
            page: 'categories'
        }
        ))
    // @ts-ignore
    await store.dispatch(getMetas(context.query, 'categories', true))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation']))
        }
    }

});

export default categoriesPage;
