import React, {useEffect, useState, useContext, useRef} from 'react';
import {useRouter} from "next/router";
import {AppContext} from '../../../../../../context/AppContext'
import Link from 'next/link';
import {deleteMeta} from '../../../../../../_variables/ajaxPostsVariables'
import {deletePage} from "../../../../../../_variables/ajaxVariables";

const TableBodyItemOnHover = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
 
    
    const reGetData = () => {
        router.push({pathname: router.pathname, query: {...router.query}})
    }

    if (props.isHover) {
        if (props.assetsType === 'posts') {
            if (!router.query.status || router.query.status === 'published' || router.query.status === 'all') {
                return (
                    <div className='asset-page-table-body-item-hover-item'>
                        <Link href={'/admin/post?id=' + props._id}><a>Edit</a></Link>
                        <Link href={'/' + props.title}><a>View</a></Link>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'trash').then(() => reGetData())}>Trash</button>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'draft').then(() => reGetData())}>Draft</button>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'pending').then(() => reGetData())}>Pending</button>

                    </div>
                );
            } else if (router.query.status === 'trash') {
                return (
                    <div className='asset-page-table-body-item-hover-item'>
                        <Link href={'/admin/post?id=' + props._id}><a>Edit</a></Link>
                        <Link href={'/' + props.title}><a>View</a></Link>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'delete').then(() => reGetData())}>Delete</button>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'draft').then(() => reGetData())}>Draft</button>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'pending').then(() => reGetData())}>Pending</button>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'published').then(() => reGetData())}>Publish</button>

                    </div>
                );
            } else if (router.query.status === 'draft') {
                return (
                    <div className='asset-page-table-body-item-hover-item'>
                        <Link href={'/admin/post?id=' + props._id}><a>Edit</a></Link>
                        <Link href={'/' + props.title}><a>View</a></Link>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'trash').then(() => reGetData())}>Trash</button>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'pending').then(() => reGetData())}>Pending</button>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'published').then(() => reGetData())}>Publish</button>

                    </div>
                );
            } else if (router.query.status === 'pending') {
                return (
                    <div className='asset-page-table-body-item-hover-item'>
                        <Link href={'/admin/post?id=' + props._id}><a>Edit</a></Link>
                        <Link href={'/' + props.title}><a>View</a></Link>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'trash').then(() => reGetData())}>Trash</button>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'draft').then(() => reGetData())}>Draft</button>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'published').then(() => reGetData())}>Publish</button>

                    </div>
                );
            } else if (router.query.status === 'reported') {
                return (
                    <div className='asset-page-table-body-item-hover-item'>
                        <Link href={'/admin/post?id=' + props._id}><a>Edit</a></Link>
                        <Link href={'/' + props.title}><a>View</a></Link>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'trash').then(() => reGetData())}><span>Trash</span></button>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'pending').then(() => reGetData())}><span>Pending</span></button>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'draft').then(() => reGetData())}><span>Draft</span></button>
                        <button onClick={() => contextData.functions.bulkActionPost([props._id], 'published').then(() => reGetData())}><span>Publish</span></button>
                    </div>
                );
            } else return null

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
                    <button onClick={() => deleteMeta(props._id, window.location.origin).then(() => reGetData())}>Delete</button>
                </div>
            );
        } else if (props.assetsType === 'forms') {
            return (
                <div className='asset-page-table-body-item-hover-item'>
                    <Link href={'/admin/form/' + props._id}><a>Edit</a></Link>
                    <button onClick={() => deleteMeta(props._id, window.location.origin).then(() => reGetData())}>Delete</button>
                </div>
            );
        } else if (props.assetsType === 'pages') {
            return (
                <div className='asset-page-table-body-item-hover-item'>
                    <Link href={'/admin/page?id=' + props._id}><a>Edit</a></Link>
                    <button onClick={() => deletePage(props._id, window.location.origin).then(() => reGetData())}>Delete</button>
                </div>
            );
        }else {
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
