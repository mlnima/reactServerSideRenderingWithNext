import React, { useRef, FC} from 'react';
import styled from "styled-components";
import { useSelector} from "react-redux";
import {fetchFileManagerUploadFile,adminPanelFileManagerEditState} from "@store_toolkit/adminReducers/adminPanelFileManagerReducer";
import {useAdminDispatch} from "@store_toolkit/hooks";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const FileManagerControlStyledDiv = styled.div`
  margin: 20px 0;

  .file-Manager-control-address-bar {
    display: flex;
    justify-content: flex-start;
    margin: 20px 0;

    input {
      width: 90%;
      background-color: white;
    }
  }

  .file-Manager-control-quick-access {

  }

  button {
    margin: 0 10px;
    outline: none;
    border: none;
    padding: 8px 10px;
    border-radius: 5px;

    &:active {
      background-color: white;
      border: none;
    }
  }
`
const FileManagerControl:FC = () => {
    const addressBar = useRef(null)
    const uploadInputElement = useRef(null)
    const dispatch = useAdminDispatch()
    const fileManagerData = useSelector(({adminPanelFileManager}: Store) => adminPanelFileManager)

    const onGoBackHandler = (e) => {
        clearClickedItemHandler(e)
        let path = fileManagerData.path;
        let splitPath = path.split('/');
        let lastItemPlusSlash = '/' + splitPath[splitPath?.length - 1];
        let newPath = path.replace(lastItemPlusSlash, '');
        dispatch(adminPanelFileManagerEditState({path: newPath}))
    };

    const clearClickedItemHandler = e => {
        // contextData.setFilesData({
        //     ...contextData.filesData,
        //     clickedItems:[]
        // });
    };

    const onChaneHandler = e => {
        dispatch(adminPanelFileManagerEditState({[e.target.name]: e.target.value}))
    }

    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('token', localStorage.wt)
        filesData.append('uploadingFile', e.target.files[0])
        dispatch(fetchFileManagerUploadFile({file: filesData, useType:'fileManagerFileUpload',postData:null}))
    }

    const onCreateNewFileClickHandler = type => {
        dispatch(adminPanelFileManagerEditState({
            createNewFileFolderPop: true,
            createNewFileFolderPopType: type
        }))
    }

    return (
        <FileManagerControlStyledDiv className='file-manager-control'>
            <div className='file-Manager-control-address-bar'>
                <button onClick={(e) => onGoBackHandler(e)} className={'backBtn btn btn-navigation '}>Back</button>
                <input ref={addressBar} name='addressBar' onChange={e => onChaneHandler(e)} className="ControlFilesItem"
                       onClick={e => clearClickedItemHandler(e)} value={fileManagerData.path}/>
                <button onClick={() => dispatch(adminPanelFileManagerEditState({path: addressBar.current.value}))}
                        className={'btn btn-navigation'}>Go
                </button>
            </div>
            <div className="file-Manager-control-quick-access">
                <button onClick={() => dispatch(adminPanelFileManagerEditState({path: '.'}))}
                        className={'btn btn-navigation'}>
                    Root
                </button>
                <button onClick={() => dispatch(adminPanelFileManagerEditState({path: './public/uploads/image'}))}
                        className={'btn btn-navigation'}>
                    Images
                </button>
                <button onClick={() => dispatch(adminPanelFileManagerEditState({path: './public'}))}
                        className={'btn btn-navigation'}>
                    Public
                </button>
                <button onClick={() => dispatch(adminPanelFileManagerEditState({path: './public/uploads/video'}))}
                        className={'btn btn-navigation'}>
                    Videos
                </button>
                <button onClick={() => dispatch(adminPanelFileManagerEditState({path: './public/uploads/application'}))}
                        className={'btn btn-navigation'}>Applications
                </button>
                <input ref={uploadInputElement} type='file' style={{display: 'none'}}
                       onChange={e => onUploadHandler(e)}/>
                <button onClick={() => uploadInputElement.current.click()} className={'btn btn-navigation'}>Upload
                </button>
                <button onClick={() => onCreateNewFileClickHandler('file')} className={'btn btn-navigation'}>New File
                </button>
                <button onClick={() => onCreateNewFileClickHandler('folder')} className={'btn btn-navigation'}>New
                    Folder
                </button>
            </div>
        </FileManagerControlStyledDiv>
    );
};
export default FileManagerControl;
