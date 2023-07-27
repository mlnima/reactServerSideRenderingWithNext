import React from "react";
import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import styled from "styled-components";
import {wrapper} from "@store_toolkit/store";
import SidebarWidgetAreaRenderer from "@components/RootLayout/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import MetasCardsRenderer from "../../components/includes/cards/CardsRenderer/MetasCardsRenderer";
import getMetasAction from "@store_toolkit/clientReducers/postsReducers/getMetasAction";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import {textContentReplacer} from "custom-util";
import {getTextDataWithTranslation} from "custom-util";
import {useAppSelector} from "@store_toolkit/hooks";

interface IStyles{
    customStyles?: string
}

const PageStyle = styled.div<IStyles>`
  .actors {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 100%;
  }

  ${({customStyles}) => customStyles || ''}
`

const actorsPage = () => {

    const {locale} = useRouter()
    const currentPageSettings = useAppSelector(({settings}) => settings?.currentPageSettings)
    const headDataSettings = useAppSelector(({settings}) => settings?.initialSettings?.headDataSettings)

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

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

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

    return {
        props: {}
    }
});

export default actorsPage;
