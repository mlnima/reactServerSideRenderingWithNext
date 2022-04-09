import {FC, useEffect} from "react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store/store";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
import {getComments, getPost, viewPost} from "@store/clientActions/postsAction";
import {useRouter} from "next/router";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";
import isValidObjectId from '@_variables/util/mongoIdValidator'
import Soft404 from "@components/includes/Soft404/Soft404";
import EditLinkForAdmin from "@components/includes/PostPage/components/EditLinkForAdmin/EditLinkForAdmin";
const LearnTypePostPage = dynamic(() =>
    import('@components/includes/PostPage/LearnTypePostPage/LearnTypePostPage'))
const VideoTypePostPage = dynamic(() =>
    import('@components/includes/PostPage/VideoTypePostPage/VideoTypePostPage'))

const PostPage = dynamic(() => import('@components/includes/PostPage/PostPage'))

const postPage:FC = () => {
    const {query} = useRouter()
    const dispatch = useDispatch()

    const {postType, _id,status,role} = useSelector(({posts,user}: StoreTypes) => {
        return {
            postType: posts?.post?.postType,
            _id: posts?.post?._id,
            role: user?.userData?.role,
            status: posts?.post?.status,
        }
    });


    useEffect(() => {
        dispatch(getComments(query.id as string))
        dispatch(viewPost(_id))
    }, [])

return (
    <>
        {role === 'administrator' ? <EditLinkForAdmin/> : null}
        {
            status !== 'published' || !_id ?  <Soft404/> :
                postType === 'learn' ? <LearnTypePostPage/> :
                    postType === 'video' ? <VideoTypePostPage/> :
                        <PostPage/>

        }
    </>
)


};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    if (!isValidObjectId(context.query?.id))return {notFound: true}

    // @ts-ignore
    await store.dispatch(getDefaultPageData(
        context,
        [
            'postPageLeftSidebar',
            'postPageRightSidebar',
            'underPost'
        ]
    ))

//@ts-ignore
    await store.dispatch(getPost(context.query?.id as string, context.locale as string))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
});


export default postPage;

