import React, {useEffect, useState, useContext} from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import {getComments, getPost} from "../../_variables/ajaxPostsVariables";
import VideoPlayer from "../../components/includes/Post/VideoPlayer/VideoPlayer";
import PostInfo from "../../components/includes/Post/PostInfo/PostInfo";
import {getMultipleWidgetWithData, getMultipleSetting, getFirstLoadData} from "../../_variables/ajaxVariables";
import CommentFrom from '../../components/includes/Post/CommentFrom/CommentFrom'
import CommentsRenderer from '../../components/includes/CommentsRenderer/CommentsRenderer'
import {getAbsolutePath} from '../../_variables/_variables'
import Error from '../_error';
import SlideShow from '../../components/includes/Post/SlideShow/SlideShow'
import WidgetsRenderer from '../../components/includes/WidgetsRenderer/WidgetsRenderer'
import styled from "styled-components";
import PostMetaDataToSiteHead from "../../components/includes/Post/PostMetaDataToSiteHead/PostMetaDataToSiteHead";
import {AppContext} from "../../context/AppContext";

let StyledDiv = styled.div`${props => props.stylesData}`

const Post = props => {
    const contextData = useContext(AppContext);

    const [deviceWidth, setDeviceWidth] = useState(null)


    useEffect(() => {
        if (typeof window !== 'undefined') {
            setDeviceWidth(window.innerWidth)
        }
    }, []);

    if (props.responseCode !== 200) {
        return <Error responseCode={props.responseCode}/>
    } else return (
        <>
            <PostMetaDataToSiteHead {...props}/>
            <StyledDiv stylesData={props.design?.data?.postPageStyle || contextData.siteDesign.postPageStyle || ''} className='main post-page'>
                <VideoPlayer {...props.post}/>
                <SlideShow {...props.post} sidebar={props?.identity?.data?.postPageSidebar} deviceWidth={deviceWidth}/>
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
                    postType={props.post.postType}
                    price={props.post.price}
                    {...props.post}
                />
                {props.comments.length > 0 ? <CommentsRenderer comments={props.comments}/> : null}
                <CommentFrom documentId={props.post._id} documentTitle={props.post.title}/>
                {(props.widgets || []).filter(widget => widget.data.position === 'underPost').length > 0 ?
                    <div className='under-post-widget-area'>
                        <WidgetsRenderer deviceWidth={deviceWidth}
                                         widgets={(props.widgets || []).filter(widget => widget.data.position === 'underPost')}
                                         position='underPost'
                                         postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}/>
                    </div> : null}

            </StyledDiv>
        </>
    );
};


export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req,['postPageLeftSidebar', 'postPageRightSidebar', 'underPost'],'postPage')
    let responseCode = 200
    const postData = await getPost({_id: context.query.id}, firstLoadData.domainName, true)
    const post = postData.data.post;
    // const widgetsData = (!firstLoadData.isSameOrigin && !firstLoadData.isNavigatedFromPostPage) || (firstLoadData.isSameOrigin && !firstLoadData.isNavigatedFromPostPage) ? await getMultipleWidgetWithData({widgets: ['postPageLeftSidebar', 'postPageRightSidebar', 'underPost',]}, firstLoadData.domainName, true, 'postPage') : []
    if (!post) {
        return {
            notFound: true
        }
    }
    const commentsData = post ? await getComments({onDocument: post._id}, firstLoadData.domainName, true) : {}
    const widgets = firstLoadData.widgets
    const comments = post ? commentsData?.data?.comments : []

    return {
        props: {
            widgets, ...firstLoadData.settings,
            post: post || responseCode,
            query: context.query,
            isMobile: Boolean(firstLoadData.isMobile),
            comments,
            referer: firstLoadData.referer,
            responseCode
        }
    }
}


export default Post;