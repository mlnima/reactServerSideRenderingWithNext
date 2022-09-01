import {useRouter} from "next/router";
import PaginationComponent from "@components/includes/PaginationComponent/PaginationComponent";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {wrapper} from "@store_toolkit/store";
import AppLayout from "@components/layouts/AppLayout";
import type {ReactElement} from 'react'
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import React from "react";
import fetchMetas from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchMetas";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import MetasCardsRenderer from "@components/includes/cards/CardsRenderer/MetasCardsRenderer";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const PageStyle = styled.div`
  .actors {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 100%;
  }

  ${({actorsPageStyle}: { actorsPageStyle: string }) => actorsPageStyle || ''}
`

const actorsPage = () => {
    const {query} = useRouter();

    const {actorsPageStyle, totalCount,sidebar} = useSelector(({settings, posts}: Store) => {
        return {
            actorsPageStyle: settings?.design?.actorsPageStyle,
            totalCount: posts?.totalCount,
            sidebar: settings?.identity?.actorsPageSidebar,
        }
    })

    const postsCountPerPage = query?.size ? parseInt(query?.size as string) :
        useSelector((store: Store) => parseInt(store?.settings?.identity?.postsCountPerPage || '20'))

    return (
        <PageStyle id={'content'} actorsPageStyle={actorsPageStyle} className={`page-${sidebar || 'no'}-sidebar `}>
            <main id={'primary'} className={'content main '}>
                <WidgetsRenderer
                    position={'actorsPageTop'}
                />
                <MetasCardsRenderer metaType={'actors'}/>
                <PaginationComponent
                    isActive={true}
                    currentPage={query?.page ? parseInt(query?.page as string) : 1}
                    totalCount={totalCount}
                    size={postsCountPerPage}
                    maxPage={Math.ceil(totalCount / postsCountPerPage)}
                />
                <WidgetsRenderer
                    position={'actorsPageBottom'}

                />
            </main>
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'actorsPage'}/>
        </PageStyle>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'actorsPageTop',
            'actorsPageLeftSidebar',
            'actorsPageBottom',
            'actorsPageRightSidebar'
        ],
        {
            setHeadData: true,
            page: 'actors'
        },
        store
    )

    await store.dispatch(fetchMetas({
        data:context.query,
        metaType:'actors'
    }))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }

});

actorsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}


export default actorsPage;
