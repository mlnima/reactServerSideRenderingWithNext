'use client';
import { useAppDispatch } from '@store/hooks';
import { useRouter } from 'next/navigation';
import { setAlert } from '@store/reducers/globalStateReducer';
import './ActionOnPost.scss';
import { IPost } from '@repo/typescript-types';
import React, { FC } from 'react';
import dashboardUpdatePost from '@lib/actions/database/posts/dashboardUpdatePost';
import { ServerActionResponse } from '@lib/actions/response';

interface IProps {
  post: IPost;
  setPost:React.Dispatch<React.SetStateAction<IPost | null>>
}

const ActionOnPost: FC<IProps> = ({ post ,setPost}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onViewHandler = () => {
    if (post?._id && typeof window !== 'undefined') {
      window.open(`/post/${post?.postType || 'video'}/${post?._id}`, '_blank');
    }
  };

  const onSaveHandler = async () => {
    try {

      const { success, message, data } = await dashboardUpdatePost({ postData: post }) as ServerActionResponse<{
        newPostId?: string
      }>;

      if (!success) {
        if (message) {
          dispatch(setAlert({ message, type: 'error', active: true }));
        }
        return;
      }

      if (data && data?.newPostId) {
        router.push(`/admin/editPost?id=${data?.newPostId}`);
      }

    } catch (error) {
      dispatch(setAlert({ message: 'something went wrong', type: 'error', active: true }));
    }
  };

  return (
    <div className="ActionOnPost">
      <button className="btn btn-secondary" onClick={onViewHandler}>View</button>
      <select
        className="primarySelect"
        name="status"
        value={post?.status || 'draft'}
        onChange={(e) => setPost((prevState)=>({ ...prevState, [e.target.name]: e.target.value }))}>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
        <option value="trash">Trash</option>
        <option value="pending">Pending</option>
        <option value="reported">Reported</option>
      </select>
      <button className="btn btn-primary" onClick={onSaveHandler}>
        {post?._id ? 'Update' : 'Save'}
      </button>
    </div>
  );
};

export default ActionOnPost;

