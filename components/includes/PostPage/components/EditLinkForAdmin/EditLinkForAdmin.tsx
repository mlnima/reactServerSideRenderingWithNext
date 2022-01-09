import styled from "styled-components";
import {adminBulkActionPost} from "../../../../../store/adminActions/adminPanelPostsActions";
import React from "react";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import Draggable from 'react-draggable';

const EditLinkForAdminStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px;
  background-color: var(--popup-background-color, #191919);
  //height: 40px;
  padding: 10px;
  top: 0;
  border-radius: 3px;
  .btn-primary{
    color: var(--primary-button-link-text-color);
  }
  .status{
    margin: 0 10px;
  }
  .edit-as-admin-handler{
    padding: 5px;
    margin: 5px;
    svg{
      width: 20px;
      height: 20px;
    }
  }
`

interface EditLinkForAdminPropTypes{
    _id:string,
    status:string
}

const EditLinkForAdmin = ({_id,status}:EditLinkForAdminPropTypes) => {
    const router = useRouter()
    const dispatch = useDispatch()
        return (
            <Draggable handle=".edit-as-admin-handler">
                <EditLinkForAdminStyledDiv className='edit-as-admin'>
                    <a className='btn btn-primary' href={`/admin/post?id=${_id}`} target='_blank'>
                        Edit As Admin
                    </a>
                    <span className={'btn btn-danger'} onClick={() => dispatch(adminBulkActionPost([_id], 'trash',router))}>Trash</span>
                    <span className={'btn btn-info'} onClick={() => dispatch(adminBulkActionPost([_id], 'draft',router))}>Draft</span>
                    <span className={'btn btn-info'} onClick={() => dispatch(adminBulkActionPost([_id], 'pending',router))}>Pending</span>
                    <span className={'btn btn-primary'} onClick={() => dispatch(adminBulkActionPost([_id], 'published',router))}>Publish</span>
                    <h4 className='status'>Status : {status}</h4>
                    <div className={'edit-as-admin-handler'}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </div>
                </EditLinkForAdminStyledDiv>
            </Draggable>
        )
};
export default EditLinkForAdmin;
