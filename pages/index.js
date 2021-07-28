import React, {useContext} from 'react';
import {getFirstLoadData} from "../_variables/ajaxVariables";
import {AppContext} from "../context/AppContext";
import MainWidgetArea from "../components/widgetsArea/MainWidgetArea/MainWidgetArea";

const Home = ({isMobile, widgets, design, identity}) => {
    const contextData = useContext(AppContext);
    return (
        < MainWidgetArea isMobile={isMobile}
                         rendering={true}
                         widgets={(widgets || []).filter(widget => widget.data?.position === 'home')}
                         className='home-page main'
                         position='home'
                         stylesData={design?.data?.homePageStyle || contextData.siteDesign.homePageStyle}
                         currentPageSidebar={identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                         postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                         postElementStyle={design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                         postElementImageLoader={design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                         postElementImageLoaderType={design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
        />
    );

};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'], 'homePage')
    return {props: {widgets : firstLoadData?.widgets || [], ...firstLoadData?.settings, isMobile: Boolean(firstLoadData.isMobile), referer: firstLoadData.referer, requestProtocol: context.req.protocol}}
}

export default Home;

