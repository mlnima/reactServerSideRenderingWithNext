import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {wrapper} from "../../store_toolkit/store";
import SidebarWidgetAreaRenderer from "../../components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import React from "react";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import MetasCardsRenderer from "../../components/includes/cards/CardsRenderer/MetasCardsRenderer";
import {Store} from "typescript-types";
import getMetasAction from "@store_toolkit/clientReducers/postsReducer/getMetasAction";

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

    const {actorsPageStyle, totalCount,sidebar,postsCountPerPage} = useSelector(({settings, posts}: Store) => {
        return {
            actorsPageStyle: settings?.design?.actorsPageStyle,
            totalCount: posts?.totalCount,
            sidebar: settings?.identity?.actorsPageSidebar,
            postsCountPerPage: query?.size ? parseInt(query?.size as string) : settings?.identity?.postsCountPerPage || 20
        }
    })

    return (
        <PageStyle id={'content'}
                   //@ts-ignore
                   actorsPageStyle={actorsPageStyle} className={`page-${sidebar || 'no'}-sidebar `}>
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

//@ts-ignore
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

    await store.dispatch(getMetasAction({
        data:context.query,
        metaType:'actors'
    }))

    return null

});

export default actorsPage;
