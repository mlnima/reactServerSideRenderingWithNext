import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faSlidersH} from "@fortawesome/free-solid-svg-icons";
import {faCss3Alt, faJs, faSass} from "@fortawesome/free-brands-svg-icons";
import {faFile, faFolder} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import fileTypeDetector from "@_variables/util/fileTypeDetector";
import { useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

import {
    adminPanelFileManagerEditState,
    fetchFileManagerUploadFile
} from "@store_toolkit/adminReducers/adminPanelFileManagerReducer";
import {useAdminDispatch} from "@store_toolkit/hooks";

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


const FileManagerArea:FC = () => {
    const dispatch = useAdminDispatch()
    const fileManagerData = useSelector(({adminPanelFileManager}: StoreTypes) => adminPanelFileManager)




    const WhatToRender = data => {
        const itemType = fileTypeDetector(data.fileName)
        if (itemType === 'image') {
            return (
                <React.Fragment>
                    <img className='file-manager-image-item'
                         src={fileManagerData.path.replace('.', '') + '/' + data.fileName}
                    />
                </React.Fragment>

            )
        } else if (itemType === 'video') {
            return (
                <video className='file-manager-image-item'>
                    <source src={fileManagerData.path.replace('.', '') + '/' + data.fileName}/>
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
            //className={()=>classGenerator(data.fileName) as string}
            return (
                <React.Fragment>
                    <button  key={data.fileName} name={data.fileName}>
                        <FontAwesomeIcon style={{ color: logoColorToRender}}
                                         icon={logoToRender}
                                         className='file-manager-icons'/>
                    </button>
                </React.Fragment>
            )
        }
    }

    const onClickHandler = item => {
        let itemPath = fileManagerData.path === './' ? './' + item : fileManagerData.path + '/' + item
        console.log(itemPath)
        dispatch(adminPanelFileManagerEditState({
            prevPath: fileManagerData.path,
            path: itemPath,
            clickedItemName: item
        }))
    };


    let renderDir = fileManagerData.files.map(item => {
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

            dispatch(fetchFileManagerUploadFile({file: filesData, useType:'fileManagerFileUpload',postData:null}))
        }
    }


    return (
        <FileManagerAreaStyledDiv className='FileManagerArea' onDrop={e=>onDropFileHandler(e)} onDragOver={e=>e.preventDefault()}>

            {renderDir}
        </FileManagerAreaStyledDiv>
    );
};
export default FileManagerArea;

