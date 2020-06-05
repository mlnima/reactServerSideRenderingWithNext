import React, { useEffect, useState, useContext, useRef } from 'react';
import AssetStatusNavigation from './AssetStatusNavigation'
import withRouter from 'next/dist/client/with-router'
import AssetSearch from './AssetSearch'
import AssetBulkActionAndAssetTypeSelector from './AssetBulkActionAndAssetTypeSelector/AssetBulkActionAndAssetTypeSelector'
import AssetPagination from './AssetPagination'

const TableControls = props => {
    return (
        <div className='asset-page-table-head'>
            <AssetStatusNavigation { ...props }/>
            <AssetSearch/>
            <AssetBulkActionAndAssetTypeSelector { ...props }/>
            <AssetPagination { ...props }/>
        </div>
    );
};
export default withRouter(TableControls);
