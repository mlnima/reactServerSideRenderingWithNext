import React, {FC,useRef} from "react";
import styled from "styled-components";
import {fetchFileManagerUploadFile} from "@store_toolkit/adminReducers/adminPanelFileManagerReducer";
import {useAppDispatch} from "@store_toolkit/hooks";

const ThumbnailUploaderStyledDiv = styled.div`
  width: 254.99px;
  height: 143.48px;

  border: var(--main-text-color, #ccc) dashed 1px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  img{
    padding: 5px;
    object-fit: contain;
    width: 254.99px;
    height: 143.48px;
  }
`

interface ThumbnailUploaderPropTypes {
    mainThumbnail: string,

}

const ThumbnailUploader: FC<ThumbnailUploaderPropTypes> = ({mainThumbnail}) => {
    const uploadInputElement = useRef(null)
    const dispatch = useAppDispatch();

    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('token', localStorage.wt)
        filesData.append('uploadingFile', e.target.files[0])
        filesData.append('type', 'thumbnail')

        dispatch(fetchFileManagerUploadFile({file: filesData, useType:'postMainThumbnail',postData:null}))
        // uploadFiles(filesData).then(res => {
        //     if (res.data?.path){
        //         dispatch(editPostField({'mainThumbnail': res.data?.path?.replace('./','/')}))
        //     }
        // }).catch(err => {
        //     // props.returnElement.current.value  = 'Something went Wrong'
        // })
    }


    const onDropFileHandler = (e) => {
        e.preventDefault()
        const fileData = e.dataTransfer.files[0]
        const droppedHTML = e?.dataTransfer?.getData("text/html");

        if (droppedHTML) {
            const elem = document.createElement("div");
            elem.innerHTML = droppedHTML;
            const image = elem.getElementsByTagName("img");
            const url = (image[0] || image[1]).currentSrc
        } else if (fileData) {
            const filesData = new FormData()
            filesData.append('token', localStorage.wt)
            filesData.append('uploadingFile', fileData)


            dispatch(fetchFileManagerUploadFile({file: filesData, useType:'postMainThumbnail',postData:null}))
            // fileUpload(filesData).then(res => {
            //     if (res.data?.path){
            //         dispatch(editPostField({'mainThumbnail': res.data?.path?.replace('./','/')}))
            //     }
            //     // props.setFunction(props.name,res.data.path.replace('./','/'))
            // }).catch(err => {
            //     console.log(err)
            // })
        }
    }

    return (
        <ThumbnailUploaderStyledDiv onClick={() => uploadInputElement.current.click()}
                                    onDrop={e => onDropFileHandler(e)}
                                    onDragOver={e => e.preventDefault()}
        >
            <input className={'form-control-input'} ref={uploadInputElement} type="file" style={{display: 'none'}}
                   onChange={e => onUploadHandler(e)}/>
            {!mainThumbnail ?
                <p>Drag and Drop the image here or click to upload the file</p>
                : <img src={mainThumbnail} alt="mainThumbnail"/>
            }
        </ThumbnailUploaderStyledDiv>
    )
};
export default ThumbnailUploader
// background-image: url("${(props: { mainThumbnail: string }) => props.mainThumbnail}");
// background-size: contain;
// background-repeat: no-repeat;