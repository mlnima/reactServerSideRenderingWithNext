import React, { useEffect, useState, useContext, useRef } from 'react';
import AssetBulkAct from './AssetBulkAct'

const AssetBulkActionAndAssetTypeSelector = props => {

    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    const onFormatChangeHandler = () => {

    }
    useEffect(() => {
        console.log(props)
    }, [ props ]);

    return (
        <div className='asset-page-bulk-action-asset-type-selector'>
            <AssetBulkAct {...props}/>
            <div className="asset-page-asset-type-selector">
                <select>
                    <option value='all'>All</option>
                    <option value='video'>Video</option>
                    <option value='standard'>Standard</option>
                </select>
            </div>
        </div>
    );
};
export default AssetBulkActionAndAssetTypeSelector;
