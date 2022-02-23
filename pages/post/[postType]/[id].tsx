import {getFirstLoadData} from "@_variables/ajaxVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
import {getPost} from "@store/clientActions/postsAction";
import Error from 'next/error'
const LearnTypePostPage = dynamic(() => import('@components/includes/PostPage/LearnTypePostPage/LearnTypePostPage'))
const VideoTypePostPage = dynamic(() => import('@components/includes/PostPage/VideoTypePostPage/VideoTypePostPage'))
const PostPage = dynamic(() => import('@components/includes/PostPage/PostPage'))

const postPage = () => {
    const postType = useSelector((store: StoreTypes) => store?.posts?.post?.postType);
    if (!postType) return <Error statusCode={404}/>
    else if (postType === 'learn') return <LearnTypePostPage/>
    else if (postType === 'video') return <VideoTypePostPage/>
    else return <PostPage/>
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    if (!context.query?.id) {
        return {notFound: true}
    }
    await getFirstLoadData(
        context.req,
        ['postPageLeftSidebar', 'postPageRightSidebar', 'underPost'],
        store,
        context.locale
    );

    // @ts-ignore
    await store.dispatch(getPost(context.query?.id))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            query: context.query
        }
    }
});


export default postPage;

