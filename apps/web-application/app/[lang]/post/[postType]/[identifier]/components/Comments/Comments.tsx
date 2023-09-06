'use client';
import React, {FC, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {loading, loginRegisterForm, setAlert} from "@store/reducers/globalStateReducer";
import './Comments.styles.scss'
import UserProfileImage from "@components/UserProfileImage/UserProfileImage";
import {Comment, NewComment} from "typescript-types";
import {clientAPIRequestDeleteCommentByAdmin} from "api-requests";
import {fetchComments, postNewComment} from "fetch-requests";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAnglesDown, faAnglesUp, faPlus} from "@fortawesome/free-solid-svg-icons";
import CommentsRenderer from "./CommentsRenderer/CommentsRenderer";

interface IProps {
    dictionary: {
        [key: string]: string
    },
    postId?: string,
}


const Comments: FC<IProps> = ({dictionary, postId}) => {

    const commentsRef = useRef<HTMLDivElement>(null)
    const commentsAllowScrollRef = useRef<boolean>(true)
    const dispatch = useAppDispatch()
    const [showComments, setShowComments] = useState<boolean>(false)
    const [commentsData, setCommentsData] = useState<Comment[]>([])
    const [draftCommentBody, setDraftCommentBody] = useState<string>('')
    const adminMode = useAppSelector(({globalState}) => globalState?.adminMode);
    const {loggedIn} = useAppSelector(({user}) => user)
    const {userData} = useAppSelector(({user}) => user)

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!loggedIn) {
            dispatch(loginRegisterForm('login'))
            return
        }

        if (!userData?._id || !postId) return

        try {
            dispatch(loading(true))
            const commentData = {
                body: draftCommentBody,
                author: userData?._id as string,
                onDocumentId: postId
            } as NewComment
            commentsAllowScrollRef.current = false
            await postNewComment({commentData}).then((response: any) => {

                setCommentsData((prevState: Comment[]) => {
                    const newCommentData = response?.savedComment;
                    const completeCommentData = {
                        ...newCommentData,
                        author: {
                            //@ts-ignore
                            profileImage: userData?.profileImage,
                            //@ts-ignore
                            username: userData?.username,
                            _id: userData?._id
                        }
                    };

                    return [completeCommentData, ...prevState];
                })
            }).finally(() => {
                setDraftCommentBody('')
                dispatch(loading(false))
            })

        } catch (error) {

        }
    }

    const onDeleteCommentHandler = async (id: string) => {
        try {
            dispatch(loading(true))
            await clientAPIRequestDeleteCommentByAdmin([id]).then((res) => {
                dispatch(setAlert({
                    message: res.data.message || 'CommentItem Deleted',
                    type: 'success'
                }))
            }).catch(err => {
                dispatch(setAlert({
                    message: 'Error While Deleting CommentItem',
                    type: 'error',
                }))
            }).finally(() => {
                setCommentsData((prevState: Comment[]) => prevState.filter(comment => comment._id !== id))
                dispatch(loading(false))
            })
        } catch (error) {
            dispatch(setAlert({
                message: 'Error While Deleting CommentItem',
                type: 'error',
            }))
        }
    }


    const onShowCommentsHandler = () => {
        setShowComments(!showComments)
        if (commentsData?.length > 0) return
        onGetComments()
    }

    const onGetComments = async () => {
        try {
            if (!postId) return
            dispatch(loading(true))
            commentsAllowScrollRef.current = true
            await fetchComments({
                onDocument: postId,
                skip: commentsData?.length || 0,
                limit: 4
            }).then((response: { comments: Comment[] }) => {
                if (response?.comments?.length > 0) {
                    setCommentsData((prevState: Comment[]) => [...prevState, ...response?.comments])
                }

            }).finally(() => {
                dispatch(loading(false))
            })

        } catch (error) {
            dispatch(setAlert({
                message: 'Error While Loading Comments',
                type: 'error',
            }))
        }
    }

    return (
        <div className={'commentsContentWrapper'}>
            <form className={'commentForm'} onSubmit={e => onSubmitHandler(e)}>
                <div className={'comment-form-container'}>
                    <UserProfileImage size={40} profileRedirect={true}/>
                    <div className='comment-form-input-wrapper'>
                        {/*<div className={'tail'}/>*/}
                        <textarea className={'comment-form-input'}
                                  required={true}
                                  onChange={(e) => setDraftCommentBody(e.target.value)}
                                  value={draftCommentBody}
                                  maxLength={300}
                                  placeholder={
                                      dictionary?.['Share What You Think'] || 'Share What You Think'
                                  }
                                  name='body'/>
                    </div>
                </div>
                <button className='comment-form-submit-button btn btn-primary' type='submit'>
                    {dictionary?.['Post Comment'] || 'Post CommentItem'}
                </button>
            </form>

            <div className={'showComments'}>
                <button className={'btn btn-transparent'} onClick={onShowCommentsHandler}>
                    {
                        showComments ?
                            <>
                                {dictionary?.['Hide Comments'] || 'Hide Comments'}
                                <FontAwesomeIcon icon={faAnglesUp} style={{width: 20, height: 20}}/>
                            </>
                            :
                            <>
                                {dictionary?.['Show Comments'] || 'Show Comments'}
                                <FontAwesomeIcon icon={faAnglesDown} style={{width: 20, height: 20}}/>
                            </>

                    }
                </button>
            </div>
            {(showComments) &&
                <>
                    <CommentsRenderer adminMode={adminMode}
                                      commentsRef={commentsRef}
                                      commentsAllowScrollRef={commentsAllowScrollRef}
                                      comments={commentsData}
                                      onDeleteCommentHandler={onDeleteCommentHandler}/>

                    <div className={'loadMoreComments'}>
                        <button className={'btn btn-transparent'} onClick={onGetComments}>
                            {dictionary?.['More'] || 'More'}
                            <FontAwesomeIcon icon={faPlus} style={{width: 20, height: 20}}/>
                        </button>
                    </div>
                </>
            }

        </div>

    );
};
export default Comments;
