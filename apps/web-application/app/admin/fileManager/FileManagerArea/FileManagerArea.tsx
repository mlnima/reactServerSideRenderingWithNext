'use client';
import React, { FC } from 'react';
import { fileTypeDetector } from '@repo/utils/dist/src';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faSliders } from '@fortawesome/free-solid-svg-icons/faSliders';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';
import { faSass } from '@fortawesome/free-brands-svg-icons/faSass';
import { faCss3 } from '@fortawesome/free-brands-svg-icons/faCss3';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import './FileManagerArea.scss';

interface IProps {
  setFileManagerState: React.Dispatch<React.SetStateAction<any>>;
  uploadFile: (file: any) => Promise<void>;
  fileManagerState: any;
}

const FileManagerArea: FC<IProps> = ({ uploadFile, setFileManagerState, fileManagerState }) => {
  const IconToRender = (data: any) => {
    const itemType = fileTypeDetector(data.fileName);
    if (itemType === 'image') {
      return (
        <React.Fragment>
          <img
            className="file-manager-image-item"
            alt={'icon'}
            src={`${fileManagerState.path.replace('.', process.env.NEXT_PUBLIC_API_SERVER_URL || '')}/${data.fileName}`}
          />
        </React.Fragment>
      );
    } else if (itemType === 'video') {
      return (
        <video className="file-manager-image-item">
          <source src={fileManagerState.path.replace('.', '') + '/' + data.fileName} />
        </video>
      );
    } else {
      const logoToRender = data.fileName.includes('.js')
        ? faFile
        : data.fileName.includes('.env')
          ? faSliders
          : !data.fileName.includes('.')
            ? faFolder
            : data.fileName.includes('.scss')
              ? faSass
              : data.fileName.includes('.pdf')
                ? faFilePdf
                : data.fileName.includes('.css')
                  ? faCss3
                  : faFile;

      const logoColorToRender = data.fileName.includes('.js')
        ? '#efd81d'
        : data.fileName.includes('.env')
          ? 'red'
          : !data.fileName.includes('.')
            ? '#ffe8a0'
            : data.fileName.includes('.scss')
              ? 'red'
              : data.fileName.includes('.css')
                ? 'blue'
                : 'white';

      return (
        <React.Fragment>
          <button key={data.fileName} name={data.fileName}>
            <FontAwesomeIcon icon={logoToRender as any} color={logoColorToRender} className={'meta-icon'} />
          </button>
        </React.Fragment>
      );
    }
  };

  const onClickHandler = (item: any) => {
    let itemPath = fileManagerState.path === './' ? './' + item : fileManagerState.path + '/' + item;
    setFileManagerState((prevState: any) => ({
      ...prevState,
      prevPath: fileManagerState.path,
      path: itemPath,
      clickedItemName: item,
    }));
  };

  const renderDir = fileManagerState.files.map((item: string) => {
    return (
      <div key={item} className="dirItem" onClick={() => onClickHandler(item)}>
        <IconToRender fileName={item} />
        <p>{item}</p>
      </div>
    );
  });

  return (
    <div id="FileManagerArea" onDrop={(e) => uploadFile(e)} onDragOver={(e) => e.preventDefault()}>
      {renderDir}
    </div>
  );
};

export default FileManagerArea;
