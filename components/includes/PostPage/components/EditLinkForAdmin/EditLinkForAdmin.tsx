import  {FC} from "react";
import styled from "styled-components";
import {adminBulkActionPost} from "@store/adminActions/adminPanelPostsActions";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons/faEllipsisV";
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

const EditLinkForAdmin :FC = () => {

    const {query, push, pathname} = useRouter()
    const {_id,status} = useSelector(({posts}:StoreTypes)=>{
        return{
            _id:posts.post?._id,
            status:posts.post?.status,
        }
    })

    const onStatusChangeHandler = (status)=>{
        dispatch(adminBulkActionPost([_id], status))
        dispatch(reloadPageDataByAddingQuery(query, push, pathname))
    }

    const dispatch = useDispatch()
        return (
            <Draggable handle=".edit-as-admin-handler">
                <EditLinkForAdminStyledDiv className='edit-as-admin'>
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
                    <span className={'btn btn-info'}  onClick={() => onStatusChangeHandler('pending')}>
                        Pending
                    </span>
                    <span className={'btn btn-primary'}  onClick={() => onStatusChangeHandler('published')}>
                        Publish
                    </span>
                    <h4 className='status'>Status : {status}</h4>
                    <div className={'edit-as-admin-handler'}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </div>
                </EditLinkForAdminStyledDiv>
            </Draggable>

        )
};
export default EditLinkForAdmin;
