'use client';

import React, { useState } from 'react';
import UploadedFilePreviewImage from "./UploadedFilePreviewImage";
import UploadedFilePreviewVideo from "./UploadedFilePreviewVideo";
import UploadedFilePreviewText from "./UploadedFilePreviewText";
import styled from "styled-components";
import { fileTypeDetector } from "@repo/utils";
import { useAppSelector } from '@storeDashboard/hooks';
import { fileManagerClosePopupAction, filManagerDeleteFileAction } from "@storeDashboard/reducers/fileManagerReducer";
import { useAppDispatch } from "@storeDashboard/hooks";

const UploadedPopViewStyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;

  .closeBtn {
    align-self: flex-end;
    color: white;
    background-color: transparent;
    border: none;
    font-weight: bold;
    font-size: xx-large;
  }

  .gallery-pop-view-content {
    background-color: black !important;
    border: 1px solid white;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    min-width: 80vw;
    min-height: 80vh;

    .uploaded-pop-view-url {
      margin: 10px 0;
      width: 90%;
      color: white;
    }

    .uploaded-pop-delete-button {
      font-size: 1rem;
      padding: 10px 30px;
      background-color: red;
      color: white;
      border: none;
      border-radius: 5px;
    }
  }
`;

const UploadedPopView = () => {
    const dispatch = useAppDispatch();
    const fileManagerData = useAppSelector(({ fileManager }) => fileManager);
    const [state, setState] = useState({
        darkStyle: {
            backgroundColor: 'black'
        },
        lightStyle: {
            backgroundColor: 'white'
        },
        fileData: ''
    });

    const onCloseHandler = () => {
        dispatch(fileManagerClosePopupAction({
            clickedItem: '',
            path: fileManagerData.prevPath
        }));
    };

    const onDeleteHandler = (filePath: any) => {
        dispatch(filManagerDeleteFileAction(
            {
                filePath,
                data: {
                    clickedItem: '',
                    path: fileManagerData.prevPath,
                    lastUpdate: Date.now()
                }
            }
        ));
    };

    if (fileManagerData?.clickedItem) {
        const fileType = fileTypeDetector(fileManagerData.clickedItemName);

        return (
            <UploadedPopViewStyledDiv className='uploaded-pop-view'>
                <div className='gallery-pop-view-content' style={state.lightStyle}>
                    <button className='closeBtn' onClick={() => onCloseHandler()}>X</button>
                    {fileType === 'image' ? <UploadedFilePreviewImage filePath={fileManagerData.clickedItem} /> : null}
                    {fileType === 'video' ? <UploadedFilePreviewVideo filePath={fileManagerData.clickedItem} /> : null}
                    {fileType === 'document' ? <UploadedFilePreviewText file={fileManagerData.file} /> : null}
                    <label className={'uploaded-pop-view-url'}>
                        {'/' + fileManagerData.clickedItem.replace('./', '')}
                    </label>
                    <label className={'uploaded-pop-view-url'}>
                        {process.env.NEXT_PUBLIC_PRODUCTION_URL + '/' + fileManagerData.clickedItem.replace('./', '')}
                    </label>
                    {(fileType === 'image' || fileType === 'video') &&
                        <button className='uploaded-pop-delete-button'
                                onClick={() => onDeleteHandler(fileManagerData.clickedItem)}>
                            Delete
                        </button>
                    }
                </div>
            </UploadedPopViewStyledDiv>
        );

    } else return null;
};

export default UploadedPopView;