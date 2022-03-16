import React, {FC, useEffect, useMemo, useState} from 'react';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch, useSelector} from "react-redux";
//import {setLoginRegisterFormStatus} from "@store/clientActions/globalStateActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import styled from "styled-components";
import {wrapper} from "@store/store";
import {useRouter} from "next/router";
import CreateEditArticlePostField
    from "@components/includes/profilePageComponents/profilePost/CreateEditArticlePostField/CreateEditArticlePostField";
import {editPostField, getEditingPost, userCreateNewPost, userUpdatePost} from "@store/clientActions/postsAction";
import TextInput from "@components/includes/profilePageComponents/profilePost/common/TextInput";
import MetaDataSelector from "@components/includes/profilePageComponents/profilePost/common/MetaDataSelector";
import Dropzone from 'react-dropzone'
import ThumbnailUploader from "@components/includes/profilePageComponents/profilePost/common/ThumbnailUploader";
import VideoTypeFields from "@components/includes/profilePageComponents/profilePost/VideoTypeFields/VideoTypeFields";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";

const ProfilePostPageStyledDiv = styled.div`
  margin: 20px 5px;

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
const post: FC = () => {

    const dispatch = useDispatch();
    const {query} = useRouter();
    const router = useRouter();
    const postType = query?.postType;

    const postData = useSelector((store: StoreTypes) => {
        return {
            userData: store?.user.userData,
            editingPost: store?.posts?.editingPost,
        }
    })

    useEffect(() => {
        if (query.id) dispatch(getEditingPost(query.id as string));
        if (!query.id && query.postType) dispatch(editPostField({['postType']: query.postType}));
    }, []);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(editPostField({[e.target.name]: e.target.value}))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (
            postData.editingPost._id &&
            (postData.userData?._id === postData.editingPost.author?._id || postData.userData.role === 'administrator') &&
            query.id
        ) {
            dispatch(userUpdatePost(postData.editingPost))
        } else if (!postData.editingPost._id) {
            dispatch(userCreateNewPost({
                ...postData.editingPost,
                status: postData.userData.role === 'administrator' ? postData.editingPost.status || 'pending' : 'pending',
                //@ts-ignore
                author: postData.userData?._id
            }, router))
        }
    }

    const onMetaChangeHandler = (metas, type) => {
        dispatch(editPostField({[type]: metas}))
    }

    return (
        <ProfilePostPageStyledDiv className='create-new-post main'>
            <form className={'create-new-post-fields'} onSubmit={e => onSubmitHandler(e)}>

                {postData.editingPost?.status ?
                    <label>Status: {postData.editingPost?.status}</label>
                    : null
                }
                {postData.editingPost?.author ?
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

                <ThumbnailUploader mainThumbnail={postData.editingPost.mainThumbnail}/>
                {postData.userData.role === 'administrator' ?
                    <>
                    <TextInput required={true} name={'mainThumbnail'} type={'text'}
                               value={postData.editingPost?.mainThumbnail}
                               title={'Main Thumbnail'}
                               onChangeHandler={onChangeHandler} className={'mainThumbnail'}/>
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
                    :null
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

                { postData.editingPost?.postType === 'video' ?
                    <VideoTypeFields onChangeHandler={onChangeHandler}/>
                    : null
                }



                <button className={'btn btn-primary'} type={'submit'}>Save</button>
            </form>

        </ProfilePostPageStyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

        // @ts-ignore
        await store.dispatch(getDefaultPageData(
            context,
            [
                'profilePageRightSidebar',
                'profilePageLeftSidebar',
                'profilePage'
            ]))

        return {
            props: {
                ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            }
        }

    })


export default post;
