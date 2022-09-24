import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from "react-redux";
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
import {editPostField, setEditingPostImagesToUpload} from "@store_toolkit/clientReducers/postsReducer";
import fetchUserEditingPostUpdate
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchUserEditingPostUpdate";
import fetchUserEditingPost
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchUserEditingPost";
import fetchUserCreateNewPost
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchUserCreateNewPost";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import DynamicNoSSR from "@components/includes/WidgetsRenderer/DynamicNoSSR";
import _postDataCleanerBeforeSave from "@_variables/clientAjaxVariables/_postDataCleanerBeforeSave";
import {Store} from "@_typeScriptTypes/storeTypes/Store";


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
    const finalPostDataToSave = new FormData()
    const postType = query?.postType;

    const {userData, editingPost} = useSelector((store: Store) => {
        return {
            userData: store?.user.userData,
            editingPost: store?.posts?.editingPost,
        }
    })

    // useEffect(() => {
    //     if (typeof window !=='undefined'){
    //         editingPostImagesToUpload = new FormData()
    //     }
    // }, []);

    useEffect(() => {
        if (query.id) dispatch(fetchUserEditingPost(query.id as string));
        if (!query.id && query?.postType) dispatch(editPostField({['postType']: query.postType}));
    }, []);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(editPostField({[e.target.name]: e.target.value}))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        finalPostDataToSave.append(
            'postData',
            JSON.stringify(_postDataCleanerBeforeSave(editingPost))
        )
        finalPostDataToSave.append('token',localStorage.wt)
        finalPostDataToSave.append('postId', editingPost._id)

        if (
            editingPost._id &&
            (userData?._id === editingPost.author || userData.role === 'administrator') &&
            query.id
        ) {

            dispatch(fetchUserEditingPostUpdate(finalPostDataToSave))
        } else if (!editingPost._id) {
            // dispatch(fetchUserCreateNewPost({
            //     data: {
            //         ...editingPost,
            //         status: userData.role === 'administrator' ? editingPost.status || 'pending' : 'pending',
            //         //@ts-ignore
            //         author: userData?._id
            //     },
            //     router
            // }))
        }
    }

    const onMetaChangeHandler = (metas, type) => {
        dispatch(editPostField({[type]: metas}))
    }

    const onSelectImagesHandler = (images) => {

        Object.entries(images).forEach(([key, value]) => {
            //@ts-ignore
            const fileNameSplit = value?.name?.split('.')
            const fileExtension = fileNameSplit[fileNameSplit.length -1]
            const currentAmountOfImages = editingPost?.images?.length || 0
            finalPostDataToSave.append(`image-${currentAmountOfImages + key}.${fileExtension}`, value)
        });

        // Object.keys(images).forEach((key)=> {
        //     editingPostImagesToUpload.append(`image-${key}`,images[key])
        // });

        // Object.entries(editingPostImagesToUpload).forEach(([key, value]) => {
        //     console.log(key, value);
        // });
        //
        // for (const pair of editingPostImagesToUpload.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        // }
    }

    return (
        <DynamicNoSSR>
            <ProfilePostPageStyledDiv className='create-new-post main'>
                <form className={'create-new-post-fields'} onSubmit={e => onSubmitHandler(e)}>

                    {editingPost?.status ?
                        <label>Status: {editingPost?.status}</label>
                        : null
                    }
                    {editingPost?.author ?
                        //@ts-ignore
                        <label>Author: {editingPost?.author?.username}</label>
                        : null
                    }

                    {editingPost?.postType ?
                        <label>Post Type: {editingPost?.postType}</label>
                        : null
                    }

                    <TextInput required={true} name={'title'} type={'text'} value={editingPost?.title}
                               title={'Title'}
                               onChangeHandler={onChangeHandler}/>
                    <TextInput required={true} name={'description'} type={'textarea'}
                               value={editingPost?.description}
                               title={'Description'}
                               onChangeHandler={onChangeHandler} className={'description'}/>
                    {postType === 'article' ?
                        <CreateEditArticlePostField onChangeHandler={onChangeHandler}/>
                        : null
                    }

                    <ThumbnailUploader mainThumbnail={editingPost?.mainThumbnail}
                                       images={editingPost?.images}
                                       finalPostDataToSave={finalPostDataToSave}
                                       onSelectImagesHandler={onSelectImagesHandler}
                                       postId={editingPost?._id}/>

                    {userData.role === 'administrator' ?
                        <>
                            <TextInput required={true} name={'mainThumbnail'} type={'text'}
                                       value={editingPost?.mainThumbnail}
                                       title={'Main Thumbnail'}
                                       onChangeHandler={onChangeHandler} className={'mainThumbnail'}/>
                            <TextInput required={true} name={'views'} type={'number'}
                                       value={editingPost?.views}
                                       title={'views'}
                                       onChangeHandler={onChangeHandler} className={'views'}/>

                            <TextInput required={true} name={'likes'} type={'number'}
                                       value={editingPost?.likes}
                                       title={'Likes'}
                                       onChangeHandler={onChangeHandler} className={'likes'}/>

                            <TextInput required={true} name={'disLikes'} type={'number'}
                                       value={editingPost?.disLikes}
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
                    {editingPost?.postType === 'video' ?
                        <>
                            <label>Actors:</label>
                            <MetaDataSelector type={'actors'}
                                              onMetaChangeHandler={onMetaChangeHandler}
                                              onChangeHandler={onChangeHandler}
                            />
                        </>
                        : null
                    }

                    {editingPost?.postType === 'video' ?
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

    return null
})

post.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default post;
