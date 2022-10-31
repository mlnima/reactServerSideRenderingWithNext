import React from 'react';
import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {wrapper} from "../../store_toolkit/store";
import dynamic from "next/dynamic";
import SidebarWidgetAreaRenderer from "../../components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import fetchMetas from "../../store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchMetas";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import MetasCardsRenderer from "../../components/includes/cards/CardsRenderer/MetasCardsRenderer";
import {Store} from "typescript-types";

const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))

const PageStyle = styled.div`
  ${({stylesData}: { stylesData: string }) => stylesData || ''}
`

const categoriesPage = () => {
    const {query} = useRouter()

    const {
        categoriesPageStyle,
        totalCount,
        postsCountPerPage,
        sidebar
    } = useSelector(({settings, posts, widgets}: Store) => {
        return {
            categoriesPageStyle: settings?.design?.categoriesPageStyle,
            sidebar: settings?.identity?.categoriesPageSidebar,
            totalCount: posts.totalCount,
            postsCountPerPage: query?.size ? parseInt(query?.size as string) : settings?.identity?.postsCountPerPage || 20
        }
    })

    return (
        <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar `}
                   stylesData={categoriesPageStyle}>
            <main id={'primary'} className={'content main '}>
                <WidgetsRenderer position={'categoriesPageTop'}/>
                <MetasCardsRenderer metaType={'categories'}/>
                <PaginationComponent
                    isActive={true}
                    currentPage={query?.page ? parseInt(query?.page as string) : 1}
                    totalCount={totalCount}
                    size={postsCountPerPage}
                    maxPage={Math.ceil(totalCount / postsCountPerPage)}
                />
                <WidgetsRenderer position={'categoriesPageBottom'}/>
            </main>
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'categoriesPage'}/>
        </PageStyle>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
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
        },
        store
    )

    await store.dispatch(fetchMetas({
        data:context.query,
        metaType:'categories'
    }))

    return null
});

export default categoriesPage;
