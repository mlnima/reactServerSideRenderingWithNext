import React, {useState,useRef} from 'react';
import {fileUpload} from '../../../../_variables/ajaxVariables';

const FileManagerControl = props => {
    const addressBar = useRef(null)
    const uploadInputElement = useRef(null)

    const [ state, setState ] = useState({
        addressBar: ''
    });

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
        filesData.append('token',localStorage.wt)
        filesData.append('uploadingFile', e.target.files[0])
        fileUpload(filesData).then(res=>{
            props.setState({
                ...props.state,
                clickedItem:res.data.path.replace('./',''),
                clickedItemName: res.data.path.split('/')[res.data.path.split('/').length -1]
            })
        }).catch(err=>{
            console.log( err)
        })
    }

    const onCreateNewFileClickHandler = type =>{
       props.setState({
           ...props.state,
           createNewFileFolderPop:true,
           createNewFileFolderPopType:type
       })
    }

    return (
        <div className='file-manager-control'>
            <style jsx>{`
            .file-manager-control{
                margin: 20px 0;
                .file-Manager-control-address-bar{
                    display: flex;
                    justify-content: flex-start;
                    margin: 20px 0;
                    input{
                        width: 90%;
                        background-color: white;
                    }
                }
                .file-Manager-control-quick-access{
                
                }
                button{
                    margin: 0 10px;
                    outline: none;
                    border: none;
                    padding: 8px 10px;
                    border-radius: 5px;
                    &:active{
                        background-color: white;
                        border:none;
                    }
                }
            }
            `}</style>
            <div className='file-Manager-control-address-bar'>
                <button className="backBtn" onClick={ (e) => onGoBackHandler(e) }>Back</button>
                <input ref={ addressBar } name='addressBar' onChange={ e => onChaneHandler(e) } className="ControlFilesItem" onClick={ e => clearClickedItemHandler(e) } value={ props.data.path }/>
                <button onClick={ () => props.setStateHandler('path', addressBar.current.value) }>Go</button>
            </div>
            <div className="file-Manager-control-quick-access">
                <button onClick={ () => props.setStateHandler('path', '.') }>Root</button>
                <button onClick={ () => props.setStateHandler('path', './public/uploads/image') }>Images</button>
                <button onClick={ () => props.setStateHandler('path', './public')}>Public</button>
                <button onClick={ () => props.setStateHandler('path', './public/uploads/video') }>Videos</button>
                <button onClick={ () => props.setStateHandler('path', './public/uploads/application') }>Applications</button>
                <input ref={uploadInputElement} type='file' style={ { display: 'none' } } onChange={ e => onUploadHandler(e) }/>
                <button onClick={ () => uploadInputElement.current.click() }>Upload</button>
                <button onClick={ () => onCreateNewFileClickHandler('file') }>New File</button>
                <button onClick={ () => onCreateNewFileClickHandler('folder') }>New Folder</button>
            </div>
        </div>
    );
};
export default FileManagerControl;
