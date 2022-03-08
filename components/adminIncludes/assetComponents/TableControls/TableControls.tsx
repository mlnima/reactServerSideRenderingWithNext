import AssetStatusNavigation from './AssetStatusNavigation'
import AssetSearch from './AssetSearch'
import AssetPagination from './AssetPagination'
import AssetSize from "./AssetSize";
import AssetBulkAction from "./AssetBulkAction";
import PostsTypes from "./PostsTypes";
import {useRouter} from "next/router";
import PostsByMeta from "./PostsByMeta";
import styled from "styled-components";
import {FC} from "react";

const TableControlsStyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;

  * {
    font-size: 12px;
  }
`

interface TableControlsPropTypes {
    selectedItems: any[]
    setSelectedItems: any,
    assetPageData: {}
}

const TableControls: FC<TableControlsPropTypes> = ({selectedItems, setSelectedItems, assetPageData}) => {
    const {query} = useRouter()
    return (
        <TableControlsStyledDiv className='asset-page-table-head'>
            <AssetStatusNavigation/>
            <AssetSize/>
            <AssetBulkAction selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
            {query.assetsType === 'posts' ? <PostsTypes/> : null}
            <AssetPagination assetPageData={assetPageData}/>
            <AssetSearch/>
            {query.assetsType === 'posts' ? <PostsByMeta/> : null}
        </TableControlsStyledDiv>
    );
};
export default TableControls;
