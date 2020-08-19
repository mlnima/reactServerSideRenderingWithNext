import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from '../../../../../context/AppContext'
import withRouter from 'next/dist/client/with-router'
import {bulkAction} from "../../../../../_variables/ajaxPostsVariables";

const AssetBulkAct = props => {
        const contextData = useContext(AppContext);
        const bulkActionSelect = useRef(null)
        // const [ state, setState ] = useState({
        //     selectedBulkAction: ''
        // });

        const reGetData = () => {
            props.router.push({pathname: props.router.pathname, query: {...props.router.query}})
        }

        useEffect(() => {
            console.log(props)
        }, [props]);

        const onApplyHandler = () => {
            switch (props.router.query.assetsType) {
                case 'posts':
                    contextData.functions.bulkActionPost(props.selectedItems, bulkActionSelect.current.value).then(() => {
                        props.setSelectedItems([])
                        reGetData()
                    })
                    break
                case 'metas':
                    bulkAction(window.location.origin,'metas',bulkActionSelect.current.value,props.selectedItems).then(()=>{
                        props.setSelectedItems([])
                        reGetData()
                    })
                    break
                default:
                    break
            }
        }

        // if (props.router.query.assetsType === 'posts') {

            if (!props.router.query.status || props.router.query.status === 'all' || props.router.query.status === 'published') {
                return (
                    <div className='asset-page-bulk-action-drop-down'>
                        <select ref={bulkActionSelect} placeholder='Bulk Actions'>
                            <option value='none'>Bulk Actions</option>
                            <option value='published'>Published</option>
                            <option value='draft'>Draft</option>
                            <option value='trash'>Trash</option>
                        </select>
                        <button className='asset-page-bulk-action-drop-down-btn' onClick={() => onApplyHandler()}>Apply</button>
                    </div>
                )
            } else if (props.router.query.status === 'trash') {
                return (
                    <div className='asset-page-bulk-action-drop-down'>
                        <select ref={bulkActionSelect} placeholder='Bulk Actions'>
                            <option value='none'>Bulk Actions</option>
                            <option value='published'>Published</option>
                            <option value='draft'>Draft</option>
                            <option value='delete'>Delete</option>
                        </select>
                        <button className='asset-page-bulk-action-drop-down-btn' onClick={() => onApplyHandler()}>Apply</button>
                    </div>
                )
            } else if (props.router.query.status === 'draft') {
                return (
                    <div className='asset-page-bulk-action-drop-down'>
                        <select ref={bulkActionSelect} placeholder='Bulk Actions'>
                            <option value='none'>Bulk Actions</option>
                            <option value='published'>Published</option>
                            <option value='trash'>Trash</option>
                        </select>
                        <button className='asset-page-bulk-action-drop-down-btn' onClick={() => onApplyHandler()}>Apply</button>
                    </div>
                )
            } else if (props.router.query.status === 'pending') {
                return (
                    <div className='asset-page-bulk-action-drop-down'>
                        <select ref={bulkActionSelect} placeholder='Bulk Actions'>
                            <option value='none'>Bulk Actions</option>
                            <option value='published'>Published</option>
                            <option value='pending'>Pending</option>
                            <option value='draft'>Draft</option>
                            <option value='trash'>Trash</option>
                        </select>
                        <button className='asset-page-bulk-action-drop-down-btn' onClick={() => onApplyHandler()}>Apply</button>
                    </div>
                )
            } else if (props.router.query.status === 'reported') {
                return (
                    <div className='asset-page-bulk-action-drop-down'>
                        <select ref={bulkActionSelect} placeholder='Bulk Actions'>
                            <option value='none'>Bulk Actions</option>
                            <option value='published'>Published</option>
                            <option value='draft'>Draft</option>
                            <option value='trash'>Trash</option>
                            <option value='pending'>Pending</option>
                            <option value='delete'>Delete</option>
                        </select>
                        <button className='asset-page-bulk-action-drop-down-btn' onClick={() => onApplyHandler()}>Apply</button>
                    </div>
                )
            } else return null

            // return (
            //     <div className='asset-page-bulk-action-drop-down'>
            //         <select ref={ bulkActionSelect } placeholder='Bulk Actions'>
            //             <option value='none'>Bulk Actions</option>
            //             <option value='published'>Published</option>
            //             <option value='draft'>Draft</option>
            //             <option value='trash'>Trash</option>
            //         </select>
            //         <button className='asset-page-bulk-action-drop-down-btn' onClick={ () => onApplyHandler() }>Apply</button>
            //     </div>
            // );
        // } else if (props.router.query.assetsType === 'comments') {
        //     return (
        //         <div className='asset-page-bulk-action-drop-down'>
        //             <select ref={bulkActionSelect} placeholder='Bulk Actions'>
        //                 <option value='none'>Bulk Actions</option>
        //                 <option value='published'>Published</option>
        //                 <option value='draft'>Draft</option>
        //                 <option value='trash'>Trash</option>
        //             </select>
        //             <button className='asset-page-bulk-action-drop-down-btn' onClick={() => onApplyHandler()}>Apply</button>
        //         </div>
        //     );
        // } else if (props.router.query.assetsType === 'users') {
        //     return (
        //         <div className='asset-page-bulk-action-drop-down'>
        //             <select ref={bulkActionSelect} placeholder='Bulk Actions'>
        //                 <option value='none'>Bulk Actions</option>
        //                 <option value='active'>Published</option>
        //                 <option value='banned'>Draft</option>
        //                 <option value='pending'>Trash</option>
        //             </select>
        //             <button className='asset-page-bulk-action-drop-down-btn' onClick={() => onApplyHandler()}>Apply</button>
        //         </div>
        //     );
        // } else if (props.router.query.assetsType === 'metas') {
        //     return (
        //         <div className='asset-page-bulk-action-drop-down'>
        //             <select ref={bulkActionSelect} placeholder='Bulk Actions'>
        //                 <option value='none'>Bulk Actions</option>
        //                 <option value='published'>Published</option>
        //                 <option value='draft'>Draft</option>
        //                 <option value='trash'>Trash</option>
        //             </select>
        //             <button className='asset-page-bulk-action-drop-down-btn' onClick={() => onApplyHandler()}>Apply</button>
        //         </div>
        //     );
        // } else return null

    }
;
export default withRouter(AssetBulkAct);
