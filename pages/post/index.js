import {getComments, getPost} from "../../_variables/ajaxPostsVariables";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import Error from '../_error';
import PostPage from "../../components/includes/PostPage/PostPage";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Post = ({responseCode, design, post, identity, comments, widgets}) => {
    if (responseCode !== 200) {
        return <Error responseCode={responseCode}/>
    } else return (
        <PostPage design={design} post={post} identity={identity} comments={comments} widgets={widgets}/>
    )
};


export const getServerSideProps = async (context) => {
    if (!context.query?.id){
        return { notFound: true}
    }
    if (!context.query?.id?.match(/^[0-9a-fA-F]{24}$/)){
        return {
            notFound: true
        }
    }
    const firstLoadData = await getFirstLoadData(context.req, ['postPageLeftSidebar', 'postPageRightSidebar', 'underPost'], 'postPage')
    let responseCode = 200
    const postData = await getPost({_id: context.query.id, title: context.query.title},  true)
    const post = postData?.data?.post;
    if (!post) {
        return {
            notFound: true
        }
    }
    const commentsData = post ? await getComments({onDocument: post._id}, true) : {}

    const comments = post ? commentsData?.data?.comments : []

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
            widgets:firstLoadData?.widgets || [],
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