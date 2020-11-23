import React, {useEffect, useState, useContext} from 'react';
import {AppContext} from "../context/AppContext";
import loadable from '@loadable/component';
import AppLayout from "../components/layouts/AppLayout";

const WidgetArea = loadable(() => import('../components/widgetsArea/WidgetArea/WidgetArea'))
import withRouter from "next/dist/client/with-router";
import {getMultipleSetting, getMultipleWidgetWithData} from "../_variables/ajaxVariables";
import SiteSettingSetter from '../components/includes/SiteSettingsSetter/SiteSettingsSetter'
import {getAbsolutePath} from '../_variables/_variables'
import {Sidebar} from '../components/includes/Sidebar/Sidebar'
import {Provider} from 'react-translated'


const Translations = {}

const Home = props => {
    const contextData = useContext(AppContext);
    const [deviceWidth, setDeviceWidth] = useState(1024)

    useEffect(() => {
        setDeviceWidth(window.innerWidth)
    }, []);

    useEffect(() => {
        console.log(props)
    }, [props]);

    return (
        <>
            <Provider language={contextData?.siteIdentity?.language || 'en'} translation={Translations}>
                <AppLayout>
                    <SiteSettingSetter {...props}/>
                    <div
                        className={props?.identity ? props?.identity?.data?.homePageSidebar ? 'content withSidebar' : 'content withOutSidebar' : 'content withOutSidebar'}>

                        <WidgetArea deviceWidth={deviceWidth} className='home-page' position='home' stylesData={contextData.siteDesign.homePageStyle}/>
                        <Sidebar key='homePageSidebar' isActive={props.identity.data.homePageSidebar}
                                 widgets={props.widgets} position='homePageSidebar'/>
                    </div>
                    <div>

                    </div>
                </AppLayout>
            </Provider>
        </>
    );
};


export const getServerSideProps = async ({req}) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    let widgets;
    let settings;
    const widgetsData = await getMultipleWidgetWithData({widgets: ['homePageSidebar', 'home', 'footer', 'header', 'topBar', 'navigation']}, domainName, true, 'homePage')
    const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, 'homePage')
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    settings = settingsData.data.settings ? settingsData.data.settings : []
    return {props: {widgets, ...settings, widgetsData: widgetsData.data}}
    // return {props: {domainName}}
}


export default withRouter(Home);


