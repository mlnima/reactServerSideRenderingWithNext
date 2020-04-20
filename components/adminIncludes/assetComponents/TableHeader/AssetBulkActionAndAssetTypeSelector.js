import React, { useEffect, useState, useContext, useRef } from 'react';

const AssetBulkActionAndAssetTypeSelector = props => {
    const bulkActionSelect = useRef(null)
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    const onFormatChangeHandler = () => {

    }

    return (
        <div className='asset-page-bulk-action-asset-type-selector'>
            <div className="asset-page-bulk-action-drop-down">
                <select ref={ bulkActionSelect } placeholder='Bulk Actions'>
                    <option value='none'>Bulk Actions</option>
                    <option value='Published'>Published</option>
                    <option value='Draft'>Draft</option>
                    <option value='Trash'>Trash</option>
                </select>
                <button className='asset-page-bulk-action-drop-down-btn' onClick={ () => onFormatChangeHandler() }>Apply</button>
            </div>
            <div className="asset-page-asset-type-selector">
                <select >
                    <option value='all'>All</option>
                    <option value='video'>Video</option>
                    <option value='standard'>Standard</option>
                </select>
            </div>
        </div>
    );
};
export default AssetBulkActionAndAssetTypeSelector;
