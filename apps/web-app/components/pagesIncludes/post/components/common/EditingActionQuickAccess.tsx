import React, {FC} from "react";
import styled from "styled-components";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {fetchAdminPanelBulkActionPost} from "@store_toolkit/adminReducers/adminPanelPostsReducer";
import {updateQueryGenerator} from "@_variables/variables";
import {useAppDispatch} from "@store_toolkit/hooks";
import {Store} from "typescript-types";
import {formatDistance} from 'date-fns';


const EditLinkForAdminStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: var(--secondary-background-color, #181818);
  padding: 10px;
  top: 0;
  border-radius: 3px;
  box-sizing: border-box;
  margin: 8px 0;

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
    role: string
}

const EditingActionQuickAccess: FC<PropTypes> = ({role}) => {
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
        dispatch(fetchAdminPanelBulkActionPost({ids: [_id], status}))
        updateQueryGenerator(query, push, pathname)
    }


    return (

            <EditLinkForAdminStyledDiv className='edit-as-admin handle'>

                <a className='btn btn-primary' href={`/profile/post?id=${_id}`} target='_blank'>
                    Edit
                </a>

                {
                    role === 'administrator' &&
                    <>
                        <a className='btn btn-primary' href={`/admin/post?id=${_id}`} target='_blank'>
                            Edit As Admin
                        </a>
                        <span className={'btn btn-info'} onClick={() => onStatusChangeHandler('draft')}>
                            Draft
                        </span>
                        <span className={'btn btn-primary'} onClick={() => onStatusChangeHandler('published')}>
                            Publish
                        </span>
                        <span className={'btn btn-info'} onClick={() => onStatusChangeHandler('pending')}>
                        Pending
                        </span>
                    </>
                }
                <span className={'btn btn-danger'} onClick={() => onStatusChangeHandler('trash')}>
                        Trash
                </span>



                <div className={'dates'}>
                    {createdAt && <span> Created At : {formatDistance(new Date(createdAt), new Date(), {addSuffix: true})}</span>}
                    {createdAt &&  <span> Updated At : {formatDistance(new Date(updatedAt), new Date(), {addSuffix: true})}</span>}


                </div>

                <h4 className='status'>Status : {status}</h4>

            </EditLinkForAdminStyledDiv>


    )
};
export default EditingActionQuickAccess;
