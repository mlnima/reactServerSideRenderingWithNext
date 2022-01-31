import {useRef } from 'react';
import {newComment } from '../../../../../_variables/ajaxPostsVariables';
import styled from "styled-components";
import {useTranslation} from 'next-i18next';
import {useDispatch, useSelector} from "react-redux";
import {setLoginRegisterFormStatus} from "../../../../../store/actions/globalStateActions";
import {addNewComment} from "../../../../../store/actions/postAction";

const CommentFromStyledForm = styled.form`
 
    display: flex;
    flex-direction: column;
    width: 95%;
 
  .comment-form-input {
    display: flex;
  }
  textarea {
    width: 100%;
    min-height: 200px;
  }
  textarea {
    background-color: var(--post-page-info-background-color,#181818);
    margin: 3px;
    padding:5px;
    border: none;
    color: var(--post-page-info-color,#ccc);
  }
  .comment-form-submit-button{
    padding: 7px 20px;
    text-align: center;
    box-sizing: border-box;
    color: var(--post-page-info-color,#ccc);
    background-color: var(--post-page-info-background-color,#181818);
    border:none;
    margin: 5px;
    max-width: 150px;
    cursor: pointer;
  }
`

const CommentFrom = props => {
    const {t} = useTranslation('common');
    const dispatch = useDispatch()
    const userData = useSelector(store => store?.user?.userData)
    const bodyInput = useRef(null);

    const onSubmitHandler = e => {
        e.preventDefault();

        if (userData._id){
            const commentData = {
                body: bodyInput.current.value,
                author: userData._id,
                onDocumentId: props.documentId,
            };
            if (props.documentId) {
                newComment(commentData).then(res => {
                    bodyInput.current.value=''
                    const now =  new Date(Date.now())
                    dispatch(addNewComment({
                        ...commentData,
                        createdAt:now.toISOString(),
                        updatedAt:now.toISOString() ,
                        reply: [],
                        likes: 0,
                        disLikes: 0,
                        status: 'approved',
                        author: {
                            _id:  userData._id,
                            username:  userData.username,
                            profileImage: userData.profileImage
                        },
                    }))
                }).catch(err => {
                    console.log(err)
                });
            }
        }else {
            dispatch(setLoginRegisterFormStatus('login'))
        }
    }

    return (
        <CommentFromStyledForm className='comment-form' onSubmit={ e => onSubmitHandler(e) }>
            <div>
                <div className='comment-form-input'>
                    <textarea ref={ bodyInput } required={ true } placeholder={t(`Write a Comment`)} name='body'/>
                </div>
            </div>
            <button className='comment-form-submit-button' type='submit'>{t(`Post Comment`)}</button>
        </CommentFromStyledForm>
    );
};
export default CommentFrom;
