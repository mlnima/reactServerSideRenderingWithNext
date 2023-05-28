import React, {FC, useRef} from 'react';
import styled from "styled-components";
import useTranslation from 'next-translate/useTranslation'
import {useSelector} from "react-redux";
import {useAppDispatch} from "@store_toolkit/hooks";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {Store} from "typescript-types";
import UserProfileImage from "../../../../includes/UserProfileImage/UserProfileImage";
import postNewCommentAction from "@store_toolkit/clientReducers/postsReducers/postNewCommentAction";
import getPostCommentsAction from "@store_toolkit/clientReducers/postsReducers/getPostCommentsAction";

const CommentFromStyledForm = styled.form`

  display: flex;
  flex-direction: column;
  padding: 16px 8px;
  box-sizing: border-box;
  
  .comment-form-container{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    .user-profile-image{
      margin-right: 5px;
      align-self: flex-start;
    }
    .comment-form-input-wrapper{
      display: flex;
      position: relative;
      width: 100%;
      .comment-form-input{
        font-size: large;
        width: 100%;
        min-height: 120px;
        background-color: #ccc;
        border-radius: 5px;
        border: none;
        color: #000;
        outline:none;
      }
    }
  }
  
  .comment-form-submit-button {
    margin: 10px 0;
    box-sizing: border-box;
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
//@ts-ignore
        if (userData._id) {
            const commentData = {
                //@ts-ignore
                body: bodyInput.current.value,
                //@ts-ignore
                author: userData._id,
                onDocumentId: _id,
            };
            if (_id) {
                //@ts-ignore
                dispatch(postNewCommentAction(commentData))
                //@ts-ignore
                bodyInput.current.value = ''
                dispatch(getPostCommentsAction(_id))
            }
        } else {
            dispatch(loginRegisterForm('login'))
        }
    }

    return (
        <CommentFromStyledForm className={'comment-form sub-content'} onSubmit={e => onSubmitHandler(e)}>
            <div className={'comment-form-container'}>
                <UserProfileImage size={40} profileRedirect={true}/>
                <div className='comment-form-input-wrapper'>
                    {/*<div className={'tail'}/>*/}
                    <textarea className={'comment-form-input'}
                              ref={bodyInput}
                              required={true}
                              placeholder={t<string>(`Share What You Think`,{},{fallback:`Share what you think`})}
                              name='body'/>
                </div>
            </div>
            <button className='comment-form-submit-button btn btn-primary' type='submit'>{t<string>(`Post Comment`)}</button>
        </CommentFromStyledForm>
    );
};
export default CommentFrom;
