import React from 'react';
import {getFirstLoadData} from "../_variables/ajaxVariables";
import MainWidgetArea from "../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {wrapper} from "../store/store";
import {useSelector} from "react-redux";
import {ClientPagesTypes} from '../_variables/TypeScriptTypes/ClientPagesTypes'
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


export const getServerSideProps = wrapper.getServerSideProps(store =>
    // @ts-ignore
    async (context ) => {
        const firstLoadData = await getFirstLoadData(context.req,
            ['homePageLeftSidebar', 'homePageRightSidebar', 'home'],
            store
        )
        return {
            props: {
                ...(await serverSideTranslations(context.locale as string , ['common', 'customTranslation'])),
                ...firstLoadData,
            }
        }
    });

export default Home;

