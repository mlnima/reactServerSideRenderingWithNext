import {FC} from 'react';
import {getFirstLoadData} from "@_variables/ajaxVariables";
import MainWidgetArea from "../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {wrapper} from "@store/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

const Home : FC = () => {
    const homePageStyle = useSelector(({settings}: StoreTypes) => settings.design?.homePageStyle);
    return (
        < MainWidgetArea
            className='home-page main'
            position='home'
            stylesData={homePageStyle}
        />
    );
};


export const getServerSideProps = wrapper.getServerSideProps(store =>

    async (context ) => {

        await getFirstLoadData(context.req,
            ['homePageLeftSidebar', 'homePageRightSidebar', 'home'],
            store,
            context.locale
        )

        return {
            props: {
                ...(await serverSideTranslations(context.locale as string , ['common', 'customTranslation']))
            }
        }

    });

export default Home;

