import AssetStatusNavigation from './AssetStatusNavigation'
import AssetSearch from './AssetSearch'
import AssetPagination from './AssetPagination'
import AssetSize from "./AssetSize";
import AssetBulkAction from "./AssetBulkAction";
import PostsTypes from "./PostsTypes";
import PostsByMeta from "./PostsByMeta";
import styled from "styled-components";
import {FC, useMemo} from "react";
import {useSearchParams} from "react-router-dom";
import paramsObjectGenerator from "@variables/paramsObjectGenerator";
import MetasType from "@components/pages/Assets/TableControls/MetasTypes";
import SortItemsBy from "@components/pages/Assets/TableControls/SortItemsBy";

const TableControlsStyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

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
    const [search, setSearch] = useSearchParams();
    //@ts-ignore
    const query = useMemo(()=>paramsObjectGenerator(search),[search]);
    const assetsType = useMemo(()=>search.get('assetsType'),[search]);

    return (
        <TableControlsStyledDiv className='asset-page-table-head'>
            <AssetStatusNavigation/>
            <AssetSize/>
            <AssetBulkAction selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
            {assetsType === 'posts' && <PostsTypes/> }
            {assetsType === 'metas' && <MetasType/> }
            <AssetPagination assetPageData={assetPageData}/>
            <AssetSearch/>
            {assetsType === 'posts' && <PostsByMeta/> }
            <SortItemsBy/>
        </TableControlsStyledDiv>
    );
};
export default TableControls;
