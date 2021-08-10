import {useEffect, useState, useContext} from 'react';
import {getComments, getPost} from "../../_variables/ajaxPostsVariables";
import VideoPlayer from "../../components/includes/PostPage/components/VideoPlayer/VideoPlayer";
import PostInfo from "../../components/includes/Post/PostInfo/PostInfo";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import CommentFrom from '../../components/includes/PostPage/components/CommentFrom/CommentFrom'
import CommentsRenderer from '../../components/includes/PostPage/components/CommentsRenderer/CommentsRenderer'
import Error from '../_error';
import SlideShow from '../../components/includes/PostPage/components/SlideShow/SlideShow'
import WidgetsRenderer from '../../components/includes/WidgetsRenderer/WidgetsRenderer'
import styled from "styled-components";
import PostMetaDataToSiteHead from "../../components/includes/PostPage/components/PostMetaDataToSiteHead/PostMetaDataToSiteHead";
import {AppContext} from "../../context/AppContext";
import PostPage from "../../components/includes/PostPage/PostPage";

let StyledMain = styled.main`
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  #download-url {
    width: 100%;
    margin: 20px 0;
    .download-link {
      color: white;
      padding: 10px;
      text-align: center;
      border-radius: 5px;
      margin: 10px;
    }
  }
  .under-post-widget-area {
    width: 100%;
  }
${props => props.stylesData}
`

const Post = ({responseCode, design, post, identity, comments, widgets}) => {
    if (responseCode !== 200) {
        return <Error responseCode={responseCode}/>
    }  else return (
        <PostPage design={design} post={post} identity={identity} comments={comments} widgets={widgets} />
    )
};


export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['postPageLeftSidebar', 'postPageRightSidebar', 'underPost'], 'postPage')
    let responseCode = 200
    const postData = await getPost({_id: context.query.id, title: context.query.title}, firstLoadData.domainName, true)
    const post = postData?.data?.post;
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
            widgets,
            ...firstLoadData.settings,
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