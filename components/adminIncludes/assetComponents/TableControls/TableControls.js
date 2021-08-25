import AssetStatusNavigation from './AssetStatusNavigation'

import AssetSearch from './AssetSearch'
//import AssetBulkActionAndAssetTypeSelector from './AssetBulkActionAndAssetTypeSelector/AssetBulkActionAndAssetTypeSelector'
import AssetPagination from './AssetPagination'
import AssetSize from "./AssetSize";
import AssetBulkAct from "./AssetBulkAct";
import PostsTypes from "./PostsTypes";
import {useRouter} from "next/router";
import PostsByMeta from "./PostsByMeta";

const TableControls = props => {
    const router = useRouter()
    return (
        <div className='asset-page-table-head'>
            <style jsx>{`
              .asset-page-table-head {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                align-items: center;
                font-size: 12px;
              }
            `}</style>
            {router.query.assetsType === 'posts' || router.query.assetsType === 'metas' || router.query.assetsType === 'comments' || router.query.assetsType === 'orders'? <AssetStatusNavigation {...props}/> :null }
            <AssetBulkAct {...props}/>
            {router.query.assetsType==='posts' ? <PostsTypes/> :null }
            {router.query.assetsType==='posts' ? <PostsByMeta/> :null }
            <AssetPagination {...props}/>
            <AssetSearch/>
            <AssetSize/>
        </div>
    );
};
export default TableControls;
