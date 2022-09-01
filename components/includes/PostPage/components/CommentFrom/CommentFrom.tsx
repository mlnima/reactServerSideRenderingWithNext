import {FC, useRef} from 'react';
import styled from "styled-components";
import {useTranslation} from 'next-i18next';
import {useSelector} from "react-redux";
import fetchPostComments
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPostComments";
import fetchNewComment
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchNewComment";
import {useAppDispatch} from "@store_toolkit/hooks";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const CommentFromStyledForm = styled.form`

  display: flex;
  flex-direction: column;
  width: 95%;
  margin: auto;

  .comment-form-input {
    display: flex;
  }

  textarea {
    width: 100%;
    min-height: 200px;
  }

  textarea {
    background-color: var(--post-page-info-background-color, #181818);
    margin: 3px;
    padding: 5px;
    border: none;
    color: var(--post-page-info-color, #ccc);
  }

  .comment-form-submit-button {
    padding: 7px 20px;
    text-align: center;
    box-sizing: border-box;
    color: var(--post-page-info-color, #ccc);
    background-color: var(--post-page-info-background-color, #181818);
    border: none;
    margin: 5px;
    max-width: 150px;
    cursor: pointer;
  }
`

const CommentFrom: FC = () => {
    const {t} = useTranslation('common');
    const dispatch = useAppDispatch()
    const _id = useSelector(({posts}: Store) => posts.post?._id)
    const userData = useSelector(({user}: Store) => user?.userData)
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
            <div>
                <div className='comment-form-input'>
                    <textarea ref={bodyInput} required={true} placeholder={t<string>(`Write a Comment`)} name='body'/>
                </div>
            </div>
            <button className='comment-form-submit-button' type='submit'>{t<string>(`Post Comment`)}</button>
        </CommentFromStyledForm>
    );
};
export default CommentFrom;
