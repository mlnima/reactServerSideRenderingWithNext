import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from "../context/AppContext";
import AppLayout from "../components/layouts/AppLayout";
import withRouter from "next/dist/client/with-router";
import { getMultipleSetting, getMultipleWidgetWithData } from "../_variables/ajaxVariables";
import SiteSettingSetter from '../components/includes/SiteSettingsSetter/SiteSettingsSetter'
import { getAbsolutePath } from '../_variables/_variables'
import WidgetsRenderer from '../components/includes/WidgetsRenderer/WidgetsRenderer'
import { Sidebar } from '../components/includes/Sidebar/Sidebar'
import Footer from '../components/includes/Footer/Footer'
import dataDecoder from '../server/tools/dataDecoder'

const Home = props => {

    const [ state, setState ] = useState({
        style: {}
    });

    useEffect(() => {
        if (props.identity.data.homePageSidebar) {
            setState({
                style: {
                    gridArea: 'content'
                }
            })
        }
    }, [ props ]);

    // useEffect(() => {
    //     console.log(props)
    // }, [ props ]);

    return (
        <>
            <AppLayout>
                <SiteSettingSetter { ...props }/>
                <div style={ state.style } className={ props.identity.data.homePageSidebar ? 'content withSidebar' : 'content withOutSidebar' }>
                    <div className='HomePage'>
                        <WidgetsRenderer widgets={ props.widgets } position='home'/>
                    </div>
                    <Sidebar key='homePageSidebar' isActive={ props.identity.data.homePageSidebar } widgets={ props.widgets } position='homePageSidebar'/>
                </div>
                <Footer widgets={ props.widgets } position='footer'/>
            </AppLayout>
        </>
    );
};

Home.getInitialProps = async ({ req }) => {
    const domainName = req ? await getAbsolutePath(req) : ''

    let widgets;
    let settings;

    const widgetsData = await getMultipleWidgetWithData({ widgets: [ 'homePageSidebar', 'home', 'footer', 'header' ] }, true, domainName, 'homePage')
    const settingsData = await getMultipleSetting({ settings: [ 'identity', 'navigation', 'design' ] }, true, domainName, 'homePage')

    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    settings = settingsData.data.settings ? dataDecoder(settingsData.data.settings).finalObject : []
    return { widgets, ...settings,widgetsData:widgetsData.data}
};
export default withRouter(Home);


