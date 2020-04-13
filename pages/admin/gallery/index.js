import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout';
import { fileUpload } from '../../../_variables/ajaxVariables'
import UploadFileBtn from '../../../components/adminIncludes/UploadFileBtn/uploadFileBtn'

const gallery = props => {
    const uploadInputElement = useRef(null)
    const [ selectedFiles, setSelectedFiles ] = useState(null)

    const onUploadHandler = e => {
        const filesData = new FormData()
        filesData.append('uploadingFile', e.target.files[0])
        fileUpload(filesData, 'test')
    }

    useEffect(() => {
        const today = new Date(Date.now())
        console.log(today.getFullYear())
        console.log(today.getMonth())
    }, []);

    return (
        <AdminLayout>
            <div className='gallery'>
                <UploadFileBtn/>
            </div>
        </AdminLayout>
    );
};
export default gallery;
