import WidgetsRenderer from "@components/includes/WidgetsRenderer/WidgetsRenderer";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {wrapper} from "@store_toolkit/store";
import type {ReactElement} from 'react';
import AppLayout from "@components/layouts/AppLayout";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import React from "react";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
import MetasRenderer from "@components/includes/metasPage/MetasRenderer";
import getTags from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/getTags";

const PageStyle = styled.div`
  ${({tagsPageStyle}: { tagsPageStyle: string }) => tagsPageStyle || ''}
`

const tagsPage = () => {

    const { tagsPageStyle, sidebar,metas} = useSelector(({settings, posts}: Store) => {
        return {
            tagsPageStyle: settings?.design.tagsPageStyle,
            sidebar: settings?.identity?.tagsPageSidebar,
            metas: posts?.tagsMetas,
        }
    })

    return (
        <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar `} tagsPageStyle={tagsPageStyle}>
            <main id={'primary'} className={'content main '}>
                <WidgetsRenderer position={'tagsPageTop'}/>
                <MetasRenderer metaData={metas} metaType={'tags'}/>

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

    await store.dispatch(getTags({data: context.query}))

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




// await store.dispatch(fetchMetas({
//     data:context.query,
//     metaType:'tags'
// }))

// {/*<MetasCardsRenderer metaType={'tags'}/>*/}
// {/*<PaginationComponent*/}
// {/*    isActive={true}*/}
// {/*    currentPage={query?.page ? parseInt(query?.page as string) : 1}*/}
// {/*    totalCount={totalCount}*/}
// {/*    size={postsCountPerPage}*/}
// {/*    maxPage={Math.ceil(totalCount / postsCountPerPage)}*/}
// {/*/>*/}