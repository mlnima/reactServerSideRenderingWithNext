'use client';

import React, { useEffect, useState } from 'react';
import FileManagerControl from './FileManagerControl/FileManagerControl';
import FileManagerArea from './FileManagerArea/FileManagerArea';
import UploadedPopView from './UploadedPopView/UploadedPopView';
//import CreateNewFileFolderPop from './CreateNewFileFolderPop/CreateNewFileFolderPop';
import { useAppDispatch } from '@store/hooks';
import './styles.scss';
import { loading, setAlert } from '@store/reducers/globalStateReducer';
import dashboardReadPath from '@lib/actions/database/operations/fileManager/dashboardReadPath';
import { ServerActionResponse } from '@lib/actions/response';
import dashboardDeleteFile from '@lib/actions/database/operations/fileManager/dashboardDeleteFile';
import dashboardUploadFile from '@lib/actions/database/operations/fileManager/dashboardUploadFile';

const FileManagerPage = () => {
  const dispatch = useAppDispatch();

  const [fileManagerState, setFileManagerState] = useState({
    path: '/public/uploads',
    prevPath: '/public/uploads',
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
      //const { data } = await dashboardAPIRequestReadPath(fileManagerState.path);
      const {success,data,error,message} = await dashboardReadPath({targetPath:fileManagerState.path}) as unknown as ServerActionResponse<{data:[],type:'file'|'dir'}>
      console.log(`data=> `,data)
      if (!success || !data?.data) {
        dispatch(setAlert({ message, type: 'error', active: true,error }));
        return;
      }


      if (data?.type === 'dir') {
        setFileManagerState(prevState => ({
          ...prevState,
          files: data.data,
        }));
      } else if (data?.type === 'file' && data?.data) {
        setFileManagerState((prevState:any) => ({
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

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement> | DragEvent) => {
    dispatch(loading(true));
    try {
      let file: File | null = null;

      if ('dataTransfer' in e && e.dataTransfer?.files?.[0]) {
        e.preventDefault();
        file = e.dataTransfer.files[0];
      } else if ('target' in e && (e.target as HTMLInputElement).files?.[0]) {
        file = (e.target as HTMLInputElement).files![0];
      }

      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      const {success,data,error,message} = await dashboardUploadFile({ file: formData }) ;

      if (!success || !data?.filePath) {
        dispatch(loading(false));
        dispatch(setAlert({ message, type: 'error', active: true ,error}));
        return;
      }

      setFileManagerState(prevState => ({
        ...prevState,
        clickedItem: data?.filePath?.replace('./', ''),
        clickedItemName: data?.filePath?.split('/')[data?.filePath?.split('/')?.length - 1],
        lastUpdate: performance.now(),
      }));
      dispatch(loading(false));

    }catch (error){
      dispatch(loading(false));
    }

  };

  const deleteFile = async (targetPath: string) => {
    try {
      dispatch(loading(true));
      await dashboardDeleteFile({targetPath});
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

  // const createNewFileFolderPopHandler = (type: string) => {
  //   setFileManagerState(prevState => ({
  //     ...prevState,
  //     createNewFileFolderPop: !prevState.createNewFileFolderPop,
  //     createNewFileFolderPopType: type,
  //   }));
  // };
  // const createFolderHandler = async (data: {}) => {
  //   try {
  //     dispatch(loading(true));
  //     await dashboardAPIRequestCreateFileOrFolder(data);
  //     dispatch(loading(false));
  //   } catch (error) {
  //   }
  //   dispatch(loading(false));
  // };



  return (
    <div>
      <UploadedPopView deleteFile={deleteFile} clickedItem={fileManagerState?.clickedItem}
                       closePopView={closePopView} setFileManagerState={setFileManagerState}
                       fileManagerState={fileManagerState}/>
      <div className="fileManager">
        <FileManagerControl uploadFile={uploadFile}  setFileManagerState={setFileManagerState} fileManagerState={fileManagerState} />
        <FileManagerArea uploadFile={uploadFile} setFileManagerState={setFileManagerState} fileManagerState={fileManagerState} />
      </div>

      {/*{fileManagerState.createNewFileFolderPop &&*/}
      {/*  <CreateNewFileFolderPop*/}
      {/*    render={fileManagerState.createNewFileFolderPop}*/}
      {/*    createFolderHandler={createFolderHandler}*/}
      {/*    createNewFileFolderPopType={fileManagerState.createNewFileFolderPopType}*/}
      {/*    state={fileManagerState}*/}
      {/*    setState={setFileManagerState}*/}
      {/*  />*/}
      {/*}*/}

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