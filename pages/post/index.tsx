import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getComments, getPost} from "../../_variables/ajaxPostsVariables";
import PostPage from "../../components/includes/PostPage/PostPage";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {wrapper} from "../../store/store";
import * as types from "../../store/types";
import {useSelector} from "react-redux";
import {settingsPropTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";

const postPage = ({widgets}: ClientPagesTypes) => {
    const settings = useSelector((state: settingsPropTypes) => state.settings);
    const post = useSelector((state: settingsPropTypes) => state.posts.post);
    const comments = useSelector((state: settingsPropTypes) => state.posts.comments);
    return (
        // @ts-ignore
        <PostPage design={settings.design} post={post} identity={settings.identity} comments={comments} widgets={widgets}/>
    );
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
        store
    );


    const postData = await getPost({_id: context.query.id}, true)
    const post = postData?.data?.post;
    // console.log(post)
    // @ts-ignore
    const commentsData = post ? await getComments({onDocument: post._id}, true) : {}
    // @ts-ignore
    const comments = post ? commentsData?.data?.comments : []

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

