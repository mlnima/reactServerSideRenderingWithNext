import {useRouter} from "next/router";
// import PaginationComponent from "@components/includes/PaginationComponent/PaginationComponent";
import WidgetsRenderer from "@components/includes/WidgetsRenderer/WidgetsRenderer";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {wrapper} from "@store_toolkit/store";
import type {ReactElement} from 'react';
import AppLayout from "@components/layouts/AppLayout";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import React from "react";
import fetchMetas from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchMetas";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
// import MetasCardsRenderer from "@components/includes/cards/CardsRenderer/MetasCardsRenderer";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
import MetasRenderer from "@components/includes/metasPage/MetasRenderer";
import getTags from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/getTags";

const PageStyle = styled.div`
  ${({tagsPageStyle}: { tagsPageStyle: string }) => tagsPageStyle || ''}
`

const tagsPage = () => {

    const {query} = useRouter()

    const {totalCount, tagsPageStyle, sidebar,metas} = useSelector(({settings, posts}: Store) => {
        return {
            totalCount: posts.totalCount,
            tagsPageStyle: settings?.design.tagsPageStyle,
            sidebar: settings?.identity?.tagsPageSidebar,
            metas: posts?.tagsMetas,

        }
    })

    const postsCountPerPage = query?.size ? parseInt(query?.size as string) :
        useSelector((store: Store) => parseInt(store?.settings?.identity?.postsCountPerPage || '20'))

    return (
        <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar `} tagsPageStyle={tagsPageStyle}>
            <main id={'primary'} className={'content main '}>
                <WidgetsRenderer position={'tagsPageTop'}/>
                <MetasRenderer metaData={metas} metaType={'tags'}/>
                {/*<MetasCardsRenderer metaType={'tags'}/>*/}
                {/*<PaginationComponent*/}
                {/*    isActive={true}*/}
                {/*    currentPage={query?.page ? parseInt(query?.page as string) : 1}*/}
                {/*    totalCount={totalCount}*/}
                {/*    size={postsCountPerPage}*/}
                {/*    maxPage={Math.ceil(totalCount / postsCountPerPage)}*/}
                {/*/>*/}
                <WidgetsRenderer position={'tagsPageBottom'}/>
            </main>
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'tagsPage'}/>
        </PageStyle>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'tagsPageTop',
            'tagsPageLeftSidebar',
            'tagsPageBottom',
            'tagsPageRightSidebar'
        ],
        {
            setHeadData: true,
            page: 'tags'
        },
        store
    )


    // await store.dispatch(fetchMetas({
    //     data:context.query,
    //     metaType:'tags'
    // }))
    await store.dispatch(getTags({
        data:context.query
    }))

    return null

});

tagsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default tagsPage;
