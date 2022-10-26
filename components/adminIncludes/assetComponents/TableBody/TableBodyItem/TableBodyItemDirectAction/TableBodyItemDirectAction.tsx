import React, {FC} from 'react';
import {useRouter} from "next/router";
import Link from 'next/link';
import {fetchAdminPanelBulkActionPost} from "@store_toolkit/adminReducers/adminPanelPostsReducer";
import {fetchAdminDeleteForm} from "@store_toolkit/adminReducers/adminPanelFormsReducer";
import {fetchAdminPanelDeleteComments} from "@store_toolkit/adminReducers/adminCommentsReducer";
import {updateQueryGenerator} from "@_variables/_variables";
import {useAdminDispatch} from "@store_toolkit/hooks";

interface TableBodyItemDirectActionPropTypes {
    assetsType: string,
    _id: string,
    postType: string,
    title: string,
}

const TableBodyItemDirectAction: FC<TableBodyItemDirectActionPropTypes> = ({assetsType, _id, postType, title}) => {
    const dispatch = useAdminDispatch()
    const {query, push, pathname} = useRouter()



    const onDeletePageHandler=()=>{
        // dispatch(adminDeleteCustomPage(_id))
        // reGetData()
    }

    const onActionHandler =(ids,status)=>{
        dispatch(fetchAdminPanelBulkActionPost({ids,status}))
        updateQueryGenerator(query,push,pathname)
    }


    if (assetsType === 'posts') {
        const status = query.status as string
        return (
            <div className='asset-page-table-body-item-hover-item'>
                <Link href={'/admin/post?id=' + _id} className={'btn btn-info'}>Edit</Link>
                <Link href={`/post/${postType}/${_id}`} target={'_blank'} className={'btn btn-info'}>View</Link>
                {status !== 'trash' ?
                    <span className={'btn btn-danger'}
                          onClick={() => onActionHandler([_id],'trash') }
                    >
                            Trash
                        </span>
                    : null
                }
                {status !== 'draft' ?
                    <span className={'btn btn-info'}
                          onClick={() => onActionHandler([_id],'draft') }
                    >
                            Draft
                        </span>
                    : null
                }
                {status !== 'pending' ?
                    <span className={'btn btn-info'}
                          onClick={() =>onActionHandler([_id],'pending')  }
                    >
                            Pending
                        </span>
                    : null
                }
                {status === 'trash' ?
                    <span className={'btn btn-info'}
                          onClick={() => onActionHandler([_id],'delete') }
                    >
                            Delete
                        </span>
                    : null
                }
                {status !== 'published' || !status ?
                    <span className={'btn btn-primary'}
                          onClick={() => onActionHandler([_id],'published')}
                    >
                            Publish
                        </span>
                    : null
                }
            </div>
        )
    } else if (assetsType === 'users') {
        return (
            <div className='asset-page-table-body-item-hover-item'>
                <Link href={'/admin/user?id=' + _id}>Edit</Link>
            </div>
        );
    } else if (assetsType === 'comments') {
        return (
            <div className='asset-page-table-body-item-hover-item'>
                <button className={'btn btn-danger'} onClick={()=>{
                    dispatch(fetchAdminPanelDeleteComments([_id]))
                    updateQueryGenerator(query,push,pathname)
                }}>
                    Delete
                </button>
            </div>
        );
    } else if (assetsType === 'metas') {
        return (
            <div className='asset-page-table-body-item-hover-item'>
                <Link href={'/admin/meta?id=' + _id} className={'btn btn-info'}>Edit</Link>
            </div>
        );
    } else if (assetsType === 'forms') {
        return (
            <div className='asset-page-table-body-item-hover-item'>
                <Link href={'/admin/form/' + _id}>Edit</Link>
                <span className={'btn btn-danger'} onClick={() => {
                    dispatch(fetchAdminDeleteForm(_id))
                    updateQueryGenerator(query,push,pathname)
                }}>Delete</span>
            </div>
        );
    } else if (assetsType === 'pages') {
        return (
            <div className='asset-page-table-body-item-hover-item'>
                <Link href={'/admin/page?id=' + _id}>Edit</Link>
                {/*<span className={'btn btn-danger'}*/}
                {/*      onClick={onDeletePageHandler}*/}
                {/*>*/}
                {/*    Delete*/}
                {/*</span>*/}
            </div>
        );
    } else {
        return (
            <div className='asset-page-table-body-item-hover-item'>

            </div>
        )
    }
};
export default TableBodyItemDirectAction;
