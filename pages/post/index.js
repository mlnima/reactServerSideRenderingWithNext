import React, {useEffect, useState, useContext} from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import axios from "axios";
import {getComments, getPost} from "../../_variables/ajaxPostsVariables";
import VideoPlayer from "../../components/includes/Post/VideoPlayer/VideoPlayer";
import PostInfo from "../../components/includes/Post/PostInfo/PostInfo";
import withRouter from "next/dist/client/with-router";
import Head from "next/head";
import {getSetting, getWidgetsWithData, getMultipleWidgetWithData, getMultipleSetting} from "../../_variables/ajaxVariables";
import {AppContext} from "../../context/AppContext";
import SiteSettingSetter from '../../components/includes/SiteSettingsSetter/SiteSettingsSetter'
import {Sidebar} from '../../components/includes/Sidebar/Sidebar'
import CommentFrom from '../../components/includes/Post/CommentFrom/CommentFrom'
import CommentsRenderer from '../../components/includes/CommentsRenderer/CommentsRenderer'
import Footer from '../../components/widgetsArea/Footer/Footer'
import {getAbsolutePath} from '../../_variables/_variables'
import Error from '../_error';
import dataDecoder from '../../server/tools/dataDecoder'
import SlideShow from '../../components/includes/Post/SlideShow/SlideShow'
import WidgetsRenderer from '../../components/includes/WidgetsRenderer/WidgetsRenderer'
import styled from "styled-components";
import PostMetaDataToSiteHead from "../../components/includes/Post/PostMetaDataToSiteHead/PostMetaDataToSiteHead";

let StyledDiv = styled.div`${props => props.stylesData}`

const Post = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        style: {},
        postPageStyle:'',
        editMode: false
    })

    useEffect(() => {
        if (props.identity.postPageSidebar) {
            setState({
                style: {
                    gridArea: 'content'
                }
            })
        }
        if (props.router) {
            if (props.router.query.mode === 'edit') {
                setState({
                    ...state,
                    editMode: true
                })
            } else {
                setState({
                    ...state,
                    editMode: false
                })
            }
        }
    }, [props]);


    useEffect(() => {
        if (props.design.data.postPageStyle){
            setState({
                ...state,
                postPageStyle:props.design.data.postPageStyle
            })
        }
    }, [props.design.data]);

    if (props.errorCode !== 200) {
        // return <Error { ...props } />
        return null
    } else return (
        <>
            <AppLayout>
                <SiteSettingSetter {...props}/>
                <PostMetaDataToSiteHead {...props}/>
                <StyledDiv stylesData={state.postPageStyle} className={props.identity.data.postPageSidebar ? 'post withSidebar' : 'post withOutSidebar'}>

                    <div  className="main">

                        <VideoPlayer {...props.post}/>
                        <SlideShow {...props.post}/>
                        <PostInfo
                            {...props}
                            title={props.post.title}
                            author={props.post.author}
                            description={props.post.description}
                            tags={props.post.tags}
                            actors={props.post.actors}
                            categories={props.post.categories}
                            id={props.post._id}
                            likes={props.post.likes}
                            disLikes={props.post.disLikes}
                            views={props.post.views}
                            videoEmbedCode={props.post.videoEmbedCode}
                            rating={props.post.rating}
                            editMode={state.editMode}
                            postType={props.post.postType}
                            price={props.post.price}
                            {...props.post}
                        />
                        <CommentsRenderer comments={props.comments}/>
                        <CommentFrom documentId={props.post._id} documentTitle={props.post.title}/>
                        <div className='under-post-widget-area'>
                            <WidgetsRenderer widgets={props.widgets} position='underPost'/>
                        </div>
                    </div>
                    <Sidebar key='postPageSidebar' isActive={props.identity.data.postPageSidebar} widgets={props.widgets} position='postPageSidebar'/>
                </StyledDiv>

            </AppLayout>
        </>
    );
};

Post.getInitialProps = async ({pathname, query, req, res, err}) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    const requestBody = {
        _id: query.id
    };

    let post;
    let widgets;
    let settings;
    let comments;
    let errorCode = 200

    const postData = await getPost(requestBody, domainName, true)
    post = postData.data.post

    const widgetsData = await getMultipleWidgetWithData({widgets: ['postPageSidebar', 'footer', 'header', 'underPost', 'topBar', 'navigation']}, domainName, true, 'postPage')
    const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, 'postPage')

    if (!post) {
        errorCode = 404
        // res.sendStatus(404)
    }
    const commentsData = post ? await getComments({onDocument: post._id}, domainName, true) : {}

    settings = settingsData.data.settings ? dataDecoder(settingsData.data.settings).finalObject : []
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    comments = post ? commentsData.data.comments : []

    return {post, query, widgets, comments, ...settings, errorCode}
};

export default withRouter(Post);