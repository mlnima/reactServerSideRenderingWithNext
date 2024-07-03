'use client';
import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {Post} from "typescript-types";
import {editPostStatusAction} from "@store/reducers/postsReducers/editPostStatusAction";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import './PostAdminOrAuthorQuickAccessBar.scss'
import {formatDistance} from 'date-fns'
import {capitalizeFirstLetter} from "@repo/shared-util";

interface IProps {
    post: Post,
    dictionary: {
        [key: string]: string
    },
}

const PostAdminOrAuthorQuickAccessBar: FC<IProps> = ({post,dictionary}) => {
    const adminMode = useAppSelector(({globalState}) => globalState?.adminMode);
    const {userData} = useAppSelector(({user}) => user);
    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const router = useRouter()

    const onStatusChangeHandler = (status: string) => {
        if (post._id) {
            dispatch(editPostStatusAction({ids: [post._id], status}))
            router.push(`${pathname}?lastPageUpdate=${Date.now()}`)
        }
    }

    if (
        (adminMode && userData.role === 'administrator') ||
        (post?.author?._id === userData?._id)
    ) {
        return (
            <div className={'PostAdminQuickAccessBar'}>
                <Link className='btn btn-primary' href={`/editPost/${post._id}`} >Edit</Link>
                {(adminMode && userData.role === 'administrator') &&
                    <>
                        <Link className='btn btn-primary' href={`/dashboard/post?id=${post._id}`} target='_blank'>
                            Edit As Admin
                        </Link>
                        <span className={'btn btn-info'} onClick={() => onStatusChangeHandler('draft')}>Draft</span>
                        <span className={'btn btn-primary'} onClick={() => onStatusChangeHandler('published')}>Publish</span>
                        <span className={'btn btn-info'} onClick={() => onStatusChangeHandler('pending')}>Pending</span>
                        <span className={'btn btn-danger'} onClick={() => onStatusChangeHandler('trash')}>Trash</span>
                    </>
                }


                <div className={'dates'}>
                    {post.createdAt &&
                        <span title={post.createdAt}>
                            {dictionary?.['Created At'] || 'Created At'}: {formatDistance(new Date(post.createdAt), new Date())}
                        </span>
                    }
                    {(post.updatedAt) &&
                        <span title={post.updatedAt}>
                            {dictionary?.['Updated At'] || 'Updated At'}:{formatDistance(new Date(post.updatedAt), new Date())}
                        </span>
                    }
                </div>
                <h4 className='status'>
                    {dictionary?.['Status'] || 'Status'} : {
                    dictionary?.[capitalizeFirstLetter(post.status)] ||
                    capitalizeFirstLetter(post.status)
                }
                </h4>

            </div>
        )
    } else return null

};
export default PostAdminOrAuthorQuickAccessBar
