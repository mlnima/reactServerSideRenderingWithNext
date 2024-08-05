'use client';
import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { Post } from "@repo/typescript-types";
import { editPostStatusAction } from '@store/reducers/postsReducers/editPostStatusAction';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import './PostAdminOrAuthorQuickAccessBar.scss';
import { formatDistance } from 'date-fns';
import { capitalizeFirstLetter } from '@repo/shared-util';
import PostQuickAccessPostInformation from './PostQuickAccessPostInformation';

interface IProps {
    post: Post;
    dictionary: {
        [key: string]: string;
    };
}

const PostAdminOrAuthorQuickAccessBar: ({
    post,
    dictionary,
}: {
    post: any;
    dictionary: any;
}) => React.JSX.Element | null = ({ post, dictionary }) => {
    const adminMode = useAppSelector(({ globalState }) => globalState?.adminMode);
    const { userData } = useAppSelector(({ user }) => user);
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const router = useRouter();

    const onStatusChangeHandler = (status: string) => {
        if (post._id) {
            dispatch(editPostStatusAction({ ids: [post._id], status }));
            router.push(`${pathname}?lastPageUpdate=${Date.now()}`);
        }
    };

    if (userData.role !== 'administrator' && post?.author?._id === userData?._id) {
        return (
            <div className={'PostAdminQuickAccessBar'}>
                <Link className="btn btn-primary" href={`/upload?_id=${post._id}`}>
                    Edit
                </Link>
                <PostQuickAccessPostInformation
                    status={post?.status}
                    dictionary={dictionary}
                    createdAt={post?.createdAt}
                    updatedAt={post?.updatedAt}
                />
            </div>
        );
    }

    if (adminMode && userData.role === 'administrator') {
        return (
            <div className={'PostAdminQuickAccessBar'}>
                {adminMode && userData.role === 'administrator' && (
                    <>
                        <Link className="btn btn-primary" href={`/dashboard/post?id=${post._id}`} target="_blank">
                            Edit As Admin
                        </Link>
                        <span className={'btn btn-info'} onClick={() => onStatusChangeHandler('draft')}>
                            Draft
                        </span>
                        <span className={'btn btn-primary'} onClick={() => onStatusChangeHandler('published')}>
                            Publish
                        </span>
                        <span className={'btn btn-info'} onClick={() => onStatusChangeHandler('pending')}>
                            Pending
                        </span>
                        <span className={'btn btn-danger'} onClick={() => onStatusChangeHandler('trash')}>
                            Trash
                        </span>
                    </>
                )}

                <PostQuickAccessPostInformation
                    status={post?.status}
                    dictionary={dictionary}
                    createdAt={post?.createdAt}
                    updatedAt={post?.updatedAt}
                />
            </div>
        );
    } else return null;
};
export default PostAdminOrAuthorQuickAccessBar;
