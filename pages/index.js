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

const Home = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        title: props.identity.title || '',
        themeColor: props.identity.themeColor || '',
        description: props.identity.description || '',
        keywords: props.identity.keywords || [],
        homePageH1: props.identity.homePageH1 || 'H1 element'
    });

    // useEffect(() => {
    //     if (props.navigation) {
    //         contextData.dispatchNavigationData(props.navigation.data)
    //     }
    //     if (props.identity) {
    //         contextData.dispatchSiteIdentity(siteIdentity => ({
    //             ...siteIdentity,
    //             ...props.identity
    //         }))
    //     }
    // }, [ props ]);

    useEffect(() => {
        console.log(props )
    }, [props]);

    const renderWidgets = props.widgets.map(widget => {
        switch ( widget.type ) {
            case 'posts':
                return (
                    <Widget key={ widget._id } propsKey={ widget._id } text={ widget.text } textAlign={ widget.textAlign } component={ Posts } posts={ widget.posts } title={ widget.title } redirectLink={ widget.redirectLink } redirectToTitle={ widget.redirectToTitle }
                            pagination={ widget.pagination }/>
                )
                break
            case 'text':
                return (
                    <Widget key={ widget._id } propsKey={ widget._id } text={ widget.text } textAlign={ widget.textAlign } title={ widget.title } mainLinkUrl='/posts/' redirectToTitle='More videos'/>
                )
                break
            default:
                break

        }

    })


    return (
        <AppLayout>
            <SiteSettingSetter { ...props }/>
            <div className='HomePage'>
                <h1>{ state.homePageH1 }</h1>
                { renderWidgets }
            </div>
        </AppLayout>
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


