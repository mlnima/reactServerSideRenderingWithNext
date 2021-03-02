import React, {useEffect, useState, useContext} from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import {getComments, getPost} from "../../_variables/ajaxPostsVariables";
import VideoPlayer from "../../components/includes/Post/VideoPlayer/VideoPlayer";
import PostInfo from "../../components/includes/Post/PostInfo/PostInfo";
import withRouter from "next/dist/client/with-router";
import { getMultipleWidgetWithData, getMultipleSetting} from "../../_variables/ajaxVariables";
import CommentFrom from '../../components/includes/Post/CommentFrom/CommentFrom'
import CommentsRenderer from '../../components/includes/CommentsRenderer/CommentsRenderer'
import {getAbsolutePath} from '../../_variables/_variables'
import Error from '../_error';
import SlideShow from '../../components/includes/Post/SlideShow/SlideShow'
import WidgetsRenderer from '../../components/includes/WidgetsRenderer/WidgetsRenderer'
import styled from "styled-components";
import PostMetaDataToSiteHead from "../../components/includes/Post/PostMetaDataToSiteHead/PostMetaDataToSiteHead";
let StyledDiv = styled.div`${props => props.stylesData}`

const Post = props => {
    const [state, setState] = useState({
        style: {},
        postPageStyle:'',
        editMode: false
    })
    const [deviceWidth,setDeviceWidth] = useState(null)

    useEffect(() => {
        setDeviceWidth(window.innerWidth)
    }, []);

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




    if (props.errorCode !== 200) {
        return <Error { ...props } />
    } else return (
            <AppLayout {...props} sidebar={props.identity?.data?.postPageSidebar} sidebarPosition='postPageSidebar' >
                <PostMetaDataToSiteHead {...props}/>
                <StyledDiv stylesData={ props.design.data.postPageStyle} className='main post-page' >
                        <VideoPlayer {...props.post}/>
                        <SlideShow {...props.post} sidebar={props.identity.data.postPageSidebar} deviceWidth={deviceWidth}/>
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
                            <WidgetsRenderer deviceWidth={deviceWidth} widgets={(props.widgets || []).filter(widget => widget.data.position === 'underPost')} position='underPost'/>
                    </div>
                </StyledDiv>
            </AppLayout>

    );
};



export const getServerSideProps = async ({req,query}) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    const requestBody = {_id: query.id};
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
    }
    const commentsData = post ? await getComments({onDocument: post._id}, domainName, true) : {}
    let isMobile = (req
        ? req.headers['user-agent']
        : navigator.userAgent).match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )



    settings = settingsData.data.settings ?? []
    widgets =  widgetsData.data.widgets ?? []
    comments = post ? commentsData.data.comments : []

    return {props:{post:post||errorCode, query,isMobile: Boolean(isMobile), widgets, comments, ...settings, errorCode}}

}




export default withRouter(Post);