import React, {useEffect, useState} from 'react';
import {exportPosts} from '../../../../_variables/ajaxPostsVariables'
import {useDispatch} from "react-redux";
import {setLoading} from "../../../../store/actions/globalStateActions";
import {wrapper} from "../../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import postTypes from "../../../../components/global/postTypes";
import {da} from "suneditor/src/lang";

const PostsExporterStyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  .data-inputs {
    width: 300px;
  }
  
  .data-inputs-item{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn-primary {
    margin: 20px;
  }
`
const postsExporter = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        limit: 10,
        postType: 'video',
        metaId: '',
        author: '',
        status: 'published',
        ID: false
    })


    const onExportPostsHandler = () => {
        dispatch(setLoading(true))
        // @ts-ignore
        exportPosts(data).then(postsData => {
            // @ts-ignore
            const posts = postsData.data.exportedData.map(post => {
                post.mainThumbnail = post.mainThumbnail ? post.mainThumbnail.includes('http') ? post.mainThumbnail : process.env.NEXT_PUBLIC_PRODUCTION_URL + post.mainThumbnail : '';
                !data.ID ?   delete post._id : null
                delete post.__v;
                delete post.author;
                return post
            })
            let filename = `${Date.now().toLocaleString()}-posts.json`;
            let contentType = "application/json;charset=utf-8;";
            // @ts-ignore
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(posts)))], {type: contentType});
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

    const onChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        console.log(data)
    }, [data]);

    return (

        <PostsExporterStyledDiv className={'export-posts-content'}>
            <h1>Export Posts Content :</h1>
            <div className={'data-inputs'}>
                <div>
                    <input value={data.limit} className={'form-control-input'} type={'number'} placeholder={'limit'} name={'limit'} onChange={e => onChangeHandler(e)}/>
                </div>

                <div>
                    <select value={data.postType} className={'custom-select'} name={'postType'} onChange={e => onChangeHandler(e)}>
                        {postTypes.map((postType, index) => {
                            return (
                                <option value={postType} key={index}>{postType}</option>
                            )
                        })}
                    </select>
                </div>

                <div>
                    <input value={data.metaId} className={'form-control-input'} type={'text'} placeholder={'metaId'} name={'metaId'} onChange={e => onChangeHandler(e)}/>
                </div>
                <div>
                    <input value={data.author} className={'form-control-input'} type={'text'} placeholder={'author'} name={'author'} onChange={e => onChangeHandler(e)}/>
                </div>
                <div>
                    <select value={data.status} className={'custom-select'} name={'status'} onChange={e => onChangeHandler(e)}>
                        <option value='published'>Published</option>
                        <option value='draft'>Draft</option>
                        <option value='trash'>Trash</option>
                        <option value='pending'>Pending</option>
                        <option value='reported'>Reported</option>
                    </select>
                </div>
                <div className={'data-inputs-item'}>
                    <p>ID </p>
                    <input checked={data.ID} className={'form-control-input'} type={'checkbox'} placeholder={'ID'} name={'ID'} onChange={e => setData({...data, ID: e.target.checked})}/>
                </div>
            </div>
            <button className={'btn btn-primary'} onClick={() => onExportPostsHandler()}>Export All The Posts To Json</button>
        </PostsExporterStyledDiv>

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
