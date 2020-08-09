import React, { useRef } from 'react';
import {fileUpload, postThumbnailsUpload, uploadImage} from '../../../_variables/ajaxVariables'

const UploadFileBtn = props => {
    const uploadInputElement = useRef(null)
    // const labelOutputElement = useRef(null)

    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('uploadingFile', e.target.files[0])
        filesData.append('type',props.type)
        uploadImage(filesData, 'test').then(res=>{
            props.setFunction(props.name,res.data.path.replace('./','/'))
            console.log( res.data)
        }).catch(err=>{
            console.log( err)
            props.returnElement.current.value  = 'Something went Wrong'
        })


        // if (props.type==='thumbnail'){
        //
        //
        //
        //
        //     // postThumbnailsUpload(filesData, 'test').then(res=>{
        //     //     props.setFunction(props.name,res.data.path.replace('./','/'))
        //     //     console.log( res.data)
        //     // }).catch(err=>{
        //     //     console.log( err)
        //     //     props.returnElement.current.value  = 'Something went Wrong'
        //     // })
        // }else{
        //     fileUpload(filesData, 'test').then(res=>{
        //         props.setFunction(props.name,res.data.path.replace('./','/'))
        //         console.log( res.data)
        //     }).catch(err=>{
        //         console.log( err)
        //         props.returnElement.current.value  = 'Something went Wrong'
        //     })
        // }
    }

    return (
        <div className='upload-file-btn'>
            <input ref={ uploadInputElement } type="file" style={ { display: 'none' } } onChange={ e => onUploadHandler(e) }/>
            <button onClick={ () => uploadInputElement.current.click() }>Upload</button>
        </div>
    );
};
export default UploadFileBtn;
