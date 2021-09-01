import React, {useEffect, useState, useContext, useRef} from 'react';
import {useRouter} from "next/router";
import {AppContext} from '../../../../../../context/AppContext'
import Link from 'next/link';
import {deleteMeta} from '../../../../../../_variables/ajaxPostsVariables'
import {deletePage} from "../../../../../../_variables/ajaxVariables";
import {post} from "superagent/lib/client";

const TableBodyItemOnHover = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const reGetData = () => {
        router.push({pathname: router.pathname, query: {...router.query}})
    }

    if (props.isHover) {
        if (props.assetsType === 'posts') {
            const status = router.query.status
            return (
                <div className='asset-page-table-body-item-hover-item'>
                    <Link href={'/admin/post?id=' + props._id}><a>Edit</a></Link>
                    <Link href={'/' + props.title}><a>View</a></Link>
                    {status !== 'trash' ? <span onClick={() => contextData.functions.bulkActionPost([props._id], 'trash').then(() => reGetData())}>Trash</span> : null}
                    {status !== 'draft' ? <span onClick={() => contextData.functions.bulkActionPost([props._id], 'draft').then(() => reGetData())}>Draft</span> : null}
                    {status !== 'pending' ? <span onClick={() => contextData.functions.bulkActionPost([props._id], 'pending').then(() => reGetData())}>Pending</span> : null}
                    {status === 'trash' ? <span onClick={() => contextData.functions.bulkActionPost([props._id], 'delete').then(() => reGetData())}>Delete</span> : null}
                    {status !== 'published' || status !== 'all' || !status ? <span onClick={() => contextData.functions.bulkActionPost([props._id], 'published').then(() => reGetData())}>Publish</span> : null}
                </div>
            )
        } else if (props.assetsType === 'users') {
            return (
                <div className='asset-page-table-body-item-hover-item'>
                    <Link href={'/admin/user?id=' + props._id}><a>Edit</a></Link>
                </div>
            );
        } else if (props.assetsType === 'comments') {
            return (
                <div className='asset-page-table-body-item-hover-item'>
                    comments
                </div>
            );
        } else if (props.assetsType === 'metas') {
            return (
                <div className='asset-page-table-body-item-hover-item'>
                    <Link href={'/admin/meta?id=' + props._id}><a>Edit</a></Link>

                </div>
            );
        } else if (props.assetsType === 'forms') {
            return (
                <div className='asset-page-table-body-item-hover-item'>
                    <Link href={'/admin/form/' + props._id}><a>Edit</a></Link>
                    <span onClick={() => deleteMeta(props._id).then(() => reGetData())}>Delete</span>
                </div>
            );
        } else if (props.assetsType === 'pages') {
            return (
                <div className='asset-page-table-body-item-hover-item'>
                    <Link href={'/admin/page?id=' + props._id}><a>Edit</a></Link>
                    <span onClick={() => deletePage(props._id).then(() => reGetData())}>Delete</span>
                </div>
            );
        } else {
            return (
                <div className='asset-page-table-body-item-hover-item'>

                </div>
            )
        }

    } else {
        return (
            <div className='asset-page-table-body-item-hover-item'>

            </div>
        )
    }

};
export default TableBodyItemOnHover;
