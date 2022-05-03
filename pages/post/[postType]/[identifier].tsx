import {useEffect} from "react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store/store";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
import {getComments, getPost, viewPost} from "@store/clientActions/postsAction";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";
import styled from "styled-components";
import type {ReactElement} from 'react';
import AppLayout from "@components/layouts/AppLayout";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";

const Soft404 = dynamic(() =>
    import('@components/includes/Soft404/Soft404'))
const EditLinkForAdmin = dynamic(() =>
    import('@components/includes/PostPage/components/EditLinkForAdmin/EditLinkForAdmin'))

const LearnTypePostPage = dynamic(() =>
    import('@components/includes/PostPage/LearnTypePostPage/LearnTypePostPage'))
const VideoTypePostPage = dynamic(() =>
    import('@components/includes/PostPage/VideoTypePostPage/VideoTypePostPage'))
const PostPage = dynamic(() => import('@components/includes/PostPage/PostPage'))


const PageStyle = styled.div`
  
  
`

const postPage = () => {

    const dispatch = useDispatch()

    const {postType, _id, status, role, sidebar} = useSelector(({posts, user, settings}: StoreTypes) => {

        return {
            postType: posts?.post?.postType,
            _id: posts?.post?._id,
            role: user?.userData?.role,
            status: posts?.post?.status,
            sidebar: settings?.identity?.postPageSidebar,
            //sidebar: undefined,

        }
    });


    useEffect(() => {
        _id && dispatch(getComments(_id as string));
        _id && dispatch(viewPost(_id));
    }, [])

    return (
        <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
            {role === 'administrator' ? <EditLinkForAdmin/> : null}
            {((status === 'published' || role === 'administrator') && postType === 'video') && <VideoTypePostPage/>}
            {((status === 'published' || role === 'administrator') && postType === 'learn') && <LearnTypePostPage/>}
            {((status === 'published' || role === 'administrator') && postType !== 'learn' && postType !== 'video') &&
            <PostPage/>}
            {(status !== 'published' && role !== 'administrator') && <Soft404/>}
            {!status && <Soft404/>}
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'postPage'}/>
        </PageStyle>
    )


};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await store.dispatch(getDefaultPageData(
        context,
        [
            'postPageLeftSidebar',
            'postPageRightSidebar',
            'underPost'
        ],
        null,
        store
    ))

    //@ts-ignore
    context.query?.identifier && await store.dispatch(getPost(context.query?.identifier as string, context.locale as string))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
});

postPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default postPage;

