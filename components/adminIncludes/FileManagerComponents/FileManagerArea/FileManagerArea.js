import React from 'react';
import {clickPathGenerator} from '@_variables/_variables';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import withRouter from 'next/dist/client/with-router'

import {faSlidersH} from "@fortawesome/free-solid-svg-icons";
import {faCss3Alt, faJs, faSass, fas} from "@fortawesome/free-brands-svg-icons";
import {faFile, faFolder} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import {fileUpload} from "@_variables/ajaxVariables";
import fileTypeDetector from "@_variables/util/fileTypeDetector";

const FileManagerAreaStyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-gap: 10px;
  background-color: black;
  padding: 20px 20px 200px 20px;
  border-radius: 20px;
  
  .dirItem{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .file-manager-image-item{
      width: 80px;
      object-fit: cover;
    }
    button{
      width: 80px;
      height: 80px;
      background-color: rgba(255, 255, 255, .1);
      outline: none;
      transition: .4s;
      border-radius: 10px;
      &:hover{
        transform: scale(1.2);
      }
      .file-manager-icons {
        color: white;
        width: 50px;
        height: 50px;
      }
    }
    p {
      font-size: small;
      overflow: hidden;
      color: white;
      text-align: center;
    }
  }
  
`


const FileManagerArea = props => {

    const classGenerator = fileName => {
        let nextClass = '';
        if (props.data.clickedItem === clickPathGenerator(fileName, props.state.path)) {
            nextClass = ' clickedItem'
        } else {
            nextClass = ' unClickedItem'
        }
    };


    const WhatToRender = data => {
        const itemType = fileTypeDetector(data.fileName)
        if (itemType === 'image') {
            return (
                <React.Fragment>
                    <img className='file-manager-image-item' src={props.state.path.replace('.', '') + '/' + data.fileName}/>
                </React.Fragment>

            )
        } else if (itemType === 'video') {
            return (
                <video className='file-manager-image-item'>
                    <source src={props.state.path.replace('.', '') + '/' + data.fileName}/>
                </video>
            )
        } else {
            const logoToRender = data.fileName.includes('.js') ? faJs :
                data.fileName.includes('.env') ? faSlidersH :
                    !data.fileName.includes('.') ? faFolder :
                        data.fileName.includes('.scss') ? faSass :
                            data.fileName.includes('.css') ? faCss3Alt :
                                faFile
            const logoColorToRender = data.fileName.includes('.js') ? '#efd81d' :
                data.fileName.includes('.env') ? 'red' :
                    !data.fileName.includes('.') ? '#ffe8a0' :
                        data.fileName.includes('.scss') ? 'red' :
                            data.fileName.includes('.css') ? 'blue' :
                                'white'
            return (
                <React.Fragment>
                    <button className={[classGenerator(data.fileName)]} key={data.fileName} name={data.fileName}>
                        <FontAwesomeIcon style={{ color: logoColorToRender}}
                                         icon={logoToRender}
                                         className='file-manager-icons'/>
                    </button>
                </React.Fragment>
            )
        }
    }

    const onClickHandler = item => {
        let itemPath = clickPathGenerator(item, props.state.path);
        props.setState({
            ...props.state,
            prevPath: props.state.path,
            path: itemPath,
            clickedItemName: item
        })
    };


    let renderDir = props.state.files.map(item => {
        return (
            <div key={item} className='dirItem' onClick={() => onClickHandler(item)}>
                <WhatToRender key={item} fileName={item}/>
                <p> {item}</p>
            </div>
        )
    });

    const onDropFileHandler = (e)=>{
        e.preventDefault()
        const fileData = e.dataTransfer.files[0]
        if (fileData){
            const filesData = new FormData()
            filesData.append('token', localStorage.wt)
            filesData.append('uploadingFile', fileData)
            fileUpload(filesData).then(res => {
                props.setState({
                    ...props.state,
                    clickedItem: res.data.path.replace('./', ''),
                    clickedItemName: res.data.path.split('/')[res.data.path.split('/').length - 1]
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }


    return (
        <FileManagerAreaStyledDiv className='FileManagerArea' onDrop={e=>onDropFileHandler(e)} onDragOver={e=>e.preventDefault()}>

            {renderDir}
        </FileManagerAreaStyledDiv>
    );
};
export default withRouter(FileManagerArea);

