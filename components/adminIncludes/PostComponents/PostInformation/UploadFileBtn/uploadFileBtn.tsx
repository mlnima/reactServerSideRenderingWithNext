import { useRef } from 'react';
import styled from "styled-components";
import {fetchFileManagerUploadFile} from "@store_toolkit/adminReducers/adminPanelFileManagerReducer";
import {useAdminDispatch} from "@store_toolkit/hooks";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

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
    const dispatch = useAdminDispatch()

    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('token',localStorage.wt)
        filesData.append('uploadingFile', e.target.files[0])
        filesData.append('type',props.type)

        const fileUseType = props.name === 'mainThumbnail' ? 'postMainThumbnail' :
            props.name === 'videoUrl' ? 'postVideoUrl' :
                props.name === 'VideoTrailerUrl' ? 'postVideoTrailerUrl' :
                    'fileManagerFileUpload'

        dispatch(fetchFileManagerUploadFile({file: filesData, useType:fileUseType,postData:null}))

        // uploadFiles(filesData).then(res=>{
        //     props.setFunction(props.name,res.data.path.replace('./','/'))
        // }).catch(err=>{
        //     props.returnElement.current.value  = 'Something went Wrong'
        // })
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

        }else if (fileData){
            const filesData = new FormData()
            filesData.append('token', localStorage.wt)
            filesData.append('uploadingFile', fileData)
            const fileUseType = props.name === 'mainThumbnail' ? 'postMainThumbnail' :
                                props.name === 'videoUrl' ? 'postVideoUrl' :
                                props.name === 'VideoTrailerUrl' ? 'postVideoTrailerUrl' :
                                    'fileManagerFileUpload'

            dispatch(fetchFileManagerUploadFile({file: filesData, useType:fileUseType,postData:null}))
            // fileUpload(filesData).then(res => {
            //     props.setFunction(props.name,res.data.path.replace('./','/'))
            // }).catch(err => {
            // })
        }
    }

    return (
        <UploadFileBtnStyledDiv>
            <input className={'form-control-input'} ref={ uploadInputElement } type="file" style={ { display: 'none' } } onChange={ e => onUploadHandler(e) }/>
            <button  className={'btn btn-success'} onClick={ () => uploadInputElement.current.click() } onDrop={e=>onDropFileHandler(e)} onDragOver={e=>e.preventDefault()}>

                <SvgRenderer svgUrl={'/public/asset/images/icons/upload-solid.svg'}
                             size={25}
                             customClassName={'show-password'}
                             color={'var(--serachbar-widget-text-color, #fff)'}
                />
            </button>
        </UploadFileBtnStyledDiv>
    );
};
export default UploadFileBtn;
