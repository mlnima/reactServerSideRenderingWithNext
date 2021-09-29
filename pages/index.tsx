import React, {useEffect} from 'react';
import {getFirstLoadData} from "../_variables/ajaxVariables";
import MainWidgetArea from "../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {ClientPagesTypes} from '../_variables/TypeScriptTypes/ClientPagesTypes'
import {wrapper} from "../store/store";
import {useSelector} from "react-redux";
import {settingsPropTypes} from "../_variables/TypeScriptTypes/GlobalTypes";

const Home = ({isMobile}: ClientPagesTypes) => {
    const settings = useSelector((state : settingsPropTypes) => state.settings);
    return (
        < MainWidgetArea
            isMobile={isMobile}
            rendering={true}
            className='home-page main'
            position='home'
            stylesData={settings.design?.homePageStyle}
            currentPageSidebar={settings.identity?.homePageSidebar}
        />
    );
};


export const getServerSideProps = wrapper.getServerSideProps(
    store =>
        async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'], store)
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            ...firstLoadData,
            query: context.query,
        }
    }
});

export default Home;

