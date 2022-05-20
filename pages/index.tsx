import MainWidgetArea from "../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {getDefaultPageData} from "@store_toolkit/clientActions/globalStateActions";
import AppLayout from '@components/layouts/AppLayout';
import type {ReactElement} from 'react';
import styled from "styled-components";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import {useEffect} from "react";


const HomePageStyle = styled.div`
  display: grid;
  ${({stylesData}: { stylesData: string }) => stylesData || ''}
`

const HomePage = () => {

    const {sidebar, homePageStyle} = useSelector(({settings}: StoreTypes) => {
        return {
            homePageStyle: settings?.design?.homePageStyle,
            sidebar: settings?.identity?.homePageSidebar,
        }
    })

    const widgets = useSelector(({widgets}: StoreTypes)=>{
        return widgets.widgetInGroups
    })

    useEffect(() => {
        console.log(widgets)
    }, [widgets]);

    return (
        <HomePageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar`} stylesData={homePageStyle}>
            <MainWidgetArea className='home-page' position='home'/>
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'homePage'}/>
        </HomePageStyle>

    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await getDefaultPageData(
        context,
        ['homePageLeftSidebar', 'homePageRightSidebar', 'home'],
        {
            setHeadData: true,
            page: 'home'
        },
        store
    )

    return {
        props: {
            ...(await serverSideTranslations(context?.locale as string, ['common', 'customTranslation']))
        }
    }

});


HomePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default HomePage;

