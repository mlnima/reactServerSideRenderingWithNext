
'use client';

import styled from "styled-components";
import { useSelector } from "react-redux";
import { createNewPostAction, editPostAction, updatePostAction } from "@storeDashboard/reducers/postsReducer";
import { DashboardStore } from "@repo/typescript-types";
import { useAppDispatch } from "@storeDashboard/hooks";
import { useRouter } from "next/navigation"; // Use useRouter for Next.js routing
import { setAlert } from "@storeDashboard/reducers/globalStateReducer";

const ActionOnPostStyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  .primarySelect {
    width: 100%;
    margin: 10px 0;
  }
`;

const ActionOnPost = () => {
  const router = useRouter(); // Use useRouter for Next.js routing
  const dispatch = useAppDispatch();

  const ActionOnPostData = useSelector(({ posts, users }: DashboardStore) => ({
    userId: users?.userData?._id,
    post: posts?.post
  }));

  const onViewHandler = () => {
    const postType = ActionOnPostData?.post?.postType || 'video';
    const postId = ActionOnPostData?.post?._id;
    if (postId && typeof window !== 'undefined') {
      window.open(`/post/${postType}/${postId}`, '_blank');
    }
  };

  const onSaveHandler = async () => {
    try {
      if (ActionOnPostData?.post?._id) {
        dispatch(updatePostAction({
          ...ActionOnPostData.post,
        }));
      } else {
        dispatch(createNewPostAction({
          data: {
            ...ActionOnPostData.post,
            status: ActionOnPostData.post?.status || 'draft',
            author: ActionOnPostData.userId,
          },
          router, // Pass the router object for navigation
        }));
      }
    } catch (error) {
      dispatch(setAlert({ message: error.stack, type: 'error', active: true }));
    }
  };

  return (
    <ActionOnPostStyledDiv className='action-on-the-post'>
      <button className='btn btn-secondary' onClick={onViewHandler}>View</button>
      <select
        className='primarySelect'
        name='status'
        value={ActionOnPostData?.post?.status || 'draft'}
        onChange={(e) => dispatch(editPostAction({ [e.target.name]: e.target.value }))}
      >
        <option value='published'>Published</option>
        <option value='draft'>Draft</option>
        <option value='trash'>Trash</option>
        <option value='pending'>Pending</option>
        <option value='reported'>Reported</option>
      </select>
      <button className='btn btn-primary' onClick={onSaveHandler}>
        {ActionOnPostData?.post?._id ? 'Update' : 'Save'}
      </button>
    </ActionOnPostStyledDiv>
  );
};

export default ActionOnPost;


// import styled from "styled-components";
// import {useSelector} from "react-redux";
// import {createNewPostAction, editPostAction, updatePostAction} from "@store/reducers/postsReducer";
// import {DashboardStore} from "@repo/typescript-types";
// import {useAppDispatch} from "@store/hooks";
// import {useNavigate} from "react-router-dom";


// import {setAlert} from "@store/reducers/globalStateReducer";
//
// const ActionOnPostStyledDiv = styled.div`
//     display: flex;
//     justify-content: space-between;
//     flex-wrap: wrap;
//     width: 100%;
//
//     .primarySelect {
//         width: 100%;
//         margin: 10px 0;
//     }
// `
//
// const ActionOnPost = () => {
//     const navigate = useNavigate();
//     const dispatch = useAppDispatch()
//
//     const ActionOnPostData = useSelector(({posts, users}: DashboardStore) => {
//         return {
//             userId: users?.userData?._id,
//             post: posts?.post
//         }
//     })
//
//     const onViewHandler = () => {
//         window.open(`/post/${ActionOnPostData?.post?.postType || 'video'}/${ActionOnPostData?.post?._id}`, '_blank')
//     }
//
//     const onSaveHandler = async () => {
//
//         try {
//             if (ActionOnPostData?.post?._id) {
//                 dispatch(updatePostAction(
//                     {
//                         ...ActionOnPostData?.post,
//                     }))
//             } else {
//                 dispatch(createNewPostAction({
//                         //@ts-ignore
//                         data: {
//                             ...ActionOnPostData?.post,
//                             status: ActionOnPostData.post?.status || 'draft',
//                             author: ActionOnPostData?.userId
//                         },
//                         navigate
//                     }
//                 ))
//             }
//         } catch (error) {
//             dispatch(setAlert({message: error.stack, type: 'error', active: true}))
//         }
//     }
//
//
//     return (
//         <ActionOnPostStyledDiv className='action-on-the-post'>
//             <button className='btn btn-secondary' onClick={() => onViewHandler()}>View</button>
//             <select className='primarySelect'
//                     name='status'
//                     value={ActionOnPostData?.post?.status || 'draft'}
//                     onChange={e => dispatch(editPostAction({[e.target.name]: e.target.value}))}
//             >
//                 <option value='published'>Published</option>
//                 <option value='draft'>Draft</option>
//                 <option value='trash'>Trash</option>
//                 <option value='pending'>Pending</option>
//                 <option value='reported'>Reported</option>
//             </select>
//             <button className='btn btn-primary'
//                     onClick={() => onSaveHandler()}>{ActionOnPostData?.post?._id ? 'update' : 'save'}</button>
//         </ActionOnPostStyledDiv>
//     );
// };
//
// export default ActionOnPost;