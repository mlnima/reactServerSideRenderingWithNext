import React, {useEffect} from 'react';
import AppLayout from "../components/layouts/AppLayout";
import WidgetArea from "../components/widgetsArea/WidgetArea/WidgetArea";
import {getMultipleSetting, getMultipleWidgetWithData} from "../_variables/ajaxVariables";
import {getAbsolutePath} from '../_variables/_variables';


const Home = props => {

    return (
        <>

            <AppLayout {...props} sidebar={props.identity?.data?.homePageSidebar} sidebarPosition='homePageSidebar'>

                <WidgetArea isMobile={props.isMobile}
                            key='home'
                            rendering={true}
                            widgets={(props.widgets || []).filter(widget => widget.data.position === 'home')}
                            className='home-page main'
                            position='home'
                            stylesData={props?.design?.data?.homePageStyle}
                            currentPageSidebar={props.identity?.data?.homePageSidebar}
                />
            </AppLayout>
        </>
    );
};

export const getServerSideProps = async ({req}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let widgets;
    let settings;
    const widgetsData = await getMultipleWidgetWithData({widgets: ['homePageSidebar', 'home', 'footer', 'header', 'topBar', 'navigation']}, domainName, true, 'homePage')
    const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, 'homePage')
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    settings = settingsData.data.settings ? settingsData.data.settings : [];
    let isMobile = (req
        ? req.headers['user-agent']
        : navigator.userAgent).match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )

    return {props: {widgets, ...settings, isMobile: Boolean(isMobile), requestProtocol: req.protocol}}
}

export default Home;


// if( process.env.REACT_APP_STATIC_PAGES ==='true'){
//     export const getStaticProps=async(context)=> {
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
// }else{
//     export const getServerSideProps = async ({req}) => {
//         const domainName = req ? await getAbsolutePath(req) : '';
//         let widgets;
//         let settings;
//         const widgetsData = await getMultipleWidgetWithData({widgets: ['homePageSidebar', 'home', 'footer', 'header', 'topBar', 'navigation']}, domainName, true, 'homePage')
//         const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, 'homePage')
//         widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
//         settings = settingsData.data.settings ? settingsData.data.settings : [];
//         let isMobile = (req
//             ? req.headers['user-agent']
//             : navigator.userAgent).match(
//             /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
//         )
//
//         return {props: {widgets, ...settings, isMobile: Boolean(isMobile), requestProtocol: req.protocol}}
//     }
// }

