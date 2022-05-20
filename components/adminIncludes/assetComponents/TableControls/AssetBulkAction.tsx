import React, {FC, useState} from 'react';

// import {adminBulkActionMeta} from "@store/adminActions/adminPanelPostsActions";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import {setAlert} from "../../../../ZlegacyCodesAndComponents/store/clientActions/globalStateActions";
import {useRouter} from "next/router";
import {
    fetchAdminBulkActionMeta,
    fetchAdminPanelBulkActionPost
} from "@store_toolkit/adminReducers/adminPanelPostsReducer";
import {updateQueryGenerator} from "@_variables/_variables";

const AssetBulkActionStyledDiv = styled.div`
  select {
    width: 150px;

    .btn-navigation {
      margin: 0 2px;
    }
  }
`

interface AssetBulkActionPropTypes {
    selectedItems: any[]
    setSelectedItems: any,
}

const AssetBulkAction: FC<AssetBulkActionPropTypes> = ({selectedItems, setSelectedItems}) => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState('')
    const {push, pathname, query} = useRouter()

    const reGetData = () => {
        updateQueryGenerator(query,push,pathname)
        // push({pathname: pathname, query: {...query}}).finally()
    }

    const onApplyHandler = () => {
        if (selectedItems?.length && status) {
            switch (query.assetsType) {
                case 'posts':
                    dispatch(fetchAdminPanelBulkActionPost({ids:selectedItems,status}))
                    setSelectedItems([])
                    reGetData()
                    break
                case 'metas':
                    dispatch(fetchAdminBulkActionMeta({type:'metas', status, ids:selectedItems}))
                    reGetData()
                    //
                    // bulkAction('metas', status, selectedItems).then(() => {
                    //     setSelectedItems([])
                    //     reGetData()
                    // })
                    break
                default:
                    break
            }
        } else {
            dispatch(setAlert({message: 'No Item Or Status is Selected', type: 'warning', active: true}))
        }
    }


    return (
        <AssetBulkActionStyledDiv>
            <select className={'custom-select'}
                    placeholder='Bulk Actions'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
            >
                <option value=''>Bulk Actions</option>
                {query.status !== 'published' ? <option value='published'>Published</option> : null}
                {query.status !== 'draft' ? <option value='draft'>Draft</option> : null}
                {query.status !== 'trash' ? <option value='trash'>Trash</option> : null}
                {query.status !== 'pending' ? <option value='pending'>Pending</option> : null}
                {query.status === 'trash' ? <option value='delete'>Delete</option> : null}
            </select>
            <button className={'btn btn-primary'} onClick={onApplyHandler}>Apply</button>
        </AssetBulkActionStyledDiv>

    )


};
export default AssetBulkAction;

