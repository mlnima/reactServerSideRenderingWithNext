import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../../context/AppContext'
import UploadFileBtn from '../../UploadFileBtn/uploadFileBtn'
import {fileUpload} from '../../../../_variables/ajaxVariables'

const FileManagerControl = props => {
    const addressBar = useRef(null)
    const uploadInputElement = useRef(null)
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        addressBar: ''
    });
    useEffect(() => {
    }, []);

    const onGoBackHandler = (e) => {
        clearClickedItemHandler(e)
        let path = props.data.path;
        let splitPath = path.split('/');
        let lastItemPlusSlash = '/' + splitPath[splitPath.length - 1];
        let newPath = path.replace(lastItemPlusSlash, '');
        props.setStateHandler('path', newPath)
    };

    const clearClickedItemHandler = e => {
        // contextData.setFilesData({
        //     ...contextData.filesData,
        //     clickedItems:[]
        // });
    };
    const onChaneHandler = e => {
        setState({
            [e.target.name]: e.target.value
        })
    }

    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('uploadingFile', e.target.files[0])

        fileUpload(filesData).then(res=>{
            // props.setFunction(props.name,res.data.path.replace('./','/'))
            console.log( res.data)
            props.setState({
                ...props.state,
                clickedItem:res.data.path.replace('./',''),
                clickedItemName: res.data.path.split('/')[res.data.path.split('/').length -1]
            })
        }).catch(err=>{
            console.log( err)
        })
    }

    return (
        <div className='FileManagerControl'>
            <div className='file-Manager-control-address-bar'>
                <button className="backBtn" onClick={ (e) => onGoBackHandler(e) }>Back</button>
                <input ref={ addressBar } name='addressBar' onChange={ e => onGoBackHandler(e) } className="ControlFilesItem" onClick={ e => clearClickedItemHandler(e) } value={ props.data.path }/>
                <button onClick={ () => props.setStateHandler('path', addressBar.current.value) }>Go</button>
            </div>
            <div className="file-Manager-control-quick-access">
                <button onClick={ () => props.setStateHandler('path', '.') }>Root</button>
                <button onClick={ () => props.setStateHandler('path', './static/uploads/image') }>Images</button>
                <button onClick={ () => props.setStateHandler('path', './static/uploads/video') }>Videos</button>
                <button onClick={ () => props.setStateHandler('path', './static/uploads/application') }>Applications</button>
                <input ref={uploadInputElement} type='file' style={ { display: 'none' } } onChange={ e => onUploadHandler(e) }/>
                <button onClick={ () => uploadInputElement.current.click() }>Upload</button>
            </div>
        </div>
    );
};
export default FileManagerControl;
