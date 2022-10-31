import React, {FC} from "react";
import styled from "styled-components";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import Draggable from 'react-draggable';
import {fetchAdminPanelBulkActionPost} from "@store_toolkit/adminReducers/adminPanelPostsReducer";
import {updateQueryGenerator} from "@_variables/variables";
import {useAppDispatch} from "@store_toolkit/hooks";
import {Store} from "typescript-types";

const EditLinkForAdminStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px;
  background-color: var(--popup-background-color, #191919);
  padding: 10px;
  top: 0;
  border-radius: 3px;
  //position: fixed;

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

const EditLinkForAdmin: FC = () => {
    const dispatch = useAppDispatch()
    const {query, push, pathname} = useRouter()
    const {_id, status, createdAt, updatedAt} = useSelector(({posts}: Store) => {
        return {
            _id: posts.post?._id,
            status: posts.post?.status,
            createdAt: posts.post?.createdAt,
            updatedAt: posts.post?.updatedAt,
        }
    })

    const onStatusChangeHandler = (status) => {
        dispatch(fetchAdminPanelBulkActionPost({ids:[_id], status}))
        updateQueryGenerator(query, push, pathname)
    }


    return (
        <div>
            <EditLinkForAdminStyledDiv className='edit-as-admin handle'>
                <a className='btn btn-primary' href={`/admin/post?id=${_id}`} target='_blank'>
                    Edit As Admin
                </a>
                <a className='btn btn-primary' href={`/profile/post?id=${_id}`} target='_blank'>
                    Edit As Author (Beta)
                </a>
                <span className={'btn btn-danger'} onClick={() => onStatusChangeHandler('trash')}>
                        Trash
                    </span>
                <span className={'btn btn-info'} onClick={() => onStatusChangeHandler('draft')}>
                        Draft
                    </span>
                <span className={'btn btn-info'} onClick={() => onStatusChangeHandler('pending')}>
                        Pending
                    </span>
                <span className={'btn btn-primary'} onClick={() => onStatusChangeHandler('published')}>
                        Publish
                    </span>

                <div className={'dates'}>
                    <span> Created At : {createdAt}</span>
                    <span> Updated At : {updatedAt}</span>
                </div>

                <h4 className='status'>Status : {status}</h4>

            </EditLinkForAdminStyledDiv>
        </div>

    )
};
export default EditLinkForAdmin;
