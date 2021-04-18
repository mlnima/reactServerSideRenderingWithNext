import React, {useContext} from 'react';
import WidgetArea from "../components/widgetsArea/WidgetArea/WidgetArea";
import {getFirstLoadData, getStaticLoadData, getMultipleWidgetWithData} from "../_variables/ajaxVariables";
import {AppContext} from "../context/AppContext";

const Home = props => {
    const contextData = useContext(AppContext);

    return (
        <WidgetArea isMobile={props.isMobile}
                    key='home'
                    rendering={true}
                    widgets={(props.widgets || []).filter(widget => widget.data?.position === 'home')}
                    className='home-page main'
                    position='home'
                    stylesData={props?.design?.data?.homePageStyle || contextData.siteDesign.homePageStyle}
                    currentPageSidebar={props.identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                    postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
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
    const firstLoadData = await getFirstLoadData(context.req,['homePageLeftSidebar', 'homePageRightSidebar', 'home'],'homePage')
    // const widgetsData = await getMultipleWidgetWithData({widgets: ['homePageLeftSidebar', 'homePageRightSidebar', 'home']}, firstLoadData.domainName, true, 'homePage')
    // const widgets = [...(firstLoadData.widgets ?? []), ...(widgetsData?.data?.widgets ?? [])]
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

