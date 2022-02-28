import React, {FC, useEffect, useMemo, useState} from 'react';
import {getFirstLoadData} from "@_variables/ajaxVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch, useSelector} from "react-redux";
import {setLoginRegisterFormStatus} from "@store/clientActions/globalStateActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import styled from "styled-components";
import {wrapper} from "@store/store";
import {useRouter} from "next/router";
import CreateEditArticlePostField
    from "@components/includes/profilePageComponents/profilePost/CreateEditArticlePostField/CreateEditArticlePostField";
import {editPostField, getEditingPost, userCreateNewPost, userUpdatePost} from "@store/clientActions/postsAction";
import TextInput from "@components/includes/profilePageComponents/profilePost/common/TextInput";

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
    const userData = useSelector((store: StoreTypes) => store?.user.userData)
    const editingPostData = useSelector((store: StoreTypes) => store?.posts?.editingPost)

    // useEffect(() => {
    //     console.log(editingPostData)
    // }, [editingPostData]);

    useEffect(() => {
        if (query.id) dispatch(getEditingPost(query.id as string));
        if (!query.id && query.postType) dispatch(editPostField('postType', query.postType));


        // if (userData?._id) {
        //     setPostData({
        //         ...postData,
        //         author: userData._id
        //     })
        // } else {
        //     dispatch(setLoginRegisterFormStatus('login'))
        // }
    }, []);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(editPostField(e.target.name, e.target.value))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (
            editingPostData._id &&
            (userData?._id === editingPostData.author?._id || userData.role === 'administrator')&&
            query.id
        ){

           dispatch(userUpdatePost(editingPostData))
        }else if (!editingPostData._id) {
            dispatch(userCreateNewPost({
                ...editingPostData,
                status: userData.role === 'administrator' ?  editingPostData.status || 'pending' : 'pending',
                //@ts-ignore
                author:userData?._id
            },router))
        }
    }

    return (
        <ProfilePostPageStyledDiv className='create-new-post main'>
            <form className={'create-new-post-fields'} onSubmit={e=>onSubmitHandler(e)}>
                {editingPostData?.status?
                    <label>Status: {editingPostData?.status}</label>
                    :null
                }

                <TextInput required={true} name={'title'} type={'text'} value={editingPostData?.title} title={'Title'}
                           onChangeHandler={onChangeHandler}/>
                <TextInput required={true} name={'description'} type={'textarea'} value={editingPostData?.description}
                           title={'Description'}
                           onChangeHandler={onChangeHandler} className={'description'}/>
                {postType === 'article' ?
                    <CreateEditArticlePostField onChangeHandler={onChangeHandler}/>
                    : null
                }
                <button className={'btn btn-primary'} type={'submit'}>Save</button>
            </form>

        </ProfilePostPageStyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store =>
    async (context) => {

        await getFirstLoadData(
            context.req,
            ['profilePageRightSidebar,profilePageLeftSidebar', 'profilePage'],
            store,
            context.locale
        )

        return {
            props: {
                ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            }
        }

    })


export default post;
