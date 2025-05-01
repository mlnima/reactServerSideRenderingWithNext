
'use client';
import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch } from "@store/hooks";
import './CreateNewFileFolderPop.scss'

interface PropTypes {
  render: boolean;
  setState: (state: any) => void;
  state: any;
  createNewFileFolderPopType: string;
  createFolderHandler:Function
}

const CreateNewFileFolderPop: FC<PropTypes> = ({ render, setState, state, createNewFileFolderPopType,createFolderHandler }) => {
  const [newItemData, setNewItemData] = useState({
    type: 'file',
    fileFolderName: ''
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (render !== newItemData.type) {
      setNewItemData(prevState => ({ ...prevState, type: render }));
    }
  }, [render]);

  const onCancelHandler = () => {
    setState({
      ...state,
      createNewFileFolderPop: false
    });
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSaveHandler = () => {
    if (state.path && newItemData.fileFolderName) {
      const data = {
        Path: state.path,
        fileFolderName: newItemData.fileFolderName,
        type: createNewFileFolderPopType
      };
      createFolderHandler(data)
    }
  };

  return(
    <div id='CreateNewFileFolderPop'>
      <div className='create-new-file-folder-pop-content'>
        <p className='create-new-file-folder-pop-content-title'>Create New {createNewFileFolderPopType}</p>
        <p className='create-new-file-folder-pop-content-title'>{createNewFileFolderPopType} Name :</p>
        <input
          type="text"
          name='fileFolderName'
          onChange={onChangeHandler}
          value={newItemData.fileFolderName}
          className='create-new-file-folder-pop-content-input'
        />
        <div className='create-new-file-folder-pop-content-action-button'>
          <button onClick={onSaveHandler}>Save</button>
          <button onClick={onCancelHandler}>Cancel</button>
        </div>
      </div>
    </div>
  )
};

export default CreateNewFileFolderPop;