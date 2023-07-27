import React, {FC} from "react";
import styled from "styled-components";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";
import {editPostStatusAction} from "@store_toolkit/clientReducers/postsReducers/editPostStatusAction";

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: var(--secondary-background-color, #181818);
  top: 0;
  border-radius: 3px;

  .btn-primary {
    color: var(--primary-button-link-text-color);
  }

  .status {
    margin: 0 10px;
  }

  .dates {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 2px 5px;
  }

  .edit-as-admin-handler {
    padding: 5px;
    margin: 5px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`

interface PropTypes {
}

const PostAdminQuickAccessBar: FC<PropTypes> = () => {
    const dispatch = useAppDispatch()
    const {query, push, pathname} = useRouter()

    const {_id, status, createdAt, updatedAt} = useAppSelector(({posts}) => {
        return {
            _id: posts.post?._id,
            status: posts.post?.status,
            createdAt: posts.post?.createdAt,
            updatedAt: posts.post?.updatedAt,
        }
    })

    const onStatusChangeHandler = (status) => {
        if (_id) {
            dispatch(editPostStatusAction({ids: [_id], status}))
            push({
                pathname: pathname,
                query: {...query, lastPageUpdate: Date.now()},
            });
        }
    }

    return (
        <Style className='edit-as-admin handle'>
            {/*<a className='btn btn-primary' href={`/profile/post?id=${_id}`} target='_blank'>Edit</a>*/}
            <a className='btn btn-primary' href={`/editPost/${_id}`} target='_blank'>Edit</a>
            <a className='btn btn-primary' href={`/dashboard/post?id=${_id}`} target='_blank'>Edit As Admin</a>
            <span className={'btn btn-info'} onClick={() => onStatusChangeHandler('draft')}>Draft</span>
            <span className={'btn btn-primary'} onClick={() => onStatusChangeHandler('published')}>Publish</span>
            <span className={'btn btn-info'} onClick={() => onStatusChangeHandler('pending')}>Pending</span>
            <span className={'btn btn-danger'} onClick={() => onStatusChangeHandler('trash')}>Trash</span>
            <div className={'dates'}>
                {createdAt && <span> Created At : {createdAt}</span>}
                {updatedAt && <span> Updated At : {updatedAt}</span>}
            </div>
            <h4 className='status'>Status : {status}</h4>
        </Style>
    )
};
export default PostAdminQuickAccessBar;
