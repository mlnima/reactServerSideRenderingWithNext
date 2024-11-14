import React, {ChangeEvent,useState} from 'react';
import styled from "styled-components";
import {postTypes} from "@repo/data-structures";
import {getExportingPosts} from "@store/reducers/postsReducer";
import {useAppDispatch} from "@store/hooks";

// import {adminExportPosts} from "@utils/adminActions/adminPanelPostsActions";

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

const PostsExporter = () => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState({
        limit: 10,
        postType: 'video',
        metaId: '',
        author: '',
        status: 'published',
        ID: false
    })


    // const onExportPostsHandler = () => {
    //     dispatch(setLoading(true))
    //     // @ts-ignore
    //     exportPosts(data).then(postsData => {
    //         // @ts-ignore
    //         const posts = postsData.data.exportedData.map(post => {
    //             post.mainThumbnail = post.mainThumbnail ? post.mainThumbnail.includes('http') ? post.mainThumbnail : process.env.NEXT_PUBLIC_PRODUCTION_URL + post.mainThumbnail : '';
    //             !data.ID ?   delete post._id : null
    //             delete post.__v;
    //             delete post.author;
    //             return post
    //         })
    //         let filename = `${Date.now().toLocaleString()}-posts.json`;
    //         let contentType = "application/json;charset=utf-8;";
    //         // @ts-ignore
    //         if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //             let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(posts)))], {type: contentType});
    //             // @ts-ignore
    //             navigator.msSaveOrOpenBlob(blob, filename);
    //             dispatch(setLoading(false))
    //         } else {
    //             let a = document.createElement('a');
    //             a.download = filename;
    //             a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(posts));
    //             a.target = '_blank';
    //             document.body.appendChild(a);
    //             a.click();
    //             document.body.removeChild(a);
    //             dispatch(setLoading(false))
    //         }
    //     })
    // }

    const onChangeHandler =(e:ChangeEvent<any>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    // @ts-ignore
    return (

        <PostsExporterStyledDiv className={'export-posts-content'}>
            <h1>Export Posts Content :</h1>
            <div className={'data-inputs'}>
                <div>
                    <input value={data.limit} className={'primaryInput'} type={'number'} placeholder={'limit'} name={'limit'} onChange={e => onChangeHandler(e)}/>
                </div>

                <div>
                    <select value={data?.postType} className={'primarySelect'} name={'postType'} onChange={e => onChangeHandler(e)}>
                        <option value='' >Select</option>
                        {postTypes.map((postType:string, index:number) => {
                            return (
                                <option value={postType} key={index}>{postType}</option>
                            )
                        })}
                    </select>
                </div>

                <div>
                    <input value={data.metaId} className={'primaryInput'} type={'text'} placeholder={'metaId'} name={'metaId'} onChange={e => onChangeHandler(e)}/>
                </div>
                <div>
                    <input value={data.author} className={'primaryInput'} type={'text'} placeholder={'author'} name={'author'} onChange={e => onChangeHandler(e)}/>
                </div>
                <div>
                    <select value={data.status} className={'primarySelect'} name={'status'} onChange={e => onChangeHandler(e)}>
                        <option value='' >Select</option>
                        <option value='published'>Published</option>
                        <option value='draft'>Draft</option>
                        <option value='trash'>Trash</option>
                        <option value='pending'>Pending</option>
                        <option value='reported'>Reported</option>
                    </select>
                </div>
                <div className={'data-inputs-item'}>
                    <p>ID </p>
                    <input checked={data.ID} className={'primaryInput'} type={'checkbox'} placeholder={'ID'} name={'ID'} onChange={e => setData({...data, ID: e.target.checked})}/>
                </div>
            </div>
            {/*//@ts-ignore*/}
            <button className={'btn btn-primary'} onClick={() => dispatch(getExportingPosts(data))}>Export All The Posts To Json</button>
        </PostsExporterStyledDiv>

    );
};




export default PostsExporter;
