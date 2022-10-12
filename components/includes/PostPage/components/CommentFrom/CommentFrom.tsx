import React, {FC, useRef} from 'react';
import styled from "styled-components";
import useTranslation from 'next-translate/useTranslation'
import {useSelector} from "react-redux";
import fetchPostComments
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPostComments";
import fetchNewComment
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchNewComment";
import {useAppDispatch} from "@store_toolkit/hooks";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {Store} from "@_typeScriptTypes/storeTypes/Store";
import UserProfileImage from "@components/includes/UserProfileImage/UserProfileImage";


//after making special translation file

const CommentFromStyledForm = styled.form`

  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px auto;
  padding: 0 8px;
  box-sizing: border-box;

  .comment-form-container{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    .user-profile-image{
      margin-right: 20px;
    }
    .comment-form-input-wrapper{
      display: flex;
      position: relative;
      width: 100%;
      .tail{
        border-style: solid;
        border-width: 0 10px 10px 0;
        border-color: transparent #ccc transparent transparent;
        width: 0;
        height: 0;
        left: -8px;
        position: absolute;
        top: 0;
      }
      .comment-form-input{
        width: 100%;
        min-height: 35px;
        background-color: #ccc;
        border: none;
        color: #000;
        outline:none;
      }
    }
  }
  
  .comment-form-submit-button {
    margin: 10px 0 5px 0;
    max-width: 150px;
  }
  @media only screen and (min-width: 768px) {
    .comment-form-container{
      .comment-form-input-wrapper{
        .comment-form-input{
          min-height: 60px;
        }
      }
    }
  }
`

const CommentFrom: FC = () => {
    const {t} = useTranslation('common');
    const dispatch = useAppDispatch()
    const {_id,userData} = useSelector(({posts,user}: Store) => {
        return{
            _id:posts.post?._id,
            // loggedIn:user.loggedIn,
            userData:user?.userData
        }
    })

    const bodyInput = useRef(null);

    const onSubmitHandler = e => {
        e.preventDefault();

        if (userData._id) {
            const commentData = {
                body: bodyInput.current.value,
                author: userData._id,
                onDocumentId: _id,
            };
            if (_id) {
                dispatch(fetchNewComment(commentData))
                bodyInput.current.value = ''
                dispatch(fetchPostComments(_id))
            }
        } else {
            dispatch(loginRegisterForm('login'))
        }
    }

    return (
        <CommentFromStyledForm className='comment-form' onSubmit={e => onSubmitHandler(e)}>
            <div className={'comment-form-container'}>
                <UserProfileImage size={40} profileRedirect={true}/>
                <div className='comment-form-input-wrapper'>
                    <div className={'tail'}/>
                    <textarea className={'comment-form-input'}
                              ref={bodyInput}
                              required={true}
                              placeholder={t<string>(`Share What You Think`,{},{fallback:`Share what you think`})}
                              name='body'/>
                </div>
            </div>
            <button className='comment-form-submit-button btn btn-dark' type='submit'>{t<string>(`Post Comment`)}</button>
        </CommentFromStyledForm>
    );
};
export default CommentFrom;
