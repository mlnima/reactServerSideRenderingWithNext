'use client';
import React, { FC, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  loading,
  loginRegisterForm,
  setAlert,
} from '@store/reducers/globalStateReducer';
import './Comments.styles.scss';
import UserProfileImage from '@components/UserProfileImage/UserProfileImage';
import { Comment, NewComment } from '@repo/typescript-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesDown,
  faAnglesUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import CommentsRenderer from './CommentsRenderer/CommentsRenderer';
import {
  deleteComments,
  getComments,
  newComment,
} from '@lib/database/operations/posts';
import { clearACacheByTag } from '@lib/serverActions';

interface IProps {
  dictionary: {
    [key: string]: string;
  };
  postId: string;
}

const Comments: FC<IProps> = ({ dictionary, postId }) => {
  const [lastCommentTime, setLastCommentTime] = useState<number | null>(null);
  const commentsRef = useRef<HTMLDivElement>(null);
  const commentsAllowScrollRef = useRef<boolean>(true);
  const dispatch = useAppDispatch();
  const [showComments, setShowComments] = useState<boolean>(false);
  const [allowFetchMoreComments, setAllowFetchMoreComments] =
    useState<boolean>(true);
  const [commentsData, setCommentsData] = useState<Comment[]>([]);
  const [draftCommentBody, setDraftCommentBody] = useState<string>('');
  const adminMode = useAppSelector(({ globalState }) => globalState?.adminMode);
  const { loggedIn } = useAppSelector(({ user }) => user);
  const { userData } = useAppSelector(({ user }) => user);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lastCommentTime && Date.now() - lastCommentTime < 60 * 1000) {
      dispatch(
        setAlert({
          message: 'You Are Too Fast',
          type: 'error',
        })
      );
      return;
    }

    if (!loggedIn) {
      dispatch(loginRegisterForm('login'));
      return;
    }

    if (!userData?._id || !postId) return;

    try {
      dispatch(loading(true));
      const commentData = {
        body: draftCommentBody,
        author: userData?._id as string,
        onDocumentId: postId,
      } as NewComment;
      commentsAllowScrollRef.current = false;

      const savedCommentId: string | null = await newComment({ commentData });

      if (!savedCommentId) {
        dispatch(loading(false));
        dispatch(
          setAlert({
            message: 'Something went wrong please try again later',
            type: 'error',
          })
        );
        return;
      }

      await clearACacheByTag(`CComments-${postId}`);

      if (showComments) {
        const completeCommentData: Comment = {
          _id: savedCommentId,
          body: draftCommentBody,
          onDocumentId: postId,
          createdAt: Date.now(),
          author: {
            //@ts-expect-error: it's fine, in order to avoid populating the saved comment to get author data instead we are adding them after return
            profileImage: userData?.profileImage,
            username: userData?.username,
            _id: userData?._id,
          },
        };
        setCommentsData((prevState) => [
          completeCommentData,
          ...(prevState || []),
        ]);
      }
      setLastCommentTime(Date.now());
      setDraftCommentBody('');
      dispatch(loading(false));
    } catch {
      return;
    }
  };

  const onDeleteCommentHandler = async (_id: string) => {
    try {
      dispatch(loading(true));
      const deleteCommentsRes = await deleteComments({ ids: [_id] });
      if (!deleteCommentsRes) {
        dispatch(
          setAlert({
            message: 'Error While Deleting CommentItem',
            type: 'error',
          })
        );
        return;
      }
      await clearACacheByTag(`CComments-${postId}`);
      setCommentsData((prevState: Comment[]) =>
        prevState.filter((comment) => comment._id !== _id)
      );
      dispatch(loading(false));
    } catch {
      dispatch(
        setAlert({
          message: 'Error While Deleting CommentItem',
          type: 'error',
        })
      );
    }
  };

  const onShowCommentsHandler = async () => {
    setShowComments(!showComments);
    if (commentsData.length == 0) await onGetComments();
  };

  const onGetComments = async () => {
    try {
      if (!postId || !allowFetchMoreComments) return;
      dispatch(loading(true));
      commentsAllowScrollRef.current = true;
      const limit = 4;

      const comments = await getComments({
        onDocument: postId,
        skip: commentsData?.length || 0,
        limit,
      });
      dispatch(loading(false));
      if (!comments) return;

      if (comments.length > 0) {
        setCommentsData((prevState: Comment[]) => {
          let newComments = [...(prevState || []), ...comments];
          // newComments.sort((a : Comment, b: Comment) =>   b.createdAt - a.createdAt)
          return newComments;
        });
      }
      if (comments.length < limit) {
        setAllowFetchMoreComments(false);
      }
    } catch {
      dispatch(
        setAlert({
          message: 'Error While Loading Comments',
          type: 'error',
        })
      );
    }
  };

  return (
    <div className={'commentsContentWrapper'} id={'commentSection'}>
      <form className={'commentForm'} onSubmit={(e) => onSubmitHandler(e)}>
        <div className={'comment-form-container'}>
          <UserProfileImage size={40} profileRedirect={true} />
          <div className="comment-form-input-wrapper">
            {/*<div className={'tail'}/>*/}
            <textarea
              className={'comment-form-input'}
              required={true}
              onChange={(e) => setDraftCommentBody(e.target.value)}
              value={draftCommentBody}
              maxLength={300}
              placeholder={
                dictionary?.['Share What You Think'] || 'Share What You Think'
              }
              name="body"
            />
          </div>
        </div>
        <button
          className="comment-form-submit-button btn btn-primary"
          type="submit"
        >
          {dictionary?.['Post Comment'] || 'Post CommentItem'}
        </button>
      </form>

      <div className={'showComments'}>
        <button
          className={'btn btn-transparent'}
          onClick={onShowCommentsHandler}
        >
          {showComments ? (
            <>
              {dictionary?.['Hide Comments'] || 'Hide Comments'}
              <FontAwesomeIcon
                icon={faAnglesUp}
                style={{ width: 20, height: 20 }}
              />
            </>
          ) : (
            <>
              {dictionary?.['Show Comments'] || 'Show Comments'}
              <FontAwesomeIcon
                icon={faAnglesDown}
                style={{ width: 20, height: 20 }}
              />
            </>
          )}
        </button>
      </div>
      {showComments && (
        <>
          <CommentsRenderer
            adminMode={adminMode}
            commentsRef={commentsRef}
            commentsAllowScrollRef={commentsAllowScrollRef}
            comments={commentsData}
            onDeleteCommentHandler={onDeleteCommentHandler}
          />

          <div className={'loadMoreComments'}>
            <button className={'btn btn-transparent'} onClick={onGetComments}>
              {dictionary?.['More'] || 'More'}
              <FontAwesomeIcon
                icon={faPlus}
                style={{ width: 20, height: 20 }}
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default Comments;


// await fetchComments({
//     onDocument: postId,
//     skip: commentsData?.length || 0,
//     limit,
// })
//     .then((response: { comments: Comment[] }) => {
//         const comments = response?.comments || [];
//
//         if (comments.length > 0) {
//             setCommentsData((prevState: Comment[]) => [...(prevState || []), ...comments]);
//         }
//         if (comments.length < limit) {
//             setAllowFetchMoreComments(false);
//         }
//     })
//     .finally(() => {
//         dispatch(loading(false));
//     });


//--------------------------
// await postNewComment({ commentData })
//     .then((response: { savedComment: Comment }) => {
//         const savedComment = response?.savedComment;
//
//         if (savedComment?._id) {
//             const completeCommentData: Comment = {
//                 ...savedComment,
//                 author: {
//                     //@ts-expect-error: it's fine, in order to avoid populating the saved comment to get author data instead we are adding them after return
//                     profileImage: userData?.profileImage,
//                     username: userData?.username,
//                     _id: userData?._id,
//                 },
//             };
//
//             setCommentsData(prevState => [completeCommentData, ...(prevState || [])]);
//         }
//     }).finally(()=>{
//         clearACacheByTag(`CComments-${postId}`)
//         // await clearCachesByServerAction({
//         //     path: pathname,
//         //     segment,
//         //     mode,
//         //     searchParams,
//         //     params
//         // })
//     })
//     .catch(error => {
//         dispatch(
//             setAlert({
//                 message: error.message,
//                 type: 'error',
//             }),
//         );
//     })
//     .finally(() => {
//         setDraftCommentBody('');
//         dispatch(loading(false));
//     });


// await dashboardAPIRequestDeleteComments([_id])
//   .then((res: AxiosResponse) => {
//     dispatch(
//       setAlert({
//         message: res.data.message || 'CommentItem Deleted',
//         type: 'success',
//       })
//     );
//   })
//   .catch(() => {
//     dispatch(
//       setAlert({
//         message: 'Error While Deleting CommentItem',
//         type: 'error',
//       })
//     );
//   })
//   .finally(() => {
//     setCommentsData((prevState: Comment[]) =>
//       prevState.filter((comment) => comment._id !== _id)
//     );
//     dispatch(loading(false));
//   });