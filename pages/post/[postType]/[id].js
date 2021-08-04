import {useEffect, useState, useContext} from 'react';
import {getComments, getPost} from "../../../_variables/ajaxPostsVariables";
import VideoPlayer from "../../../components/includes/Post/VideoPlayer/VideoPlayer";
import PostInfo from "../../../components/includes/Post/PostInfo/PostInfo";
import {getFirstLoadData} from "../../../_variables/ajaxVariables";
import CommentFrom from '../../../components/includes/Post/CommentFrom/CommentFrom'
import CommentsRenderer from '../../../components/includes/CommentsRenderer/CommentsRenderer'
import Error from '../../_error';
import SlideShow from '../../../components/includes/Post/SlideShow/SlideShow'
import WidgetsRenderer from '../../../components/includes/WidgetsRenderer/WidgetsRenderer'
import styled from "styled-components";
import PostMetaDataToSiteHead from "../../../components/includes/Post/PostMetaDataToSiteHead/PostMetaDataToSiteHead";
import {AppContext} from "../../../context/AppContext";
import Post from "../index";
import PostPagePromotionType from "../../../components/includes/postPageComponents/PostPagePromotionType/PostPagePromotionType";
import EditLinkForAdmin from "../../../components/includes/Post/PostInfo/EditLinkForAdmin/EditLinkForAdmin";
import PostDescription from "../../../components/includes/Post/PostInfo/PostDescription/PostDescription";

let StyledMain = styled.main`

${props => props.stylesData}
`

const postPage = ({responseCode, design, post, identity, comments, widgets}) => {
    const contextData = useContext(AppContext);
    const [deviceWidth, setDeviceWidth] = useState(null)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setDeviceWidth(window.innerWidth)
        }
    }, []);

    if (responseCode !== 200) {
        return <Error responseCode={responseCode}/>
    }  else return (
            <StyledMain stylesData={design?.data?.postPageStyle || contextData.siteDesign.postPageStyle || ''} className='main post-page'>

            <style jsx>{`
                .post-page{
                    justify-self: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    width: 100%;
                }
            `}</style>

                <EditLinkForAdmin _id={post._id}/>
                <PostMetaDataToSiteHead {...post}/>
                {
                    post.postType === 'video' ?
                        <VideoPlayer
                            title={post.title}
                            description={post.description}
                            duration={post.duration}
                            mainThumbnail={post.mainThumbnail}
                            videoEmbedCode={post.videoEmbedCode}
                            lastModify={post.lastModify}
                            videoUrl={post.videoUrl}
                            _id={post._id}
                            videoScriptCode={post.videoScriptCode}
                        /> :
                        null
                }
                {
                    post.postType === 'product' ?
                        <SlideShow
                            images={post.images}
                            mainThumbnail={post.mainThumbnail}
                            sidebar={identity?.data?.postPageSidebar}
                            deviceWidth={deviceWidth}
                        /> :
                        null
                }
                {/*{post.postType === 'promotion' ?<PostDescription  description={post.description} translations={post.translations}/> :null}*/}




                <PostInfo {...post} rating='enable'/>
                {comments?.length > 0 ? <CommentsRenderer comments={comments}/> : null}
                <CommentFrom documentId={post._id} documentTitle={post.title}/>
                {(widgets || []).filter(widget => widget.data.position === 'underPost').length > 0 ?
                    <div className='under-post-widget-area'>
                        <WidgetsRenderer deviceWidth={deviceWidth}
                                         widgets={(widgets || []).filter(widget => widget.data.position === 'underPost')}
                                         position='underPost'
                                         postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}/>
                    </div> : null}

            </StyledMain>
    );
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


export default postPage;


// else if(post.postType === 'promotion'){
//
//     return (
//         <PostPagePromotionType post={post} />
//     )
// }