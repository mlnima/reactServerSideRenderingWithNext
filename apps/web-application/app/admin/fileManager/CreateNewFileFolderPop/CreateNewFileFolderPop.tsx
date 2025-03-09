'use client';

import React, { FC, useEffect, useState } from 'react';
import styled from "styled-components";
import { useAppDispatch } from "@storeDashboard/hooks";
import { createFileOrFolderAction } from "@storeDashboard/reducers/fileManagerReducer";

const CreateNewFileFolderPopStyledDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;

  .create-new-file-folder-pop-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: black;
    width: 300px;
    height: 200px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid white;

    .create-new-file-folder-pop-content-title {
      color: white;
      align-self: flex-start;
    }

    .create-new-file-folder-pop-content-input {
      width: 95%;
    }

    .create-new-file-folder-pop-content-action-button {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;

      button {
        background-color: transparent;
        color: white;
        padding: 10px 20px;
        border: .5px solid white;
        border-radius: 5px;
      }
    }
  }
`;

interface PropTypes {
  render: boolean;
  setState: (state: any) => void;
  state: any;
  createNewFileFolderPopType: string;
}

const CreateNewFileFolderPop: FC<PropTypes> = ({ render, setState, state, createNewFileFolderPopType }) => {
  const [localState, setLocalState] = useState({
    type: 'file',
    fileFolderName: ''
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (render !== localState.type) {
      setLocalState(prevState => ({ ...prevState, type: render }));
    }
  }, [render]);

  const onCancelHandler = () => {
    setState({
      ...state,
      createNewFileFolderPop: false
    });
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSaveHandler = () => {
    if (state.path && localState.fileFolderName) {
      const data = {
        Path: state.path,
        fileFolderName: localState.fileFolderName,
        type: createNewFileFolderPopType
      };
      dispatch(createFileOrFolderAction(data));
    }
  };

  return render ? (
    <CreateNewFileFolderPopStyledDiv className='create-new-file-folder-pop'>
      <div className='create-new-file-folder-pop-content'>
        <p className='create-new-file-folder-pop-content-title'>Create New {createNewFileFolderPopType}</p>
        <p className='create-new-file-folder-pop-content-title'>{createNewFileFolderPopType} Name :</p>
        <input 
          type="text" 
          name='fileFolderName' 
          onChange={onChangeHandler} 
          value={localState.fileFolderName} 
          className='create-new-file-folder-pop-content-input'
        />
        <div className='create-new-file-folder-pop-content-action-button'>
          <button onClick={onSaveHandler}>Save</button>
          <button onClick={onCancelHandler}>Cancel</button>
        </div>
      </div>
    </CreateNewFileFolderPopStyledDiv>
  ) : null;
};

export default CreateNewFileFolderPop;