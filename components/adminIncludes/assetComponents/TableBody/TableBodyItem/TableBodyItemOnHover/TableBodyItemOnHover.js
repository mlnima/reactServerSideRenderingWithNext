import React, { useEffect, useState, useContext, useRef } from 'react';
import withRouter from 'next/dist/client/with-router'
import { AppContext } from '../../../../../../context/AppContext'
import Link from 'next/link'

const TableBodyItemOnHover = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    const reGetData = () => {
        props.router.push({ pathname: props.router.pathname, query: { ...props.router.query } })
    }

    if (props.isHover) {
        // console.log(props)
        if (props.assetsType === 'posts') {

            if (!props.router.query.status || props.router.query.status === 'published' || props.router.query.status === 'all') {
                return (
                    <div className='asset-page-table-body-item-hover-item'>
                        <Link href={ '/admin/post?id=' + props._id }><a>Edit</a></Link>
                        <Link href={ '/' + props.title }><a>View</a></Link>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'trash').then(()=>reGetData())  }>Trash</button>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'draft').then(()=>reGetData()) }>Draft</button>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'pending').then(()=>reGetData()) }>Pending</button>

                    </div>
                );
            } else if (props.router.query.status === 'trash') {
                return (
                    <div className='asset-page-table-body-item-hover-item'>
                        <Link href={ '/admin/post?id=' + props._id }><a>Edit</a></Link>
                        <Link href={ '/' + props.title }><a>View</a></Link>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'delete').then(()=>reGetData()) }>Delete</button>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'draft').then(()=>reGetData()) }>Draft</button>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'pending').then(()=>reGetData()) }>Pending</button>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'published').then(()=>reGetData()) }>Publish</button>

                    </div>
                );
            } else if (props.router.query.status === 'draft') {
                return (
                    <div className='asset-page-table-body-item-hover-item'>
                        <Link href={ '/admin/post?id=' + props._id }><a>Edit</a></Link>
                        <Link href={ '/' + props.title }><a>View</a></Link>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'trash').then(()=>reGetData()) }>Trash</button>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'pending').then(()=>reGetData()) }>Pending</button>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'published').then(()=>reGetData()) }>Publish</button>

                    </div>
                );
            } else if (props.router.query.status === 'pending') {
                return (
                    <div className='asset-page-table-body-item-hover-item'>
                        <Link href={ '/admin/post?id=' + props._id }><a>Edit</a></Link>
                        <Link href={ '/' + props.title }><a>View</a></Link>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'trash').then(()=>reGetData()) }>Trash</button>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'draft').then(()=>reGetData()) }>Draft</button>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'published').then(()=>reGetData()) }>Publish</button>

                    </div>
                );
            } else if (props.router.query.status === 'reported') {
                return (
                    <div className='asset-page-table-body-item-hover-item'>
                        <Link href={ '/admin/post?id=' + props._id }><a>Edit</a></Link>
                        <Link href={ '/' + props.title }><a>View</a></Link>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'trash').then(()=>reGetData()) }><span>Trash</span></button>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'pending').then(()=>reGetData()) }><span>Pending</span></button>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'draft').then(()=>reGetData()) }><span>Draft</span></button>
                        <button onClick={ () => contextData.functions.bulkActionPost([ props._id ], 'published').then(()=>reGetData()) }><span>Publish</span></button>
                    </div>
                );
            } else return null

        } else if (props.assetsType === 'users') {
            return (
                <div className='asset-page-table-body-item-hover-item'>
                    <Link href={ '/admin/user?id=' + props._id }><a>Edit</a></Link>
                </div>
            );
        } else if (props.assetsType === 'comments') {
            return (
                <div className='asset-page-table-body-item-hover-item'>
                    comments
                </div>
            );
        }

    } else {
        return(
            <div className='asset-page-table-body-item-hover-item'>

            </div>
        )
    }

};
export default withRouter(TableBodyItemOnHover);
