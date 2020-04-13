import React, { useEffect, useState, useContext, useRef } from 'react';
import './FileManagerControl.scss';
import { AppContext } from '../../../../context/AppContext'
import UploadFileBtn from '../../UploadFileBtn/uploadFileBtn'

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
            <div className='file-Manager-control-address-bar'>
                <button className="backBtn" onClick={(e)=>onGoBackHandler(e)}>Back</button>
                <input ref={addressBar} className="ControlFilesItem" onClick={e=>clearClickedItemHandler(e)} value={props.data.path}/>
                <button onClick={()=> props.setStateHandler('path',addressBar.current.value)}>Go</button>
            </div>
            <div className="file-Manager-control-quick-access">
                  <button onClick={()=>props.setStateHandler('path','.')}>Root</button>
                  <button onClick={()=>props.setStateHandler('path','./static/uploads/image')}>Images</button>
                  <button onClick={()=>props.setStateHandler('path','./static/uploads/video')}>Videos</button>
                  <button onClick={()=>props.setStateHandler('path','./static/uploads/application')}>Applications</button>
            </div>
        </div>
    );
};
export default FileManagerControl;
