import React, { useRef } from 'react';
import {uploadFiles,fileUpload} from "../../../../../_variables/ajaxVariables";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";

const UploadFileBtn = props => {
    const uploadInputElement = useRef(null)
    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('token',localStorage.wt)
        filesData.append('uploadingFile', e.target.files[0])
        filesData.append('type',props.type)
        uploadFiles(filesData).then(res=>{
            props.setFunction(props.name,res.data.path.replace('./','/'))
            // props.returnElement.current.value  = res.data.path.replace('./','/')
        }).catch(err=>{
            console.log( err)
            props.returnElement.current.value  = 'Something went Wrong'
        })
    }

    return (
        <div className='upload-file-btn'>
            <input ref={ uploadInputElement } type="file" style={ { display: 'none' } } onChange={ e => onUploadHandler(e) }/>
            <button onClick={ () => uploadInputElement.current.click() }><FontAwesomeIcon icon={faUpload} className='post-element-info-logo'/></button>
        </div>
    );
};
export default UploadFileBtn;
