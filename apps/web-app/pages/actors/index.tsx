import React from "react";
import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {wrapper} from "@store_toolkit/store";
import SidebarWidgetAreaRenderer from "@components/RootLayout/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import MetasCardsRenderer from "../../components/includes/cards/CardsRenderer/MetasCardsRenderer";
import {Store} from "typescript-types";
import getMetasAction from "@store_toolkit/clientReducers/postsReducer/getMetasAction";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import textContentReplacer from "custom-util/src/string-util/textContentReplacer";
import {getTextDataWithTranslation} from "custom-util";

const PageStyle = styled.div`
  .actors {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 100%;
  }

  ${({customStyles}: { customStyles?: string }) => customStyles || ''}
`

const actorsPage = () => {

    const {locale} = useRouter()
    const currentPageSettings = useSelector(({settings}: Store) => settings?.currentPageSettings)
    const headDataSettings = useSelector(({settings}: Store) => settings?.initialSettings?.headDataSettings)

    return (
        <PageStyle id={'content'} className={`page-${currentPageSettings?.sidebar || 'no'}-sidebar `}
                   customStyles={currentPageSettings?.customStyles} >
            <HeadSetter title={ currentPageSettings?.title ?
                textContentReplacer(currentPageSettings?.title,
                    {name:undefined,count:undefined,siteName:headDataSettings.siteName}
                ): getTextDataWithTranslation(locale as string,'title',currentPageSettings)}  />
            <main id={'primary'} className={'content main '}>
                <WidgetsRenderer position={'actorsPageTop'}/>
                <MetasCardsRenderer metaType={'actors'}/>
                <PaginationComponent/>
                <WidgetsRenderer position={'actorsPageBottom'}/>
            </main>
            <SidebarWidgetAreaRenderer sidebar={currentPageSettings.sidebar} position={'actorsPage'}/>
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
            page: 'actorsPage'
        },
        store
    )

    await store.dispatch(getMetasAction({
        data: context.query,
        metaType: 'actors'
    }))

    return null

});

export default actorsPage;
