import React, { useEffect, useState, useContext, useRef } from 'react';
import AssetBulkAct from './AssetBulkAct';
import withRouter from 'next/dist/client/with-router'

const AssetBulkActionAndAssetTypeSelector = props => {


    const onFormatChangeHandler =e => {
          props.router.push({
              pathname:props.router.pathname,
              query:{...props.router.query,type:e.target.value}
          })
    }

    const RenderTypes = () => {
        if (props.router) {
            switch ( props.router.query.assetsType ) {
                case 'posts':
                    return (
                        <>
                            <select  onChange={e=>onFormatChangeHandler(e)}>
                                <option value='all'>All</option>
                                <option value='standard'>Standard</option>
                                <option value='video'>Video</option>
                                <option value='product'>Product</option>
                                <option value='food'>Food</option>
                                <option value='article'>Article</option>
                            </select>
                        </>
                    )
                default:
                    return null

            }
        }

    }

    return (
        <div className='asset-page-bulk-action-asset-type-selector'>
            <AssetBulkAct { ...props }/>
            <div className="asset-page-asset-type-selector">
                <RenderTypes/>
            </div>
        </div>
    );
};
export default withRouter(AssetBulkActionAndAssetTypeSelector);
