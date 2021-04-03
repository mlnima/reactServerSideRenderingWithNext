import React, {useContext} from 'react';
import WidgetArea from "../components/widgetsArea/WidgetArea/WidgetArea";
import {getFirstLoadData, getMultipleWidgetWithData} from "../_variables/ajaxVariables";
import {AppContext} from "../context/AppContext";

const Home = props => {
    const contextData = useContext(AppContext);
    return (
        <WidgetArea isMobile={props.isMobile}
                    key='home'
                    rendering={true}
                    widgets={(props.widgets || []).filter(widget => widget.data.position === 'home')}
                    className='home-page main'
                    position='home'
                    stylesData={props?.design?.data?.homePageStyle||contextData.siteDesign.homePageStyle}
                    currentPageSidebar={props.identity?.data?.homePageSidebar||contextData.siteIdentity.homePageSidebar}
                    postElementSize={props.design?.data?.postElementSize||contextData.siteDesign.postElementSize}
        />
    );
};

export const getServerSideProps = async ({req}) => {
    const firstLoadData = await getFirstLoadData(req)
    const widgetsData = await getMultipleWidgetWithData({widgets: ['homePageSidebar', 'home']}, firstLoadData.domainName, true, 'homePage')
    const widgets = [...(firstLoadData.widgets ?? []), ...(widgetsData?.data?.widgets ?? [])]
    return {props: {widgets, ...firstLoadData.settings, isMobile: Boolean(firstLoadData.isMobile), referer: firstLoadData.referer, requestProtocol: req.protocol}}
}

//--------------------test for static page

//
// if (process.env.REACT_APP_STATIC_PAGES==='true'){
//     export const getStaticProps = async ({req}) =>{
//         //console.log('contect is :', context)
//         //const domainName = req ? await getAbsolutePath(req) : '';
//         const domainName = process.env.PRODUCTION_URL;
//         let widgets;
//         let settings;
//         const widgetsData = await getMultipleWidgetWithData({widgets: ['homePageSidebar', 'home', 'footer', 'header', 'topBar', 'navigation']}, domainName, true, 'homePage')
//         const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, 'homePage')
//         widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
//         settings = settingsData.data.settings ? settingsData.data.settings : [];
//         // let isMobile = (req
//         //     ? req.headers['user-agent']
//         //     : navigator.userAgent).match(
//         //     /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
//         // )
//
//         // return {props: {widgets, ...settings, isMobile: Boolean(isMobile), requestProtocol: req.protocol}}
//         return {props: {widgets, ...settings, isMobile: false}}
//     }
//
// }


export default Home;




