'use client';
import React, { FC, useRef } from 'react';

interface IProps {
  setFileManagerState: React.Dispatch<React.SetStateAction<any>>;
  uploadFile: (file: any) => Promise<void>;
  fileManagerState: any;
}

const FileManagerControl: FC<IProps> = ({ uploadFile, setFileManagerState,fileManagerState }) => {
    const addressBar = useRef(null);
    const uploadInputElement = useRef(null);

    const onGoBackHandler = (e: any) => {
        clearClickedItemHandler(e);
        let path = fileManagerState?.path;
        let splitPath = path.split('/');
        let lastItemPlusSlash = '/' + splitPath[splitPath?.length - 1];
        let newPath = path?.replace(lastItemPlusSlash, '');

      setFileManagerState((prevState:any) => ({
        ...prevState,
        path: newPath
      }));
    };

    const clearClickedItemHandler = (e: any) => {
        // contextData.setFilesData({
        //     ...contextData.filesData,
        //     clickedItems:[]
        // });
    };

    const onChaneHandler = (e: any) => {

      setFileManagerState((prevState:any) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    };

    const onUploadHandler = (e: any) => {
        const filesData = new FormData();
        filesData.append('token', localStorage.wt);
        filesData.append('uploadingFile', e.target.files[0]);
        uploadFile(filesData);
    };

    const onCreateNewFileClickHandler = (type: any) => {
      setFileManagerState((prevState:any) => ({
        ...prevState,
        createNewFileFolderPop: true,
        createNewFileFolderPopType: type
      }));
    };

    const editFileManagerState = (payload:object)=>{
      setFileManagerState((prevState:any) => ({
        ...prevState,
        ...payload
      }));
    }

    return (
        <div id={'FileManagerControl'} className='file-manager-control'>
            <div className='file-Manager-control-address-bar'>
                <button onClick={(e) => onGoBackHandler(e)} className={'backBtn btn btn-navigation'}>Back</button>
                <input ref={addressBar} name='addressBar' onChange={e => onChaneHandler(e)} className="ControlFilesItem"
                       onClick={e => clearClickedItemHandler(e)} value={fileManagerState?.path} />
                {/*//@ts-ignore*/}
                <button onClick={() => editFileManagerState({ path: addressBar.current.value })}
                        className={'btn btn-navigation'}>Go
                </button>
            </div>
            <div className="file-Manager-control-quick-access">
                <button onClick={() => editFileManagerState({ path: '.' })}
                        className={'btn btn-navigation'}>
                    Root
                </button>
                <button onClick={() => editFileManagerState({ path: './public/uploads/image' })}
                        className={'btn btn-navigation'}>
                    Images
                </button>
                <button onClick={() => editFileManagerState({ path: './public' })}
                        className={'btn btn-navigation'}>
                    Public
                </button>
                <button onClick={() => editFileManagerState({ path: './public/uploads/video' })}
                        className={'btn btn-navigation'}>
                    Videos
                </button>
                <button onClick={() => editFileManagerState({ path: './public/uploads/application' })}
                        className={'btn btn-navigation'}>Applications
                </button>
                <input ref={uploadInputElement} type='file' style={{ display: 'none' }}
                       onChange={e => onUploadHandler(e)} />
                {/*//@ts-ignore*/}
                <button onClick={() => uploadInputElement.current.click()} className={'btn btn-navigation'}>Upload
                </button>
                <button onClick={() => onCreateNewFileClickHandler('file')} className={'btn btn-navigation'}>New File
                </button>
                <button onClick={() => onCreateNewFileClickHandler('folder')} className={'btn btn-navigation'}>New Folder
                </button>
            </div>
        </div>
    );
};

export default FileManagerControl;