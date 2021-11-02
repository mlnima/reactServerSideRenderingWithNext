import AssetStatusNavigation from './AssetStatusNavigation'

import AssetSearch from './AssetSearch'
//import AssetBulkActionAndAssetTypeSelector from './AssetBulkActionAndAssetTypeSelector/AssetBulkActionAndAssetTypeSelector'
import AssetPagination from './AssetPagination'
import AssetSize from "./AssetSize";
import AssetBulkAct from "./AssetBulkAct";
import PostsTypes from "./PostsTypes";
import {useRouter} from "next/router";
import PostsByMeta from "./PostsByMeta";
import styled from "styled-components";

const TableControlsStyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  *{
    font-size: 12px;
  }

`
const TableControls = props => {
    const router = useRouter()
    return (
        <TableControlsStyledDiv className='asset-page-table-head'>
            {router.query.assetsType === 'posts' || router.query.assetsType === 'metas' || router.query.assetsType === 'comments' || router.query.assetsType === 'orders' ? <AssetStatusNavigation {...props}/> : null}
            <AssetSize/>
            <AssetBulkAct {...props}/>
            {router.query.assetsType === 'posts' ? <PostsTypes/> : null}

            <AssetPagination {...props}/>

            <AssetSearch/>
            {router.query.assetsType === 'posts' ? <PostsByMeta/> : null}
        </TableControlsStyledDiv>
    );
};
export default TableControls;
