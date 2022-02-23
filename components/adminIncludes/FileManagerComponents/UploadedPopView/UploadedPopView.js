import React, {useEffect, useState, useContext, useRef} from 'react';

import {readFile, deleteFile} from '../../../../_variables/_ajaxFilesVariables';
import UploadedFilePreviewImage from "./UploadedFilePreviewImage";
import UploadedFilePreviewVideo from "./UploadedFilePreviewVideo";
import UploadedFilePreviewText from "./UploadedFilePreviewText";
import styled from "styled-components";
import fileTypeDetector from "@_variables/util/fileTypeDetector";

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
    //position: fixed;
    //top:5%;
    //right: 5%;
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
`
const UploadedPopView = props => {
    const [state, setState] = useState({
        darkStyle: {
            backgroundColor: 'black'
        },
        lightStyle: {
            backgroundColor: 'white'
        },
        fileData: ''
    });
    useEffect(() => {
    }, []);

    const onCloseHandler = () => {
        // props.setStateHandler('path', itemPath)
        //props.setStateHandler('clickedItem','')
        props.setState({
            ...props.state,
            clickedItem: '',
            path: props.state.prevPath
        })
    }

    const onDeleteHandler = filePath => {
        deleteFile(filePath)
        props.setState({
            ...props.state,
            clickedItem: '',
            path: props.state.prevPath,
            lastUpdate: Date.now()
        })
    }

    if (props.clickedItem) {
        const fileType = fileTypeDetector(props.state.clickedItemName)

        return (
            <UploadedPopViewStyledDiv className='uploaded-pop-view'>
                <div className='gallery-pop-view-content' style={state.lightStyle}>
                    <button className='closeBtn' onClick={() => onCloseHandler()}>X</button>
                    {fileType === 'image' ? <UploadedFilePreviewImage filePath={props.state.clickedItem}/> : null}
                    {fileType === 'video' ? <UploadedFilePreviewVideo filePath={props.state.clickedItem}/> : null}
                    {fileType === 'document' ? <UploadedFilePreviewText file={props.state.file}/> : null}
                    <lable className='uploaded-pop-view-url'> {'/' + props.state.clickedItem.replace('./', '')}</lable>
                    <lable className='uploaded-pop-view-url'> {process.env.NEXT_PUBLIC_PRODUCTION_URL + '/' + props.state.clickedItem.replace('./', '')}</lable>
                    {fileType === 'image' || fileType === 'video' ? <button className='uploaded-pop-delete-button' onClick={() => onDeleteHandler(props.state.clickedItem)}>Delete</button> : null}
                </div>
            </UploadedPopViewStyledDiv>
        );

    } else return null

};
export default UploadedPopView;
