'use client';

import React, { ChangeEvent, useState } from 'react';
import styled from "styled-components";
import { postTypes } from "@repo/data-structures";
import { getExportingPosts } from "@storeDashboard/reducers/postsReducer";
import { useAppDispatch } from "@storeDashboard/hooks";

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

    const onChangeHandler = (e: ChangeEvent<any>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

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
                        {postTypes.map((postType: string, index: number) => {
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
            {/*// @ts-expect-error: check*/}
            <button className={'btn btn-primary'} onClick={() => dispatch(getExportingPosts(data))}>Export All The Posts To Json</button>
        </PostsExporterStyledDiv>
    );
};

export default PostsExporter;