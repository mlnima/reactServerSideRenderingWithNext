import React, { useEffect, useState, useContext, useRef } from 'react';
import AssetStatusNavigation from './AssetStatusNavigation'
import withRouter from 'next/dist/client/with-router'
import AssetSearch from './AssetSearch'
import AssetBulkActionAndAssetTypeSelector from './AssetBulkActionAndAssetTypeSelector'
import AssetPagination from './AssetPagination'
const TableHeader = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div className='asset-page-table-head'>
            <AssetStatusNavigation/>
            <AssetSearch/>
            <AssetBulkActionAndAssetTypeSelector/>
            <AssetPagination/>
        </div>
    );
};
export default withRouter(TableHeader);
