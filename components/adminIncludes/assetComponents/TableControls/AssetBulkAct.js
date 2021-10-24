import React, {useRef} from 'react';
import withRouter from 'next/dist/client/with-router'
import {bulkAction} from "../../../../_variables/ajaxPostsVariables";
import {adminBulkActionPost} from "../../../../store/actions/adminPanelPostsActions";
import {useDispatch} from "react-redux";

const AssetBulkAct = props => {
    const dispatch = useDispatch()
        const bulkActionSelect = useRef(null)
        const reGetData = () => {
            props.router.push({pathname: props.router.pathname, query: {...props.router.query}})
        }


        const onApplyHandler = () => {
            switch (props.router.query.assetsType) {
                case 'posts':
                    dispatch(adminBulkActionPost(props.selectedItems || [], bulkActionSelect.current.value))
                    props.setSelectedItems([])
                    break
                case 'metas':
                    bulkAction('metas', bulkActionSelect.current.value, props.selectedItems).then(() => {
                        props.setSelectedItems([])
                        reGetData()
                    })
                    break
                default:
                    break
            }
        }

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

    }
;
export default withRouter(AssetBulkAct);
