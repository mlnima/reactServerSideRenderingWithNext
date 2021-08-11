import {getComments, getPost} from "../../_variables/ajaxPostsVariables";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import Error from '../_error';
import PostPage from "../../components/includes/PostPage/PostPage";

const Post = ({responseCode, design, post, identity, comments, widgets}) => {
    if (responseCode !== 200) {
        return <Error responseCode={responseCode}/>
    } else return (
        <PostPage design={design} post={post} identity={identity} comments={comments} widgets={widgets}/>
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