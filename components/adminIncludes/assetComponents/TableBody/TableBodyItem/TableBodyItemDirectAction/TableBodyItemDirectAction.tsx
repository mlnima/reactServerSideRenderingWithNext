import React, {FC} from 'react';
import {useRouter} from "next/router";
import Link from 'next/link';
import {deletePage} from "@_variables/ajaxVariables";
import {useDispatch} from "react-redux";
import {adminBulkActionPost, adminDeleteMeta} from "@store/adminActions/adminPanelPostsActions";
import {reloadPageDataByAddingQuery} from "@store/adminActions/adminPanelGlobalStateActions";

interface TableBodyItemDirectActionPropTypes {
    assetsType: string,
    _id: string,
    postType: string,
    title: string,
}

const TableBodyItemDirectAction: FC<TableBodyItemDirectActionPropTypes> = ({assetsType, _id, postType, title}) => {
    const dispatch = useDispatch()
    const {query, push, pathname} = useRouter()

    const reGetData = () => {
        setTimeout(() => dispatch(reloadPageDataByAddingQuery(query, push, pathname)), 1000)
    }


    if (assetsType === 'posts') {
        const status = query.status as string
        return (
            <div className='asset-page-table-body-item-hover-item'>
                <Link href={'/admin/post?id=' + _id}><a className={'btn btn-info'}>Edit</a></Link>
                <Link href={`/post/${postType}/${_id}`}><a target={'_blank'} className={'btn btn-info'}>View</a></Link>
                {status !== 'trash' ?
                    <span className={'btn btn-danger'}
                          onClick={() => dispatch(adminBulkActionPost([_id], 'trash'))}
                    >
                            Trash
                        </span>
                    : null
                }
                {status !== 'draft' ?
                    <span className={'btn btn-info'}
                          onClick={() => dispatch(adminBulkActionPost([_id], 'draft'))}
                    >
                            Draft
                        </span>
                    : null
                }
                {status !== 'pending' ?
                    <span className={'btn btn-info'}
                          onClick={() => dispatch(adminBulkActionPost([_id], 'pending'))}
                    >
                            Pending
                        </span>
                    : null
                }
                {status === 'trash' ?
                    <span className={'btn btn-info'}
                          onClick={() => dispatch(adminBulkActionPost([_id], 'delete'))}
                    >
                            Delete
                        </span>
                    : null
                }
                {status !== 'published' || !status ?
                    <span className={'btn btn-primary'}
                          onClick={() => dispatch(adminBulkActionPost([_id], 'published'))}
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
                <Link href={'/admin/user?id=' + _id}><a>Edit</a></Link>
            </div>
        );
    } else if (assetsType === 'comments') {
        return (
            <div className='asset-page-table-body-item-hover-item'>
                comments
            </div>
        );
    } else if (assetsType === 'metas') {
        return (
            <div className='asset-page-table-body-item-hover-item'>
                <Link href={'/admin/meta?id=' + _id}><a className={'btn btn-info'}>Edit</a></Link>
            </div>
        );
    } else if (assetsType === 'forms') {
        return (
            <div className='asset-page-table-body-item-hover-item'>
                <Link href={'/admin/form/' + _id}><a>Edit</a></Link>
                <span className={'btn btn-danger'} onClick={() => dispatch(adminDeleteMeta(_id))}>Delete</span>
            </div>
        );
    } else if (assetsType === 'pages') {
        return (
            <div className='asset-page-table-body-item-hover-item'>
                <Link href={'/admin/page?id=' + _id}><a>Edit</a></Link>
                <span className={'btn btn-danger'}
                      onClick={() => deletePage(_id).then(() => reGetData())}
                >
                    Delete
                </span>
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
