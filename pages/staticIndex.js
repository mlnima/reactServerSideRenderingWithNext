import React from 'react';
import { getFirstLoadDataStatic} from "../_variables/ajaxVariables";
import MainWidgetArea from "../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home = ({isMobile, widgets, design, identity}) => {

    return (
        < MainWidgetArea isMobile={isMobile}
                         rendering={true}
                         widgets={(widgets || []).filter(widget => widget.data?.position === 'home')}
                         className='home-page main'
                         position='home'
                         stylesData={design?.homePageStyle}
                         currentPageSidebar={identity?.homePageSidebar }
                         postElementSize={design?.postElementSize}
                         postElementStyle={design?.postElementStyle}
                         postElementImageLoader={design?.postElementImageLoader}
                         postElementImageLoaderType={design?.postElementImageLoaderType}
        />
    );

};

export const getStaticProps  = async (context) => {
    const firstLoadData = await getFirstLoadDataStatic(['homePageLeftSidebar', 'homePageRightSidebar', 'home'])

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
            ...firstLoadData
        }
    }
}

export default Home;