import React from 'react';
import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {wrapper} from "@store_toolkit/store";
import dynamic from "next/dynamic";
import SidebarWidgetAreaRenderer from "@components/RootLayout/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import MetasCardsRenderer from "../../components/includes/cards/CardsRenderer/MetasCardsRenderer";
import {Store} from "typescript-types";
import getMetasAction from "@store_toolkit/clientReducers/postsReducer/getMetasAction";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import textContentReplacer from "custom-util/src/string-util/textContentReplacer";
import {getTextDataWithTranslation} from "custom-util";

const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))

const PageStyle = styled.div`
  ${({customStyles}: { customStyles: string }) => customStyles || ''}
`

const categoriesPage = () => {

    const {locale} = useRouter()
    const currentPageSettings = useSelector(({settings}: Store) => settings?.currentPageSettings)
    const headDataSettings = useSelector(({settings}: Store) => settings?.initialSettings?.headDataSettings)

    return (
        <PageStyle id={'content'} className={`page-${currentPageSettings?.sidebar || 'no'}-sidebar `}
                   //@ts-ignore
                   customStyles={currentPageSettings?.customStyles}>
            <HeadSetter title={ currentPageSettings?.title ?
                textContentReplacer(currentPageSettings?.title,
                    {name:undefined,count:undefined,siteName:headDataSettings.siteName}
                ): getTextDataWithTranslation(locale as string,'title',currentPageSettings)}  />
            <main id={'primary'} className={'content main '}>
                <WidgetsRenderer position={'categoriesPageTop'}/>
                <MetasCardsRenderer metaType={'categories'}/>
                <PaginationComponent/>
                <WidgetsRenderer position={'categoriesPageBottom'}/>
            </main>
            <SidebarWidgetAreaRenderer sidebar={currentPageSettings?.sidebar} position={'categoriesPage'}/>
        </PageStyle>
    );
};

//@ts-ignore
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
            page: 'categoriesPage'
        },
        store
    )

    await store.dispatch(getMetasAction({
        data:context.query,
        metaType:'categories'
    }))

    return null
});

export default categoriesPage;
