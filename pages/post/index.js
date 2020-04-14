import React, { useEffect, useState, useContext } from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import axios from "axios";
import { getComments, getPost } from "../../_variables/ajaxPostsVariables";
import VideoPlayer from "../../components/includes/Post/VideoPlayer/VideoPlayer";
import PostInfo from "../../components/includes/Post/PostInfo/PostInfo";
import withRouter from "next/dist/client/with-router";
import Head from "next/head";
import { getSetting, getWidgetsWithData, getMultipleWidgetWithData, getMultipleSetting } from "../../_variables/ajaxVariables";
import { AppContext } from "../../context/AppContext";
import SiteSettingSetter from '../../components/includes/SiteSettingsSetter/SiteSettingsSetter'
import { Sidebar } from '../../components/includes/Sidebar/Sidebar'
import CommentFrom from '../../components/includes/Post/CommentFrom/CommentFrom'
import CommentsRenderer from '../../components/includes/CommentsRenderer/CommentsRenderer'
import Footer from '../../components/includes/Footer/Footer'
import { getAbsolutePath } from '../../_variables/_variables'
import Error from '../_error';
import dataDecoder from '../../server/tools/dataDecoder'

const Post = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        style: {}
    })

    useEffect(() => {
        console.log(props)
    }, [ props ]);

    useEffect(() => {
        if (props.identity.postPageSidebar) {
            setState({
                style: {
                    gridArea: 'content'
                }
            })
        }
    }, [ props ]);

    const RenderMeta = () => {
        if (props.post.title) {
            return (
                <Head>
                    <title>{ props.post.title }</title>
                    <meta name="description" content={ props.post.description }/>
                    <meta name="keywords" content={ [ ...props.post.tags, ...props.post.categories, ...props.post.actors ] }/>
                    <meta property="og:title" content={ props.post.title }/>
                    <meta property="og:type" content={ props.post.postType === 'video' ? props.post.postType + '.' + 'movies' : props.post.postType }/>
                    {/*url should define*/ }
                    <meta property="og:url" content={ props.post.videoEmbedCode }/>
                    <meta property="og:image" content={ props.post.mainThumbnail }/>
                </Head>
            )
        } else return null
    }

    if (props.errorCode !== 200) {
        return <Error { ...props } />
    } else return (
        <>
            <AppLayout>
                <SiteSettingSetter { ...props }/>
                <RenderMeta/>
                <div className={ props.identity.data.postPageSidebar ? 'post withSidebar' : 'post withOutSidebar' }>

                    <div style={ state.style } className="main">

                        <VideoPlayer { ...props.post }/>

                        <PostInfo
                            title={ props.post.title }
                            description={ props.post.description }
                            tags={ props.post.tags }
                            actors={ props.post.actors }
                            categories={ props.post.categories }
                            id={ props.post._id }
                            likes={ props.post.likes }
                            disLikes={ props.post.disLikes }
                            views={ props.post.views }
                            videoEmbedCode={ props.post.videoEmbedCode }
                        />
                        <CommentsRenderer comments={ props.comments }/>
                        <CommentFrom documentId={ props.post._id }/>

                    </div>

                    <Sidebar key='postPageSidebar' isActive={ props.identity.data.postPageSidebar } widgets={ props.widgets } position='postPageSidebar'/>
                </div>
                <Footer widgets={ props.widgets } position='footer'/>
            </AppLayout>
        </>
    );
};

Post.getInitialProps = async ({ pathname, query, req, res, err }) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    const postBody = {
        postTitle: query.postTitle,
    };

    let post;
    let widgets;
    let settings;
    let comments;
    let errorCode = 200

    const postData = await getPost(postBody, true, domainName)
    post = dataDecoder(postData.data.post).post
    const widgetsData = await getMultipleWidgetWithData({ widgets: [ 'postPageSidebar', 'footer', 'header' ] }, true, domainName)
    const settingsData = await getMultipleSetting({ settings: [ 'identity', 'navigation', 'design' ] }, true, domainName)

    if (!post) {
        errorCode = 404
        // res.sendStatus(404)
    }
    const commentsData = post ? await getComments({ onDocument: post._id }, true, domainName) : {}

    settings = settingsData.data.settings ? dataDecoder(settingsData.data.settings).finalObject  : []
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    comments = post ? commentsData.data.comments : []

    return { post, query, widgets, comments, ...settings, errorCode }
};

export default withRouter(Post);