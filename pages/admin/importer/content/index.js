import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout';
import { savePost } from '../../../../_variables/ajaxPostsVariables'

const importContent = props => {
    const dataPreview = useRef(null)
    const [ state, setState ] = useState({
        data: []
    });
    useEffect(() => {
    }, []);

    const onImportPostsHandler = () => {
        // const reader = new FileReader()
        //   reader.readAsText(state.file)
        //   const parsedData = JSON.parse(reader.result)
        //   dataPreview.current.value =reader.result
        if (state.data[1]) {
            if (state.data[1].title) {
                state.data.forEach(post => {
                      post.status = 'draft'
                     savePost(post,window.location.origin)
                })
            }
        }
        console.log(state.data)
    }
    return (
        <AdminLayout>
            <div className='import-content'>
                <input type='file' onChange={ async e => {
                    const reader = new FileReader()
                    reader.readAsText(e.target.files[0])
                    reader.onload = e => {
                        // console.log( e.target.result)
                        setState({ ...state, data: JSON.parse(e.target.result) })
                    }
                } }/>
                <button onClick={ () => onImportPostsHandler() }>Import Posts</button>
                <textarea ref={ dataPreview }/>
            </div>
        </AdminLayout>
    );
};
export default importContent;
