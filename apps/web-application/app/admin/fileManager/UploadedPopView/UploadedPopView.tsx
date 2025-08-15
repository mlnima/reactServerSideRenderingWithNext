'use client';

import React, { FC, MouseEventHandler, useState, useEffect } from 'react';
import UploadedFilePreviewImage from './UploadedFilePreviewImage';
import UploadedFilePreviewVideo from './UploadedFilePreviewVideo';
import UploadedFilePreviewText from './UploadedFilePreviewText';
import { fileTypeDetector } from '@repo/utils/dist/src';
import './UploadedPopView.scss';

interface IProps {
  deleteFile: Function;
  clickedItem: string;
  closePopView: MouseEventHandler<HTMLButtonElement>;
  setFileManagerState: React.Dispatch<React.SetStateAction<any>>;
  fileManagerState: any;
}

const UploadedPopView: FC<IProps> = ({ deleteFile, clickedItem, closePopView, setFileManagerState, fileManagerState }) => {
  const [copiedStatus, setCopiedStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setCopiedStatus({});
  }, [clickedItem]);

  if (!clickedItem) return null;

  const fileType = fileTypeDetector(fileManagerState.clickedItemName);
  const siteUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL || '';
  const relativeUrl = fileManagerState.clickedItem.replace('./', '/');
  const absoluteUrl = siteUrl + fileManagerState.clickedItem.replace('./', '');

  const handleCopyToClipboard = (textToCopy: string, urlType: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopiedStatus((prev) => ({ ...prev, [urlType]: true }));
        setTimeout(() => {
          setCopiedStatus((prev) => ({ ...prev, [urlType]: false }));
        }, 1500);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div id={'UploadedPopView'} className="uploaded-pop-view">
      <div className="gallery-pop-view-content">
        <button className="closeBtn" onClick={closePopView} aria-label="Close popup">
          ×
        </button>
        <div className="file-preview-container">
          {fileType === 'image' ? <UploadedFilePreviewImage filePath={fileManagerState.clickedItem} /> : null}
          {fileType === 'video' ? <UploadedFilePreviewVideo filePath={fileManagerState.clickedItem} /> : null}
          {fileType === 'document' ? <UploadedFilePreviewText file={fileManagerState.file} /> : null}
          {fileType !== 'image' && fileType !== 'video' && fileType !== 'document' && (
            <div className="file-placeholder">
              <p>No preview available for this file type.</p>
              <p>Filename: {fileManagerState.clickedItemName}</p>
            </div>
          )}
        </div>

        <div className="url-container">
          <div className="url-entry">
            <label htmlFor="relativeUrl" className="uploaded-pop-view-url-label">
              Relative URL:
            </label>
            <div className="url-input-group">
              <input id="relativeUrl" type="text" value={relativeUrl} readOnly className="uploaded-pop-view-url-text" />
              <button className="copy-url-button" onClick={() => handleCopyToClipboard(relativeUrl, 'relative')}>
                {copiedStatus['relative'] ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="url-entry">
            <label htmlFor="absoluteUrl" className="uploaded-pop-view-url-label">
              Absolute URL:
            </label>
            <div className="url-input-group">
              <input id="absoluteUrl" type="text" value={absoluteUrl} readOnly className="uploaded-pop-view-url-text" />
              <button className="copy-url-button" onClick={() => handleCopyToClipboard(absoluteUrl, 'absolute')}>
                {copiedStatus['absolute'] ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {(fileType === 'image' || fileType === 'video' || fileType === 'application' || !fileType) && (
          <button className="uploaded-pop-delete-button" onClick={() => deleteFile(fileManagerState.clickedItem)}>
            Delete File
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadedPopView;
// 'use client';
//
// import React, { FC, MouseEventHandler, useState } from 'react';
// import UploadedFilePreviewImage from './UploadedFilePreviewImage';
// import UploadedFilePreviewVideo from './UploadedFilePreviewVideo';
// import UploadedFilePreviewText from './UploadedFilePreviewText';
// import { fileTypeDetector } from '@repo/utils';
// import './UploadedPopView.scss';
//
// // we beed to provide more detail and its usage in this pop later
// const UploadedPopView: FC<{
//   deleteFile: Function,
//   clickedItem: string,
//   closePopView: MouseEventHandler<HTMLButtonElement>
//   setFileManagerState: React.Dispatch<React.SetStateAction<any>>;
//   fileManagerState:any
// }> = ({ deleteFile, clickedItem, closePopView,setFileManagerState,fileManagerState }) => {
//
//   const [state, setState] = useState({
//     darkStyle: {
//       backgroundColor: 'black',
//     },
//     lightStyle: {
//       backgroundColor: 'white',
//     },
//     fileData: '',
//   });
//
//   if (!clickedItem) return null;
//
//   const fileType = fileTypeDetector(fileManagerState.clickedItemName);
//
//   return (
//     <div id={'UploadedPopView'} className="uploaded-pop-view">
//       <div className="gallery-pop-view-content" style={state.lightStyle}>
//         <button className="closeBtn" onClick={closePopView}>X</button>
//         {fileType === 'image' ? <UploadedFilePreviewImage filePath={fileManagerState.clickedItem} /> : null}
//         {fileType === 'video' ? <UploadedFilePreviewVideo filePath={fileManagerState.clickedItem} /> : null}
//         {fileType === 'document' ? <UploadedFilePreviewText file={fileManagerState.file} /> : null}
//         <label className={'uploaded-pop-view-url'}>
//           { fileManagerState.clickedItem.replace('./', '/')}
//         </label>
//         <label className={'uploaded-pop-view-url'}>
//           {process.env.NEXT_PUBLIC_PRODUCTION_URL +  fileManagerState.clickedItem.replace('./', '')}
//         </label>
//         {(fileType === 'image' || fileType === 'video'|| fileType === 'application' || !fileType) &&
//           <button className="uploaded-pop-delete-button"
//                   onClick={() => deleteFile(fileManagerState.clickedItem)}>
//             Delete
//           </button>
//         }
//       </div>
//     </div>
//   );
// };
//
// export default UploadedPopView;