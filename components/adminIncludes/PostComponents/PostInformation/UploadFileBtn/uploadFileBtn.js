import React, { useRef } from 'react';
import {fileUpload, uploadFiles} from "../../../../../_variables/ajaxVariables";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const UploadFileBtnStyledDiv = styled.div`
  button{
    svg{
      width: 20px;
      height: 20px;
    }
  }
`


const UploadFileBtn = props => {
    const uploadInputElement = useRef(null)

    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('token',localStorage.wt)
        filesData.append('uploadingFile', e.target.files[0])
        filesData.append('type',props.type)
        uploadFiles(filesData).then(res=>{
            props.setFunction(props.name,res.data.path.replace('./','/'))
        }).catch(err=>{
            console.log( err)
            props.returnElement.current.value  = 'Something went Wrong'
        })
    }


    const onDropFileHandler = (e)=>{
        e.preventDefault()
        const fileData = e.dataTransfer.files[0]
        const droppedHTML = e?.dataTransfer?.getData("text/html");

        if (droppedHTML){
            const elem= document.createElement("div");
            elem.innerHTML = droppedHTML;
            const image = elem.getElementsByTagName("img");
            const url= (image[0] || image[1]).currentSrc
            // console.log(url)
          // props.setFunction(props.name,images[0].currentSrc);
        }else if (fileData){
            const filesData = new FormData()
            filesData.append('token', localStorage.wt)
            filesData.append('uploadingFile', fileData)
            fileUpload(filesData).then(res => {
                props.setFunction(props.name,res.data.path.replace('./','/'))
            }).catch(err => {
                console.log(err)
            })
        }
    }


    return (
        <UploadFileBtnStyledDiv>
            <input className={'form-control-input'} ref={ uploadInputElement } type="file" style={ { display: 'none' } } onChange={ e => onUploadHandler(e) }/>
            <button onClick={ () => uploadInputElement.current.click() } className={'btn btn-success'} onDrop={e=>onDropFileHandler(e)} onDragOver={e=>e.preventDefault()}>
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </UploadFileBtnStyledDiv>
    );
};
export default UploadFileBtn;
