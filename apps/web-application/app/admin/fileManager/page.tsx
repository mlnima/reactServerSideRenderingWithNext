'use client';

import React, { useEffect, useState } from 'react';
import FileManagerControl from './FileManagerControl/FileManagerControl';
import FileManagerArea from './FileManagerArea/FileManagerArea';
import UploadedPopView from './UploadedPopView/UploadedPopView';
import CreateNewFileFolderPop from './CreateNewFileFolderPop/CreateNewFileFolderPop';
import { useAppDispatch } from '@store/hooks';
import './styles.scss';
import {
  dashboardAPIRequestCreateFileOrFolder,
  dashboardAPIRequestDeleteFile,
  dashboardAPIRequestReadPath, dashboardAPIRequestUploadFile,
} from '@repo/api-requests';
import { loading, setAlert } from '@store/reducers/globalStateReducer';
import { AxiosResponse } from 'axios';

const FileManagerPage = () => {
  const dispatch = useAppDispatch();

  const [fileManagerState, setFileManagerState] = useState({
    path: './public',
    prevPath: './public',
    files: [],
    clickedItem: '',
    clickedItemName: '',
    file: '',
    editFile: false,
    action: '',
    _do: '',
    confirm: performance.now(),
    message: '',
    report: '',
    inputBox: false,
    newItemName: '',
    lastUpdate: performance.now(),
    createNewFileFolderPop: false,
    createNewFileFolderPopType: 'file',
  });

  useEffect(() => {
    readPath();
  }, [fileManagerState.path, fileManagerState.lastUpdate]);

  const readPath = async () => {
    try {
      const { data } = await dashboardAPIRequestReadPath(fileManagerState.path);

      if (data?.type === 'dir') {
        setFileManagerState(prevState => ({
          ...prevState,
          files: data.data,
        }));
      } else if (data?.type === 'file') {
        setFileManagerState(prevState => ({
          ...prevState,
          clickedItem: fileManagerState.path,
          path: fileManagerState.prevPath,
          file: data.data,
        }));
      }

    } catch (error) {
      dispatch(setAlert({ message: 'Something Went Wrong', type: 'error' }));
    }
  };

  const deleteFile = async (filePath: string) => {
    try {
      dispatch(loading(true));
      await dashboardAPIRequestDeleteFile(filePath);
      setFileManagerState(prevState => ({
        ...prevState,
        clickedItem: '',
        path: fileManagerState.prevPath,
        lastUpdate: Date.now(),
      }));
      await readPath();
      dispatch(setAlert({ message: 'Deleted', type: 'success' }));
    } catch (error) {
      dispatch(setAlert({ message: 'Something Went Wrong', type: 'error' }));
    }
  };

  const closePopView = () => {
    setFileManagerState(prevState => ({
      ...prevState,
      clickedItem: '',
      path: fileManagerState.prevPath,
      lastUpdate: performance.now(),
    }));
  };

  const createNewFileFolderPopHandler = (type: string) => {
    setFileManagerState(prevState => ({
      ...prevState,
      createNewFileFolderPop: !prevState.createNewFileFolderPop,
      createNewFileFolderPopType: type,
    }));
  };
  const createFolderHandler = async (data: {}) => {
    try {
      dispatch(loading(true));
      await dashboardAPIRequestCreateFileOrFolder(data);
      dispatch(loading(false));
    } catch (error) {
    }
    dispatch(loading(false));
  };

  const uploadFile = async (file: any) => {
    try {
      dispatch(loading(true));
      const uploadedFile = await dashboardAPIRequestUploadFile(file) as AxiosResponse<{ path: string }>;
      setFileManagerState(prevState => ({
        ...prevState,
        clickedItem: uploadedFile.data?.path?.replace('./', ''),
        clickedItemName: uploadedFile.data?.path?.split('/')[uploadedFile?.data?.path?.split('/')?.length - 1],
      }));
      dispatch(loading(false));
    } catch (error) {
      dispatch(loading(false));
    }
  };

  return (
    <div>
      <UploadedPopView deleteFile={deleteFile} clickedItem={fileManagerState?.clickedItem}
                       closePopView={closePopView} setFileManagerState={setFileManagerState}
                       fileManagerState={fileManagerState}/>
      <div className="fileManager">
        <FileManagerControl uploadFile={uploadFile} setFileManagerState={setFileManagerState} fileManagerState={fileManagerState} />
        <FileManagerArea uploadFile={uploadFile} setFileManagerState={setFileManagerState} fileManagerState={fileManagerState} />
      </div>

      {fileManagerState.createNewFileFolderPop &&
        <CreateNewFileFolderPop
          render={fileManagerState.createNewFileFolderPop}
          createFolderHandler={createFolderHandler}
          createNewFileFolderPopType={fileManagerState.createNewFileFolderPopType}
          state={fileManagerState}
          setState={setFileManagerState}
        />
      }

    </div>
  );
};

export default FileManagerPage;


// .then((response: AxiosResponse<any>) => {
//
//

// if (useType === 'fileManagerFileUpload') {
//   return {
//     clickedItem: response.data?.path?.replace('./', ''),
//     clickedItemName: response.data?.path?.split('/')[response?.data?.path?.split('/')?.length - 1],
//   };
// } else if (useType === 'postMainThumbnail') {
//   return { 'mainThumbnail': response.data?.path?.replace('./', '/') };
// } else if (useType === 'postImageGallery') {
//
//   return { 'images': [...(postData?.images || []), response.data.path.replace('./', '/')] };
// } else if (useType === 'postVideoUrl') {
//   return { 'videoUrl': response.data?.path?.replace('./', '/') };
// } else if (useType === 'postVideoTrailerUrl') {
//   return { 'VideoTrailerUrl': response.data?.path?.replace('./', '/') };
// }