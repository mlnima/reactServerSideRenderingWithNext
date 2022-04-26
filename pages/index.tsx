import MainWidgetArea from "../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {wrapper} from "@store/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import { getDefaultPageData} from "@store/clientActions/globalStateActions";
import AppLayout from '@components/layouts/AppLayout';
import type { ReactElement } from 'react';

const Home = () => {
    const homePageStyle = useSelector(({settings}: StoreTypes) => settings.design?.homePageStyle);
    return (
        < MainWidgetArea className='home-page main' position='home' stylesData={homePageStyle}/>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

        await store.dispatch(
            getDefaultPageData(
                context,
                ['homePageLeftSidebar', 'homePageRightSidebar', 'home'],
                {
                    setHeadData:true,
                    page:'home'
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


Home.getLayout = function getLayout(page:ReactElement) {
    return (
        <AppLayout>
          {page}
        </AppLayout>
    )
}

export default Home;

