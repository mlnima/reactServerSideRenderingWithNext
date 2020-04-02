import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from "../context/AppContext";
import AppLayout from "../components/layouts/AppLayout";
import Widget from "../components/includes/Widget/Widget";
import Posts from "../components/includes/Posts/Posts";
import withRouter from "next/dist/client/with-router";
import { getPosts } from "../_variables/ajaxPostsVariables";
import Head from "next/head";
import axios from "axios";
import { getSetting, getWidgets, getWidgetsWithData } from "../_variables/ajaxVariables";
import Text from '../components/includes/Widget/WidgetsModelsComponents/Text/Text'
import PaginationComponent from '../components/includes/PaginationComponent/PaginationComponent'
import SiteSettingSetter from '../components/includes/SiteSettingsSetter/SiteSettingsSetter'

import WidgetsRenderer from '../components/includes/WidgetsRenderer/WidgetsRenderer'
import SideBar from '../components/includes/SideBar/SideBar'
import H1Renderer from '../components/includes/H1Renderer/H1Renderer'

const Home = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        title: props.identity.title || '',
        themeColor: props.identity.themeColor || '',
        description: props.identity.description || '',
        keywords: props.identity.keywords || [],
        homePageH1: props.identity.homePageH1 || 'H1 element',
        style: {}
    });

    useEffect(() => {
        console.log(props)
        if (props.identity.homePageSidebar) {
            setState({
                style: {
                    gridArea: 'content'
                }
            })
        }
    }, [ props ]);

    return (
        <>
            <AppLayout>
                <SiteSettingSetter { ...props }/>
                <div style={ state.style } className={ props.identity.homePageSidebar ? 'content withSidebar' : 'content withOutSidebar' }>
                    <div className='HomePage'>
                        <H1Renderer text={ props.identity.homePageH1 }/>
                        <WidgetsRenderer widgets={ props.widgets } position='home'/>
                    </div>
                    <SideBar isActive={ props.identity.homePageSidebar } widgets={ props.widgets } position='homePageSidebar'/>
                </div>

            </AppLayout>
        </>
    );
};

Home.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let navigation;
    let identity;
    let widgets;

    try {
        const identityData = await getSetting('identity');
        const navigationData = await getSetting('navigation');
        const widgetsData = await getWidgetsWithData('all')

        identity = identityData.data.setting ? identityData.data.setting.data : {}
        navigation = navigationData.data.setting ? navigationData.data.setting : {}
        widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    } catch ( e ) {
        console.error(e)
    }
    return { identity, navigation, widgets }
};
export default withRouter(Home);


