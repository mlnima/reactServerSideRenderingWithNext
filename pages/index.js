import React from 'react';
import {getFirstLoadData} from "../_variables/ajaxVariables";
import MainWidgetArea from "../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home = ({isMobile, widgets, design, identity}) => {
//console.log(process.env)
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

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'])
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            widgets : firstLoadData?.widgets || [],
            ...firstLoadData?.settings,
            isMobile: firstLoadData?.isMobile ? Boolean(firstLoadData.isMobile) :false,
            referer: firstLoadData?.referer ? firstLoadData?.referer :false,
            requestProtocol: context.req.protocol
        }}
}

export default Home;

