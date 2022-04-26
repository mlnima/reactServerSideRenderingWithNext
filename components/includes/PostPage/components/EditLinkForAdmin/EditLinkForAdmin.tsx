import React, {FC} from "react";
import styled from "styled-components";
import {adminBulkActionPost} from "@store/adminActions/adminPanelPostsActions";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import Draggable from 'react-draggable';
import {reloadPageDataByAddingQuery} from "@store/adminActions/adminPanelGlobalStateActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

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
    const nodeRef = React.useRef(null);
    const {query, push, pathname} = useRouter()
    const {_id, status, createdAt, updatedAt} = useSelector(({posts}: StoreTypes) => {
        return {
            _id: posts.post?._id,
            status: posts.post?.status,
            createdAt: posts.post?.createdAt,
            updatedAt: posts.post?.updatedAt,
        }
    })

    const onStatusChangeHandler = (status) => {
        dispatch(adminBulkActionPost([_id], status))
        dispatch(reloadPageDataByAddingQuery(query, push, pathname))
    }

    const dispatch = useDispatch()
    return (
        <Draggable nodeRef={nodeRef}>
            <EditLinkForAdminStyledDiv className='edit-as-admin' ref={nodeRef}>
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
        </Draggable>

    )
};
export default EditLinkForAdmin;
