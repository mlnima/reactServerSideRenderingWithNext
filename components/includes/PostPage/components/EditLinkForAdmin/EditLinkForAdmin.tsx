import Link from "next/link";
import styled from "styled-components";
import {adminBulkActionPost} from "../../../../../store/adminActions/adminPanelPostsActions";
import React from "react";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";

const EditLinkForAdminStyledDiv = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  justify-content: center;
  align-items: center;
  
  .btn-primary{
    color: var(--primary-button-link-text-color);
  }
  .status{
    margin: 0 10px;
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
            <EditLinkForAdminStyledDiv className='edit-as-admin'>

                {/*<Link href={`/admin/post?id=${_id}`}>*/}
                {/*    <a className='btn btn-primary'>*/}
                {/*        Edit as Admin*/}
                {/*    </a>*/}
                {/*</Link>*/}
                <a className='btn btn-primary' href={`/admin/post?id=${_id}`} target='_blank'>
                    Edit As Admin
                </a>
                <span className={'btn btn-danger'} onClick={() => dispatch(adminBulkActionPost([_id], 'trash',router))}>Trash</span>
                <span className={'btn btn-info'} onClick={() => dispatch(adminBulkActionPost([_id], 'draft',router))}>Draft</span>
                <span className={'btn btn-info'} onClick={() => dispatch(adminBulkActionPost([_id], 'pending',router))}>Pending</span>
                {/*<span className={'btn btn-info'} onClick={() => dispatch(adminBulkActionPost([_id], 'delete',router))}>Delete</span>*/}
                <span className={'btn btn-primary'} onClick={() => dispatch(adminBulkActionPost([_id], 'published',router))}>Publish</span>
                <h4 className='status'>Status : {status}</h4>

            </EditLinkForAdminStyledDiv>

        )
};
export default EditLinkForAdmin;
