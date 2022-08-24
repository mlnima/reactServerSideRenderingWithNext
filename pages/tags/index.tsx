import {useRouter} from "next/router";
import PaginationComponent from "@components/includes/PaginationComponent/PaginationComponent";
import WidgetsRenderer from "@components/includes/WidgetsRenderer/WidgetsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {wrapper} from "@store_toolkit/store";
import type {ReactElement} from 'react';
import AppLayout from "@components/layouts/AppLayout";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import React from "react";
import fetchMetas from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchMetas";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import MetasCardsRenderer from "@components/includes/cards/CardsRenderer/MetasCardsRenderer";

const PageStyle = styled.div`
  ${({tagsPageStyle}: { tagsPageStyle: string }) => tagsPageStyle || ''}
`

const tagsPage = () => {

    const {query} = useRouter()

    const {totalCount, tagsPageStyle, sidebar} = useSelector(({settings, posts}: StoreTypes) => {
        return {
            totalCount: posts.totalCount,
            tagsPageStyle: settings?.design.tagsPageStyle,
            sidebar: settings?.identity?.tagsPageSidebar,
        }
    })

    const postsCountPerPage = query?.size ? parseInt(query?.size as string) :
        useSelector((store: StoreTypes) => parseInt(store?.settings?.identity?.postsCountPerPage || '20'))

    return (
        <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar `} tagsPageStyle={tagsPageStyle}>
            <main id={'primary'} className={'content main '}>
                <WidgetsRenderer position={'tagsPageTop'}/>
                <MetasCardsRenderer metaType={'tags'}/>
                <PaginationComponent
                    isActive={true}
                    currentPage={query?.page ? parseInt(query?.page as string) : 1}
                    totalCount={totalCount}
                    size={postsCountPerPage}
                    maxPage={Math.ceil(totalCount / postsCountPerPage)}
                />
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


    await store.dispatch(fetchMetas({
        data:context.query,
        metaType:'tags'
    }))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }

});

tagsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default tagsPage;
