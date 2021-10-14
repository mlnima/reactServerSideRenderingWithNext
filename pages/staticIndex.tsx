import React from 'react';
import {getFirstLoadDataStatic} from "../_variables/ajaxVariables";
import MainWidgetArea from "../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {ClientPagesTypes} from '../_variables/TypeScriptTypes/ClientPagesTypes'
import {wrapper} from "../store/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "../_variables/TypeScriptTypes/GlobalTypes";

const Home = ({}: ClientPagesTypes) => {

    const settings = useSelector((state: StoreTypes) => state.settings);

    return (
        < MainWidgetArea
            rendering={true}
            className='home-page main'
            position='home'
            stylesData={settings.design?.homePageStyle}
        />
    );

};

export const getStaticProps = wrapper.getServerSideProps(store =>

    async (context) => {
        const firstLoadData = await getFirstLoadDataStatic(
            ['homePageLeftSidebar', 'homePageRightSidebar', 'home'],
            store
        )
        return {
            props: {
                ...(await serverSideTranslations(context.locale as string, ['common'])),
                ...firstLoadData
            }
        }
    })

export default Home;