'use client';
import { editPostAction } from '@storeDashboard/reducers/postsReducer';
import { useAppDispatch } from '@storeDashboard/hooks';
import { useRouter } from 'next/navigation';
import { setAlert } from '@storeDashboard/reducers/globalStateReducer';
import { useAppSelector } from '@storeDashboard/hooks';
import './ActionOnPost.scss';
import { IPost } from '@repo/typescript-types';
import { FC } from 'react';
import dashboardUpdatePost from '@lib/actions/database/operations/posts/dashboardUpdatePost';
import { ServerActionResponse } from '@lib/actions/response';

interface IProps {
  post: IPost;
}

const ActionOnPost: FC<IProps> = ({ post }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const ActionOnPostData = useAppSelector(({ users }) => ({
    userId: users?.userData?._id,
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
        router.push(`/admin/editPost?id=${data?.newPostId)}`);
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
        value={ActionOnPostData?.post?.status || 'draft'}
        onChange={(e) => dispatch(editPostAction({ [e.target.name]: e.target.value }))}>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
        <option value="trash">Trash</option>
        <option value="pending">Pending</option>
        <option value="reported">Reported</option>
      </select>
      <button className="btn btn-primary" onClick={onSaveHandler}>
        {ActionOnPostData?.post?._id ? 'Update' : 'Save'}
      </button>
    </div>
  );
};

export default ActionOnPost;

