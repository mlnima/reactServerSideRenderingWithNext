import React from 'react';
import {useRouter} from "next/router";
import Link from 'next/link';
import {deletePage} from "../../../../../../_variables/ajaxVariables";
import {useDispatch} from "react-redux";
import {adminBulkActionPost, adminDeleteMeta} from "../../../../../../store/actions/adminPanelPostsActions";

const TableBodyItemOnHover = props => {
    const dispatch = useDispatch()
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
                    <Link href={`/post/${props.postType}/${props._id}` }><a target={'_blank'}>View</a></Link>
                    {status !== 'trash' ? <span onClick={() => dispatch(adminBulkActionPost([props._id], 'trash'))}>Trash</span> : null}
                    {status !== 'draft' ? <span onClick={() => dispatch(adminBulkActionPost([props._id], 'draft'))}>Draft</span> : null}
                    {status !== 'pending' ? <span onClick={() => dispatch(adminBulkActionPost([props._id], 'pending'))}>Pending</span> : null}
                    {status === 'trash' ? <span onClick={() => dispatch(adminBulkActionPost([props._id], 'delete'))}>Delete</span> : null}
                    {status !== 'published' || status !== 'all' || !status ? <span onClick={() => dispatch(adminBulkActionPost([props._id], 'published'))}>Publish</span> : null}
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
                    <span onClick={() => dispatch(adminDeleteMeta(props._id)) }>Delete</span>
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
            <div className='asset-page-table-body-item-hover-item'/>
        )
    }

};
export default TableBodyItemOnHover;
