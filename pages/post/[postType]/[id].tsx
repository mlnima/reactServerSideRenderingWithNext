import {getFirstLoadData} from "../../../_variables/ajaxVariables";
import {getComments, getPost} from "../../../_variables/ajaxPostsVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "../../../store/store";
import * as types from "../../../store/types";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
import VideoTypePostPage from "../../../components/includes/PostPage/VideoTypePostPage/VideoTypePostPage";
const LearnTypePostPage = dynamic(() => import('../../../components/includes/PostPage/LearnTypePostPage/LearnTypePostPage'))
const PostPage = dynamic(() => import('../../../components/includes/PostPage/PostPage'))

const postPage = () => {
    const postType = useSelector((store: StoreTypes) => store?.posts?.post?.postType);

    if (postType === 'learn') {
        return (
            <LearnTypePostPage/>
        )
    }else if(postType === 'video'){
        return (
            <VideoTypePostPage/>
        );

    }else {
        return (
            <PostPage/>
        );
    }
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    if (!context.query?.id) {
        return {notFound: true}
    }
    // @ts-ignore
    if (!context.query?.id?.match(/^[0-9a-fA-F]{24}$/)) {
        return {notFound: true}
    }

    const firstLoadData = await getFirstLoadData(
        context.req,
        ['postPageLeftSidebar', 'postPageRightSidebar', 'underPost'],
        store,
        context.locale
    );


    const postData = await getPost({_id: context.query.id}, true)
    // @ts-ignore
    const post = postData?.data?.post;
    const commentsData = post ? await getComments({onDocument: post._id}, true) : {}
    // @ts-ignore
    const comments = commentsData?.data?.comments ? commentsData.data?.comments : []

    store.dispatch({
        type: types.GET_POST,
        payload: {
            post,
            comments,
        }
    })

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            ...firstLoadData,
            query: context.query
        }
    }

});


export default postPage;

