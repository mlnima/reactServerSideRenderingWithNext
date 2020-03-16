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

const Home = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        title: props.identity.title || '',
        themeColor: props.identity.themeColor || '',
        description: props.identity.description || '',
        keywords: props.identity.keywords || [],
        homePageH1: props.identity.homePageH1 || 'H1 element'
    });

    useEffect(() => {
        if (props.navigation) {
            contextData.dispatchNavigationData(props.navigation.data)
        }
        if (props.identity) {
            contextData.dispatchSiteIdentity(siteIdentity => ({
                ...siteIdentity,
                ...props.identity
            }))
        }
    }, [ props ]);

    useEffect(() => {
        console.log(props)
    }, [ props ]);




    const renderWidgets =props.widgets.map(widget=>{
        switch (widget.type ) {
            case 'posts':
                return(
                    <Widget key={widget._id}  text={ widget.text } textAlign={widget.textAlign} component={ Posts } posts={ widget.posts } title={widget.title} mainLinkUrl={widget.redirectLink} redirectToTitle='More Posts' pagination={ true }/>
                )
                break
            case 'text':
                return(
                    <Widget key={widget._id}   text={ widget.text } textAlign={widget.textAlign} title={widget.title} mainLinkUrl='/posts/' redirectToTitle='More videos' />
                )
                break
            default:
                break

        }

    })


    return (
        <AppLayout>
            <Head>
                <title>{ state.title }</title>
                <meta name="theme-color" content={ state.themeColor }/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
                <meta name="description" content={ state.description }/>
                <meta name="keywords" content={ state.keywords }/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className='HomePage'>
                <h1>{ state.homePageH1 }</h1>
                {renderWidgets}
                {/*<Widget component={ Posts } posts={ props.posts } title='latest video' mainLinkUrl='/posts/' redirectToTitle='More videos' pagination={ true } contextData={ contextData }/>*/}
                {/*<Posts posts={props.posts} />*/ }
            </div>
        </AppLayout>
    );
};

Home.getInitialProps = async ({ pathname, query, req, res, err }) => {
    // let posts;
    let navigation;
    let identity;
    let widgets ;
    let data = {
        pageNo: query.pageNo ? parseInt(query.pageNo) : 1,
        size: 30,
        totalPosts: 0,
        postType: 'all',
        keyword: '',
        status: 'published',
        author: 'all',
        fields: [ 'title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration' ],
        checkedPosts: [],
    };

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
    return {  identity, navigation,widgets }
};
export default withRouter(Home);


