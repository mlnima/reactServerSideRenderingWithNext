'use client';

import React, { FC, MouseEventHandler, useState } from 'react';
import UploadedFilePreviewImage from './UploadedFilePreviewImage';
import UploadedFilePreviewVideo from './UploadedFilePreviewVideo';
import UploadedFilePreviewText from './UploadedFilePreviewText';
import { fileTypeDetector } from '@repo/utils';
import './UploadedPopView.scss';

const UploadedPopView: FC<{
  deleteFile: Function,
  clickedItem: string,
  closePopView: MouseEventHandler<HTMLButtonElement>
  setFileManagerState: React.Dispatch<React.SetStateAction<any>>;
  fileManagerState:any
}> = ({ deleteFile, clickedItem, closePopView,setFileManagerState,fileManagerState }) => {

  const [state, setState] = useState({
    darkStyle: {
      backgroundColor: 'black',
    },
    lightStyle: {
      backgroundColor: 'white',
    },
    fileData: '',
  });

  if (!clickedItem) return null;

  const fileType = fileTypeDetector(fileManagerState.clickedItemName);

  return (
    <div id={'UploadedPopView'} className="uploaded-pop-view">
      <div className="gallery-pop-view-content" style={state.lightStyle}>
        <button className="closeBtn" onClick={closePopView}>X</button>
        {fileType === 'image' ? <UploadedFilePreviewImage filePath={fileManagerState.clickedItem} /> : null}
        {fileType === 'video' ? <UploadedFilePreviewVideo filePath={fileManagerState.clickedItem} /> : null}
        {fileType === 'document' ? <UploadedFilePreviewText file={fileManagerState.file} /> : null}
        <label className={'uploaded-pop-view-url'}>
          {'/' + fileManagerState.clickedItem.replace('./', '')}
        </label>
        <label className={'uploaded-pop-view-url'}>
          {process.env.NEXT_PUBLIC_PRODUCTION_URL + '/' + fileManagerState.clickedItem.replace('./', '')}
        </label>
        {(fileType === 'image' || fileType === 'video') &&
          <button className="uploaded-pop-delete-button"
                  onClick={() => deleteFile(fileManagerState.clickedItem)}>
            Delete
          </button>
        }
      </div>
    </div>
  );
};

export default UploadedPopView;