import React, { useRef } from 'react';
import { fileUpload } from '../../../_variables/ajaxVariables'

const UploadFileBtn = props => {
    const uploadInputElement = useRef(null)
    // const labelOutputElement = useRef(null)

    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('uploadingFile', e.target.files[0])
        fileUpload(filesData, 'test').then(res=>{
            // labelOutputElement.current.value =res.data.path
            props.setFunction(props.name,res.data.path.replace('./','/'))

            // if (props.returnElement){
            //     props.returnElement.current.value = res.data.path.replace('./','/')
            //     // props.returnElement.current.next()
            // }
            console.log( res.data)
        }).catch(err=>{
            console.log( err)
            props.returnElemen.current.value  = 'Something went Wrong'
        })
    }

    return (
        <div className='upload-file-btn'>
            <input ref={ uploadInputElement } type="file" style={ { display: 'none' } } onChange={ e => onUploadHandler(e) }/>
            <button onClick={ () => uploadInputElement.current.click() }>Upload</button>
        </div>
    );
};
export default UploadFileBtn;
