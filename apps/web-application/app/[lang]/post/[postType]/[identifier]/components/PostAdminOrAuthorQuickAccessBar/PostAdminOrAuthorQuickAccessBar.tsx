'use client'
import React, { FC } from 'react';
import { useAppSelector } from '@store/hooks';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import './PostAdminOrAuthorQuickAccessBar.scss';
import PostQuickAccessPostInformation from './PostQuickAccessPostInformation';
import { clearACacheByPath, clearACacheByTag } from '@lib/serverActions';
import updatePostStatus from '@lib/actions/database/posts/updatePostStatus';


interface IProps {
  postId?: string | null,
  authorId?: string,
  status?: string,
  createdAt?: string,
  updatedAt?: string,
  dictionary: {
    [key: string]: string;
  };
}

const PostAdminOrAuthorQuickAccessBar: FC<IProps> = (
  {
    postId,
    authorId,
    status,
    createdAt,
    updatedAt,
    dictionary,
  }) => {
  const adminMode = useAppSelector(({ globalState }) => globalState?.adminMode);
  const { userData } = useAppSelector(({ user }) => user);
  const pathname = usePathname();
  const router = useRouter();

  const onStatusChangeHandler = async (status: string) => {
    if (postId) {
      await updatePostStatus({ _id: postId, status });
      await clearACacheByTag(`CPost-${postId}`);
      router.push(`${pathname}?lastPageUpdate=${performance.now()}`);
    }
  };

  const onClearCacheHandler = async () => {
    // await  clearACacheByPath('/post/[postType]/[identifier]','page')
    await clearACacheByTag(`CPost-${postId}`);
    await clearACacheByTag(`CPostViews-${postId}`);
    await clearACacheByTag(`CPostRating-${postId}`);
    await clearACacheByTag(`CComments-${postId}`);
  };



  if (userData.role !== 'administrator' && authorId === userData?._id) {
    return (
      <div className={'PostAdminQuickAccessBar'}>
        <Link className="btn btn-primary" href={`/upload?_id=${postId}`}>
          Edit
        </Link>
        <PostQuickAccessPostInformation
          status={status}
          dictionary={dictionary}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
      </div>
    );
  }

  if (adminMode && userData.role === 'administrator') {
    return (
      <div className={'PostAdminQuickAccessBar'}>
        {adminMode && userData.role === 'administrator' && (
          <>
                <span
                  className={'btn btn-info'}
                  onClick={onClearCacheHandler}
                >
                  Clear Cache
                </span>
            <Link
              className="btn btn-primary"
              href={`/admin/editPost?id=${postId}`}
              target="_blank"
            >
              Edit As Admin
            </Link>
            <span
              className={'btn btn-info'}
              onClick={() => onStatusChangeHandler('draft')}
            >
                  Draft
                </span>
            <span
              className={'btn btn-primary'}
              onClick={() => onStatusChangeHandler('published')}
            >
                  Publish
                </span>
            <span
              className={'btn btn-info'}
              onClick={() => onStatusChangeHandler('pending')}
            >
                  Pending
                </span>
            <span
              className={'btn btn-danger'}
              onClick={() => onStatusChangeHandler('trash')}
            >
                  Trash
                </span>
          </>
        )}

        <PostQuickAccessPostInformation
          status={status}
          dictionary={dictionary}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
      </div>
    );
  } else return null;
};
export default PostAdminOrAuthorQuickAccessBar;
