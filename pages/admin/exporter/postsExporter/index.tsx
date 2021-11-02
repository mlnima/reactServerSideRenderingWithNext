import React from 'react';
import {exportPosts} from '../../../../_variables/ajaxPostsVariables'
import {useDispatch} from "react-redux";
import {setLoading} from "../../../../store/actions/globalStateActions";
import {wrapper} from "../../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const postsExporter = () => {
    const dispatch = useDispatch()

    const onExportPostsHandler = ()=>{
        dispatch(setLoading(true))
        exportPosts().then(postsData=>{
            // @ts-ignore
            const posts = postsData.data.exportedData.map(post=>{
                post.mainThumbnail = post.mainThumbnail.includes('http') ? post.mainThumbnail : window.location.origin + post.mainThumbnail
                delete post._id;
                delete post.__v;
                return post
            })
            let filename = `${Date.now().toLocaleString()}-posts.json`;
            let contentType = "application/json;charset=utf-8;";
            // @ts-ignore
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(posts)))], { type: contentType });
                // @ts-ignore
                navigator.msSaveOrOpenBlob(blob, filename);
                dispatch(setLoading(false))
            } else {
                let a = document.createElement('a');
                a.download = filename;
                a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(posts));
                a.target = '_blank';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                dispatch(setLoading(false))
            }

        })
    }

    return (

            <div className='export-posts-content'>
               <h1>Export Posts Content :</h1>
                <button onClick={()=>onExportPostsHandler()}>Export All The Posts To Json</button>
            </div>

    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})

export default postsExporter;