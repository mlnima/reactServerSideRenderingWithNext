import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import {exportPosts} from '../../../../_variables/ajaxPostsVariables'
import { AppContext } from '../../../../context/AppContext'

const postsExporter = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    const onExportPostsHandler = ()=>{
        contextData.dispatchState({
            ...contextData.state,
            loading:true
        })
        exportPosts().then(postsData=>{
            // console.log(postsData)
            const posts = postsData.data.exportedData.map(post=>{
                delete post._id;
                delete post.__v;
                return post
            })
            let filename = `${Date.now().toLocaleString()}-posts.json`;
            let contentType = "application/json;charset=utf-8;";
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(posts)))], { type: contentType });
                navigator.msSaveOrOpenBlob(blob, filename);
                contextData.dispatchState({
                    ...contextData.state,
                    loading:false
                })
            } else {
                let a = document.createElement('a');
                a.download = filename;
                a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(posts));
                a.target = '_blank';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                contextData.dispatchState({
                    ...contextData.state,
                    loading:false
                })
            }

        })
    }

    return (
        <AdminLayout>
            <div className='export-posts-content'>
               <h1>Export Posts Content :</h1>
                <button onClick={()=>onExportPostsHandler()}>Export All The Posts To Json</button>
            </div>
        </AdminLayout>
    );
};
export default postsExporter;
