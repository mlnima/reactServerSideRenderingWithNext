import React, {useRef} from 'react';
import withRouter from 'next/dist/client/with-router'
import {bulkAction} from "../../../../_variables/ajaxPostsVariables";
import {adminBulkActionPost} from "../../../../store/adminActions/adminPanelPostsActions";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import {setAlert} from "../../../../store/actions/globalStateActions";
import {useRouter} from "next/router";
import {reloadPageDataByAddingQuery} from "../../../../store/adminActions/adminPanelGlobalStateActions";

const AssetBulkActStyledSelect = styled.select`
  width: 150px;

  .btn-navigation {
    margin: 0 2px;
  }

`

const AssetBulkAct = props => {
    const dispatch = useDispatch()
    const router = useRouter()
    const bulkActionSelect = useRef(null)
    const reGetData = () => {
        router.push({pathname: router.pathname, query: {...router.query}})
    }


    const onApplyHandler = () => {
        if (props.selectedItems.length && bulkActionSelect?.current?.value){
            switch (router.query.assetsType) {
                case 'posts':
                    dispatch(adminBulkActionPost(props.selectedItems || [], bulkActionSelect.current.value))
                    props.setSelectedItems([])
                    // bulkActionSelect?.current?.value = ''
                    setTimeout(()=> dispatch(reloadPageDataByAddingQuery(router)),1000)

                    break
                case 'metas':
                    bulkAction('metas', bulkActionSelect.current.value, props.selectedItems).then(() => {
                        props.setSelectedItems([])
                        // bulkActionSelect?.current?.setValue('')
                        reGetData()
                    })
                    break
                default:
                    break
            }
        }else{
            dispatch(setAlert({message: 'No Item Or Status is Selected',type: 'warning',active:true}))
            // bulkActionSelect?.current?.value = ''
        }

    }

    // if (!router.query.status || router.query.status === 'all' || router.query.status === 'published') {
    //     return (
    //             <AssetBulkActStyledSelect className={'custom-select'} ref={bulkActionSelect} placeholder='Bulk Actions' onChange={onApplyHandler}>
    //                 <option value='none'>Bulk Actions</option>
    //                 <option value='published'>Published</option>
    //                 <option value='draft'>Draft</option>
    //                 <option value='trash'>Trash</option>
    //             </AssetBulkActStyledSelect>
    //     )
    // } else if (router.query.status === 'trash') {
    //     return (
    //
    //             <AssetBulkActStyledSelect className={'custom-select'} ref={bulkActionSelect} placeholder='Bulk Actions' onChange={onApplyHandler}>
    //                 <option value='none'>Bulk Actions</option>
    //                 <option value='published'>Published</option>
    //                 <option value='draft'>Draft</option>
    //                 <option value='delete'>Delete</option>
    //             </AssetBulkActStyledSelect>
    //
    //     )
    // } else if (router.query.status === 'draft') {
    //     return (
    //
    //             <AssetBulkActStyledSelect className={'custom-select'} ref={bulkActionSelect} placeholder='Bulk Actions' onChange={onApplyHandler}>
    //                 <option value='none'>Bulk Actions</option>
    //                 <option value='published'>Published</option>
    //                 <option value='trash'>Trash</option>
    //             </AssetBulkActStyledSelect>
    //
    //     )
    // } else if (router.query.status === 'pending') {
    //     return (
    //
    //             <AssetBulkActStyledSelect className={'custom-select'} ref={bulkActionSelect} placeholder='Bulk Actions' onChange={onApplyHandler}>
    //                 <option value='none'>Bulk Actions</option>
    //                 <option value='published'>Published</option>
    //                 <option value='pending'>Pending</option>
    //                 <option value='draft'>Draft</option>
    //                 <option value='trash'>Trash</option>
    //             </AssetBulkActStyledSelect>
    //
    //     )
    // } else if (router.query.status === 'reported') {
    //     return (
    //
    //             <AssetBulkActStyledSelect className={'custom-select'} ref={bulkActionSelect} placeholder='Bulk Actions' onChange={onApplyHandler}>
    //                 <option value='none'>Bulk Actions</option>
    //                 <option value='published'>Published</option>
    //                 <option value='draft'>Draft</option>
    //                 <option value='trash'>Trash</option>
    //                 <option value='pending'>Pending</option>
    //                 <option value='delete'>Delete</option>
    //             </AssetBulkActStyledSelect>
    //
    //     )
    // } else return null

    return (

        <AssetBulkActStyledSelect className={'custom-select'} ref={bulkActionSelect} placeholder='Bulk Actions' onChange={onApplyHandler}>
            <option value=''>Bulk Actions</option>
            {router.query.status !== 'published' ? <option value='published'>Published</option> : null}
            {router.query.status !== 'draft' ? <option value='draft'>Draft</option> : null}
            {router.query.status !== 'trash' ? <option value='trash'>Trash</option> : null}
            {router.query.status !== 'pending' ?   <option value='pending'>Pending</option> : null}
            {router.query.status === 'trash' ?    <option value='delete'>Delete</option> : null}
        </AssetBulkActStyledSelect>

    )


};
export default AssetBulkAct;
