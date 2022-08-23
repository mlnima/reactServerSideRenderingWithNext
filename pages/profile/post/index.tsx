import React, {useEffect, useMemo, useState} from 'react';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import styled from "styled-components";
import {wrapper} from "@store_toolkit/store";
import dynamic from "next/dynamic";
import FormData from 'form-data';
import {useRouter} from "next/router";
import CreateEditArticlePostField
    from "@components/includes/profilePageComponents/profilePost/CreateEditArticlePostField/CreateEditArticlePostField";
import TextInput from "@components/includes/profilePageComponents/profilePost/common/TextInput";
import MetaDataSelector from "@components/includes/profilePageComponents/profilePost/common/MetaDataSelector";
import ThumbnailUploader from "@components/includes/profilePageComponents/profilePost/common/ThumbnailUploader";
import VideoTypeFields from "@components/includes/profilePageComponents/profilePost/VideoTypeFields/VideoTypeFields";
import type {ReactElement} from 'react';
import AppLayout from "@components/layouts/AppLayout";
import {editPostField} from "@store_toolkit/clientReducers/postsReducer";
import fetchUserEditingPostUpdate
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchUserEditingPostUpdate";
import fetchUserEditingPost
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchUserEditingPost";
import fetchUserCreateNewPost
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchUserCreateNewPost";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import DynamicNoSSR from "@components/includes/WidgetsRenderer/DynamicNoSSR";


// const WidgetsRenderer = dynamic(() => import('../WidgetsRenderer/WidgetsRenderer'))

const ProfilePostPageStyledDiv = styled.div`
  margin: 20px auto;
  max-width: 946px;

  .create-new-post-fields {
    width: 100%;

    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin: 20px 5px;

    .description {
      min-height: 400px;
    }
  }

  @media only screen and (min-width: 768px) {
    .create-new-post-fields {
      width: 83.333%;
      margin: auto;
    }
  }

`
const post = () => {

    const dispatch = useAppDispatch();
    const {query} = useRouter();
    const router = useRouter();
    // const [editingPostImagesToUpload, setEditingPostImagesToUpload] = useState<any>(null)
    // const editingPostImagesToUpload = useMemo(()=>new FormData(),[])
    const postType = query?.postType;

    const postData = useSelector((store: StoreTypes) => {
        return {
            userData: store?.user.userData,
            editingPost: store?.posts?.editingPost,
            editingPostImagesToUpload: store?.posts?.editingPostImagesToUpload,
        }
    })

    // useEffect(() => {
    //     editingPostImagesToUpload = new FormData()
    // }, []);

    useEffect(() => {
        console.log(postData.editingPostImagesToUpload)
    }, [postData.editingPostImagesToUpload]);

    useEffect(() => {
        if (query.id) dispatch(fetchUserEditingPost(query.id as string));
        if (!query.id && query?.postType) dispatch(editPostField({['postType']: query.postType}));
    }, []);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(editPostField({[e.target.name]: e.target.value}))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (
            postData.editingPost._id &&
            (postData.userData?._id === postData.editingPost.author || postData.userData.role === 'administrator') &&
            query.id
        ) {
            dispatch(fetchUserEditingPostUpdate(postData.editingPost))
        } else if (!postData.editingPost._id) {
            dispatch(fetchUserCreateNewPost({
                data: {
                    ...postData.editingPost,
                    status: postData.userData.role === 'administrator' ? postData.editingPost.status || 'pending' : 'pending',
                    //@ts-ignore
                    author: postData.userData?._id
                },
                router
            }))
        }
    }

    const onMetaChangeHandler = (metas, type) => {
        dispatch(editPostField({[type]: metas}))
    }

    return (
        <DynamicNoSSR>
        <ProfilePostPageStyledDiv className='create-new-post main'>
            <form className={'create-new-post-fields'} onSubmit={e => onSubmitHandler(e)}>

                {postData.editingPost?.status ?
                    <label>Status: {postData.editingPost?.status}</label>
                    : null
                }
                {postData.editingPost?.author ?
                    //@ts-ignore
                    <label>Author: {postData.editingPost?.author?.username}</label>
                    : null
                }

                {postData.editingPost?.postType ?
                    <label>Post Type: {postData.editingPost?.postType}</label>
                    : null
                }

                <TextInput required={true} name={'title'} type={'text'} value={postData.editingPost?.title}
                           title={'Title'}
                           onChangeHandler={onChangeHandler}/>
                <TextInput required={true} name={'description'} type={'textarea'}
                           value={postData.editingPost?.description}
                           title={'Description'}
                           onChangeHandler={onChangeHandler} className={'description'}/>
                {postType === 'article' ?
                    <CreateEditArticlePostField onChangeHandler={onChangeHandler}/>
                    : null
                }

                <ThumbnailUploader mainThumbnail={postData?.editingPost?.mainThumbnail}
                                   images={postData?.editingPost?.images}
                                   editingPostImagesToUpload={postData?.editingPostImagesToUpload}
                                   // setEditingPostImagesToUpload={setEditingPostImagesToUpload}
                                   postId={postData.editingPost._id}/>

                {postData.userData.role === 'administrator' ?
                    <>
                        {/*<TextInput required={true} name={'mainThumbnail'} type={'text'}*/}
                        {/*           value={postData.editingPost?.mainThumbnail}*/}
                        {/*           title={'Main Thumbnail'}*/}
                        {/*           onChangeHandler={onChangeHandler} className={'mainThumbnail'}/>*/}
                        <TextInput required={true} name={'views'} type={'number'}
                                   value={postData.editingPost?.views}
                                   title={'views'}
                                   onChangeHandler={onChangeHandler} className={'views'}/>

                        <TextInput required={true} name={'likes'} type={'number'}
                                   value={postData.editingPost?.likes}
                                   title={'Likes'}
                                   onChangeHandler={onChangeHandler} className={'likes'}/>

                        <TextInput required={true} name={'disLikes'} type={'number'}
                                   value={postData.editingPost?.disLikes}
                                   title={'disLikes'}
                                   onChangeHandler={onChangeHandler} className={'disLikes'}/>

                    </>
                    : null
                }


                <label>Categories:</label>
                <MetaDataSelector type={'categories'}
                                  onMetaChangeHandler={onMetaChangeHandler}
                                  onChangeHandler={onChangeHandler}
                />
                <label>Tags:</label>
                <MetaDataSelector type={'tags'}
                                  onMetaChangeHandler={onMetaChangeHandler}
                                  onChangeHandler={onChangeHandler}
                />
                {postData.editingPost?.postType === 'video' ?
                    <>
                        <label>Actors:</label>
                        <MetaDataSelector type={'actors'}
                                          onMetaChangeHandler={onMetaChangeHandler}
                                          onChangeHandler={onChangeHandler}
                        />
                    </>
                    : null
                }

                {postData.editingPost?.postType === 'video' ?
                    <VideoTypeFields onChangeHandler={onChangeHandler}/>
                    : null
                }


                <button className={'btn btn-primary'} type={'submit'}>Save</button>
            </form>
            <aside>

            </aside>

        </ProfilePostPageStyledDiv>
        </DynamicNoSSR>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'profilePageRightSidebar',
            'profilePageLeftSidebar',
            'profilePage'
        ], {
            setHeadData: true,
            page: 'editPost'
        },
        store)

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }

})

post.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default post;
