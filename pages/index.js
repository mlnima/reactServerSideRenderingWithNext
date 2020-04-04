import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from "../context/AppContext";
import AppLayout from "../components/layouts/AppLayout";
import Widget from "../components/includes/Widget/Widget";
import Posts from "../components/includes/Posts/Posts";
import withRouter from "next/dist/client/with-router";
import { getPosts } from "../_variables/ajaxPostsVariables";
import Head from "next/head";
import axios from "axios";
import { getSetting, getWidgets, getWidgetsWithData, getMultipleSetting, getMultipleWidgetWithData } from "../_variables/ajaxVariables";
import Text from '../components/includes/Widget/WidgetsModelsComponents/Text/Text'
import PaginationComponent from '../components/includes/PaginationComponent/PaginationComponent'
import SiteSettingSetter from '../components/includes/SiteSettingsSetter/SiteSettingsSetter'

import WidgetsRenderer from '../components/includes/WidgetsRenderer/WidgetsRenderer'
// import {sideBar} from '../components/includes/SideBar/SideBar'
import {Sidebar} from '../components/includes/Sidebar/Sidebar'
import H1Renderer from '../components/includes/H1Renderer/H1Renderer'
import Footer from '../components/includes/Footer/Footer'

const Home = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({

        style: {}
    });

    useEffect(() => {
        console.log(props)
        if (props.identity.data.homePageSidebar) {
            setState({
                style: {
                    gridArea: 'content'
                }
            })
        }
    }, [ props ]);

    useEffect(() => {


    }, []);
    return (
        <>
            <AppLayout>
                <SiteSettingSetter { ...props }/>
                <div style={ state.style } className={ props.identity.data.homePageSidebar ? 'content withSidebar' : 'content withOutSidebar' }>
                    <div className='HomePage'>
                        <H1Renderer text={ props.identity.data.homePageH1 }/>
                        <WidgetsRenderer widgets={ props.widgets } position='home'/>
                    </div>
                    <Sidebar key='homePageSidebar' isActive={ props.identity.data.homePageSidebar } widgets={ props.widgets } position='homePageSidebar'/>
                </div>
                <Footer widgets={ props.widgets } position='footer'/>

            </AppLayout>
        </>
    );
};

Home.getInitialProps = async ({ pathname, query, req, res, err }) => {

    let widgets;
    let settings;

    const widgetsData = await getMultipleWidgetWithData({ widgets: [ 'homePageSidebar', 'home', 'footer' ] }, true)
    const settingsData = await getMultipleSetting({ settings: [ 'identity', 'navigation', 'design' ] }, true)

    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    settings = settingsData.data.settings ? settingsData.data.settings : []
    return {  widgets, ...settings }
};
export default withRouter(Home);


