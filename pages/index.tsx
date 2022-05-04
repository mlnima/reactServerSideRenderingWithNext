import MainWidgetArea from "../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {wrapper} from "@store/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";
import AppLayout from '@components/layouts/AppLayout';
import type {ReactElement} from 'react';
import styled from "styled-components";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";

const HomePageStyle = styled.div`
  display: grid;
  ${({stylesData}: { stylesData: string }) => stylesData || ''}
`

const HomePage = () => {

    const {sidebar,homePageStyle} = useSelector(({settings}: StoreTypes) => {
        return {
            homePageStyle:settings.design?.homePageStyle,
            sidebar: settings?.identity?.homePageSidebar
        }
    })

    return (
        <HomePageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar`} stylesData={homePageStyle}>
            <MainWidgetArea className='home-page' position='home' />
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'homePage'}/>
        </HomePageStyle>

    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await store.dispatch(
        getDefaultPageData(
            context,
            ['homePageLeftSidebar', 'homePageRightSidebar', 'home'],
            {
                setHeadData: true,
                page: 'home'
            },
            store
        )
    )

    return {
        props: {
            ...(await serverSideTranslations(context?.locale || process.env.NEXT_PUBLIC_DEFAULT_LOCAL as string, ['common', 'customTranslation']))
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

