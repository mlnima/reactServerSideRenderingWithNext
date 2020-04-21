import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../../../context/AppContext'

const AssetBulkAct = props => {
    const contextData = useContext(AppContext);
    const bulkActionSelect = useRef(null)
    const [ state, setState ] = useState({
        selectedBulkAction: ''
    });

    useEffect(() => {
        console.log(props)
    }, [ props ]);

    const reGetData = () => {
        props.router.push({ pathname: props.router.pathname, query: { ...props.router.query } })
    }

    const onApplyHandler = () => {
        switch ( props.query.assetsType ) {
            case 'posts':
                contextData.functions.bulkActionPost(props.selectedItems, bulkActionSelect.current.value).then(() => {
                    props.setSelectedItems([])
                    reGetData()
                })
                break
            default:
                
                break

        }

    }



if (props.query.assetsType === 'posts') {

    if (!props.query.status || props.query.status === 'all' || props.query.status === 'published') {
        return (
            <div className='asset-page-bulk-action-drop-down'>
                <select ref={ bulkActionSelect } placeholder='Bulk Actions'>
                    <option value='none'>Bulk Actions</option>
                    <option value='published'>Published</option>
                    <option value='draft'>Draft</option>
                    <option value='trash'>Trash</option>
                </select>
                <button className='asset-page-bulk-action-drop-down-btn' onClick={ () => onApplyHandler() }>Apply</button>
            </div>
        )
    } else if (props.query.status === 'trash') {
        return (
            <div className='asset-page-bulk-action-drop-down'>
                <select ref={ bulkActionSelect } placeholder='Bulk Actions'>
                    <option value='none'>Bulk Actions</option>
                    <option value='published'>Published</option>
                    <option value='draft'>Draft</option>
                    <option value='delete'>Delete</option>
                </select>
                <button className='asset-page-bulk-action-drop-down-btn' onClick={ () => onApplyHandler() }>Apply</button>
            </div>
        )
    } else if (props.query.status === 'draft') {
        return (
            <div className='asset-page-bulk-action-drop-down'>
                <select ref={ bulkActionSelect } placeholder='Bulk Actions'>
                    <option value='none'>Bulk Actions</option>
                    <option value='published'>Published</option>
                    <option value='trash'>Trash</option>
                </select>
                <button className='asset-page-bulk-action-drop-down-btn' onClick={ () => onApplyHandler() }>Apply</button>
            </div>
        )
    } else if (props.query.status === 'pending') {
        return (
            <div className='asset-page-bulk-action-drop-down'>
                <select ref={ bulkActionSelect } placeholder='Bulk Actions'>
                    <option value='none'>Bulk Actions</option>
                    <option value='published'>Published</option>
                    <option value='pending'>Pending</option>
                    <option value='draft'>Draft</option>
                    <option value='trash'>Trash</option>
                </select>
                <button className='asset-page-bulk-action-drop-down-btn' onClick={ () => onApplyHandler() }>Apply</button>
            </div>
        )
    } else if (props.query.status === 'reported') {
        return (
            <div className='asset-page-bulk-action-drop-down'>
                <select ref={ bulkActionSelect } placeholder='Bulk Actions'>
                    <option value='none'>Bulk Actions</option>
                    <option value='published'>Published</option>
                    <option value='draft'>Draft</option>
                    <option value='trash'>Trash</option>
                    <option value='pending'>Pending</option>
                    <option value='delete'>Delete</option>
                </select>
                <button className='asset-page-bulk-action-drop-down-btn' onClick={ () => onApplyHandler() }>Apply</button>
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
} else if (props.query.assetsType === 'comments') {
    return (
        <div className='asset-page-bulk-action-drop-down'>
            <select ref={ bulkActionSelect } placeholder='Bulk Actions'>
                <option value='none'>Bulk Actions</option>
                <option value='published'>Published</option>
                <option value='draft'>Draft</option>
                <option value='trash'>Trash</option>
            </select>
            <button className='asset-page-bulk-action-drop-down-btn' onClick={ () => onApplyHandler() }>Apply</button>
        </div>
    );
} else if (props.query.assetsType === 'users') {
    return (
        <div className='asset-page-bulk-action-drop-down'>
            <select ref={ bulkActionSelect } placeholder='Bulk Actions'>
                <option value='none'>Bulk Actions</option>
                <option value='published'>Published</option>
                <option value='draft'>Draft</option>
                <option value='trash'>Trash</option>
            </select>
            <button className='asset-page-bulk-action-drop-down-btn' onClick={ () => onApplyHandler() }>Apply</button>
        </div>
    );
} else return null

}
;
export default AssetBulkAct;
