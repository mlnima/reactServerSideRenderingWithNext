import React, { useEffect, useState, useContext, useRef } from 'react';
import './FileManagerControl.scss';
import { AppContext } from '../../../../context/AppContext'

const FileManagerControl = props => {
    const addressBar = useRef(null)
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    const onGoBackHandler = (e)=>{
        clearClickedItemHandler(e)
        let path = props.data.path;
        let splitPath = path.split('/');
        let lastItemPlusSlash = '/' + splitPath[splitPath.length -1];
        let newPath = path.replace(lastItemPlusSlash,'');
        props.setStateHandler('path',newPath)
    };

    const clearClickedItemHandler=e=>{
        // contextData.setFilesData({
        //     ...contextData.filesData,
        //     clickedItems:[]
        // });
    };


    return (
        <div className='FileManagerControl'>
            <button className="backBtn" onClick={(e)=>onGoBackHandler(e)}>Back</button>
            <input ref={addressBar} className="ControlFilesItem" onClick={e=>clearClickedItemHandler(e)}/>
        </div>
    );
};
export default FileManagerControl;
