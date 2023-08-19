'use client';
import React, {FC} from "react";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {Post} from "typescript-types/dist/src/Post";
import {editPostStatusAction} from "@store/reducers/postsReducers/editPostStatusAction";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import './PostAdminQuickAccessBar.styles.scss'

interface IProps {
    post:Post
}

const PostAdminQuickAccessBar: FC<IProps> = ({post}) => {
    const adminMode = useAppSelector(({globalState}) => globalState?.adminMode);
    const dispatch = useAppDispatch()
    const pathname = usePathname()
    const router = useRouter()

    const onStatusChangeHandler = (status:string) => {
        if (post._id) {
            dispatch(editPostStatusAction({ids: [post._id], status}))
            router.push(`${pathname}?lastPageUpdate=${Date.now()}`)
        }
    }

    if (!adminMode) return null;

    return (
        <div className={'PostAdminQuickAccessBar'}>
            <Link className='btn btn-primary' href={`/editPost/${post._id}`} target='_blank'>Edit</Link>
            <Link className='btn btn-primary' href={`/dashboard/post?id=${post._id}`} target='_blank'>Edit As Admin</Link>
            <span className={'btn btn-info'} onClick={() => onStatusChangeHandler('draft')}>Draft</span>
            <span className={'btn btn-primary'} onClick={() => onStatusChangeHandler('published')}>Publish</span>
            <span className={'btn btn-info'} onClick={() => onStatusChangeHandler('pending')}>Pending</span>
            <span className={'btn btn-danger'} onClick={() => onStatusChangeHandler('trash')}>Trash</span>
            <div className={'dates'}>
                {post.createdAt && <span> Created At : {post.createdAt}</span>}
                {post.updatedAt && <span> Updated At : {post.updatedAt}</span>}
            </div>
            <h4 className='status'>Status : {post.status}</h4>
        </div>
    )
};
export default PostAdminQuickAccessBar
