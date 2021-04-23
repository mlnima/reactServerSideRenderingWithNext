import React, {useContext} from 'react';
import {getFirstLoadData, getStaticLoadData, getMultipleWidgetWithData} from "../_variables/ajaxVariables";
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
        />
    );
};


//old_SSR
// Home.getInitialProps = async (context) => {
//     const firstLoadData = await getFirstLoadData(context.req)
//     const widgetsData = await getMultipleWidgetWithData({widgets: ['homePageSidebar', 'home']}, firstLoadData.domainName, true, 'homePage')
//     const widgets = [...(firstLoadData.widgets ?? []), ...(widgetsData?.data?.widgets ?? [])]
//     return {widgets, ...firstLoadData.settings, isMobile: Boolean(firstLoadData.isMobile), referer: firstLoadData.referer, requestProtocol: context.req.protocol}
// }

//SSR

const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'], 'homePage')
    const widgets = firstLoadData.widgets
    return {props: {widgets, ...firstLoadData.settings, isMobile: Boolean(firstLoadData.isMobile), referer: firstLoadData.referer, requestProtocol: context.req.protocol}}
}
//SSG
const getStaticProps = async (context) => {
    const firstLoadData = await getStaticLoadData()
    const widgetsData = await getMultipleWidgetWithData({widgets: ['homePageLeftSidebar', 'homePageRightSidebar', 'home']}, firstLoadData.domainName, true, 'homePage')
    const widgets = [...(firstLoadData.widgets ?? []), ...(widgetsData?.data?.widgets ?? [])]
    return {props: {widgets, ...firstLoadData?.settings, isMobile: Boolean(firstLoadData.isMobile), referer: firstLoadData.referer,}}
}

export {getServerSideProps}


export default Home;

