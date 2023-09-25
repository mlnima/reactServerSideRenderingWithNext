import React, {FC, useRef} from 'react';
import styled from "styled-components";
import {uploadFileAction} from "@store/reducers/fileManagerReducer";
import {useAppDispatch} from "@store/hooks";
import {
    FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons/faUpload";

const UploadFileBtnStyledDiv = styled.div`
  button{
    svg{
      width: 20px;
      height: 20px;
    }
  }
`

interface PropType{
    name:string
    type:string
}

const UploadFileBtn:FC<PropType> = props => {
    const uploadInputElement = useRef(null)
    const dispatch = useAppDispatch()

    const onUploadHandler = (e:any) => {
        const filesData = new FormData()
        filesData.append('token',localStorage.wt)
        filesData.append('uploadingFile', e.target.files[0])
        filesData.append('type',props.type)

        const fileUseType = props.name === 'mainThumbnail' ? 'postMainThumbnail' :
            props.name === 'videoUrl' ? 'postVideoUrl' :
                props.name === 'VideoTrailerUrl' ? 'postVideoTrailerUrl' :
                    'fileManagerFileUpload'

        //@ts-ignore
        dispatch(uploadFileAction({file: filesData, useType:fileUseType}))

        // uploadFiles(filesData).then(res=>{
        //     props.setFunction(props.name,res.data.path.replace('./','/'))
        // }).catch(err=>{
        //     props.returnElement.current.value  = 'Something went Wrong'
        // })
    }

    const onDropFileHandler = (e:any)=>{

        e.preventDefault()
        const fileData = e.dataTransfer.files[0]
        const droppedHTML = e?.dataTransfer?.getData("text/html");

        if (droppedHTML){
            const elem= document.createElement("div");
            elem.innerHTML = droppedHTML;
            const image = elem.getElementsByTagName("img");
            const url= (image[0] || image[1]).currentSrc

        }else if (fileData){
            const filesData = new FormData()
            filesData.append('token', localStorage.wt)
            filesData.append('uploadingFile', fileData)
            const fileUseType = props.name === 'mainThumbnail' ? 'postMainThumbnail' :
                                props.name === 'videoUrl' ? 'postVideoUrl' :
                                props.name === 'VideoTrailerUrl' ? 'postVideoTrailerUrl' :
                                    'fileManagerFileUpload'
//@ts-ignore
            dispatch(uploadFileAction({file: filesData, useType:fileUseType}))
            // fileUpload(filesData).then(res => {
            //     props.setFunction(props.name,res.data.path.replace('./','/'))
            // }).catch(err => {
            // })
        }
    }

    return (
        <UploadFileBtnStyledDiv>
            <input className={'primaryInput'} ref={ uploadInputElement } type="file" style={ { display: 'none' } } onChange={ e => onUploadHandler(e) }/>
            {/*//@ts-ignore*/}
            <button  className={'btn btn-success'} onClick={ () => uploadInputElement.current?.click() } onDrop={e=>onDropFileHandler(e)} onDragOver={e=>e.preventDefault()}>
                <FontAwesomeIcon icon={faUpload}/>
            </button>
        </UploadFileBtnStyledDiv>
    );
};
export default UploadFileBtn;
