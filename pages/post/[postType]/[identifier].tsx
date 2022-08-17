import {useEffect, useState} from "react";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
import styled from "styled-components";
import type {ReactElement} from 'react';
import AppLayout from "@components/layouts/AppLayout";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import fetchViewPost from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchViewPost";
import fetchPostComments from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPostComments";
import fetchPost from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPost";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import PromotionTypePostPage from "@components/includes/PostPage/PromotionTypePostPage/PromotionTypePostPage";

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

    const dispatch = useAppDispatch()

    const {postType, _id, status, role, sidebar} = useSelector(({posts, user, settings}: StoreTypes) => {
        return {
            postType: posts?.post?.postType,
            _id: posts?.post?._id,
            role: user?.userData?.role,
            status: posts?.post?.status,
            sidebar: settings?.identity?.postPageSidebar,

        }
    });

    useEffect(() => {
        _id && dispatch(fetchPostComments(_id as string));
        _id && dispatch(fetchViewPost(_id));
    }, [_id])


    if (status === 'published' || role === 'administrator') {
        return (
            <>
                {role === 'administrator' ? <EditLinkForAdmin/> : null}
                <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

                    {
                        postType === 'video' ? <VideoTypePostPage/> :
                            postType === 'learn' ? <LearnTypePostPage/> :
                                postType === 'promotion' ? <PromotionTypePostPage/> :
                                    <PostPage/>
                    }

                    <SidebarWidgetAreaRenderer sidebar={sidebar} position={'postPage'}/>
                </PageStyle>
            </>
        )
    } else {
        return <Soft404/>
    }


};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'postPageLeftSidebar',
            'postPageRightSidebar',
            'underPost'
        ],
        {
            page: 'postPage',
            setHeadData: false
        },
        store
    )

    //@ts-ignore
    // context.query?.identifier && await store.dispatch(getPost(context.query?.identifier as string, context.locale as string))

    !!context.query?.identifier && await store.dispatch(
        fetchPost({
            options: {
                page: 'postPage'
            },
            identifier: context?.query?.identifier as string,
            locale: context.locale
        })
    )

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

