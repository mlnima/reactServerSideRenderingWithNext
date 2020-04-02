import React, { useEffect, useState, useContext } from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import axios from "axios";
import { getComments, getPost } from "../../_variables/ajaxPostsVariables";
import Iframe from "../../components/includes/Post/Iframe/Iframe";
import PostInfo from "../../components/includes/Post/PostInfo/PostInfo";
import withRouter from "next/dist/client/with-router";
import PostSidebar from "../../components/includes/Post/PostSidebar/PostSidebar";
import Head from "next/head";
import { getSetting, getWidgetsWithData } from "../../_variables/ajaxVariables";
import { AppContext } from "../../context/AppContext";
import SiteSettingSetter from '../../components/includes/SiteSettingsSetter/SiteSettingsSetter'
import SideBar from '../../components/includes/Sidebar/Sidebar'
import CommentFrom from '../../components/includes/Post/CommentFrom/CommentFrom'
import CommentsRenderer from '../../components/includes/CommentsRenderer/CommentsRenderer'

const Post = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        style: {}
    })

    useEffect(() => {
        console.log(props)
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

    return (
        <>
            <AppLayout>
                <SiteSettingSetter { ...props }/>
                <RenderMeta/>
                <div className={ props.identity.postPageSidebar ? 'post withSidebar' : 'post withOutSidebar' }>

                    <div style={ state.style } className="main">
                        <Iframe iframeCode={ props.post.videoEmbedCode } meta={ {
                            description: props.post.description,
                            title: props.post.title,
                            duration: props.post.duration,
                            thumbnailUrl: props.post.mainThumbnail,
                            embedURL: props.post.videoEmbedCode,
                            uploadDate: props.post.lastModify,
                        } }/>

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
                        <CommentsRenderer comments={props.comments}/>
                        <CommentFrom documentId={ props.post._id }/>

                    </div>

                    {/*<PostSidebar isActive={props.identity.postPageSidebar}/>*/ }
                    <SideBar isActive={ props.identity.postPageSidebar } widgets={ props.widgets } position='postPageSidebar'/>
                </div>

            </AppLayout>
        </>
    );
};

Post.getInitialProps = async ({ pathname, query, req, res, err }) => {
    let post;
    let comments;
    let navigation;
    let identity;
    let widgets;

    const identityData = await getSetting('identity');
    const navigationData = await getSetting('navigation');
    const widgetsData = await getWidgetsWithData('postPageSidebar')
    const postBody = {
        postTitle: query.postTitle,
    };
    const postData = await axios.post('http://localhost:3000/api/v1/posts/post', postBody);

    post = postData.data.post

    const commentsData = await getComments({ onDocument: post._id })
    navigation = navigationData.data.setting ? navigationData.data.setting : {}
    identity = identityData.data.setting ? identityData.data.setting.data : {}
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    comments = commentsData.data.comments ? commentsData.data.comments : []
    return { post, query, navigation, identity, widgets, comments }
};

export default withRouter(Post);