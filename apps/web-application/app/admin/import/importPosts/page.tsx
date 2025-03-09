'use client';

import React, { ChangeEvent, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import styled from "styled-components";
import { DashboardStore } from "@repo/typescript-types";
import { createNewPostAction } from "@storeDashboard/reducers/postsReducer";
import { useAppDispatch } from "@storeDashboard/hooks";

import { dashboardAPIRequestCreateNewPost } from "@repo/api-requests";
import qualityConvertor from '../../assets/components/qualityConvertor';

const PostsImporterStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .posts-importer-form {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap:5px;
   
    .posts-importer-form-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const PostsImporter = (): JSX.Element => {
    const userData = useSelector(({ users }: DashboardStore) => users?.userData);
    const statusElement = useRef(null);
    const dataPreview = useRef(null);
    const dispatch = useAppDispatch();
    const [state, setState] = useState({
        status: 'draft'
    });

    const [posts, setPosts] = useState([]);

    const onImportPostsHandler = async () => {
        for await (let post of posts) {
            const postDataToSave = {
                ...post,
                status:  statusElement.current.value || 'draft',
                quality: qualityConvertor(post.quality),
                author:  userData._id
            };
            await dashboardAPIRequestCreateNewPost(postDataToSave);
            // dispatch(createNewPostAction({data:postDataToSave, router:null}))
        }
    };

    const onSelectFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        reader.onload = e => {
            if (typeof e.target.result === "string") {
                const parsedPosts = JSON.parse(e.target.result);
                if (parsedPosts?.length) {
                    setPosts(parsedPosts);
                }
            }
        };
    };

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    return (
        <PostsImporterStyledDiv className='posts-importer'>
            <div className={'posts-importer-form'}>
                <select ref={statusElement} className={'primarySelect'} name={'status'} onChange={onChangeHandler}>
                    <option value='' >No Change</option>
                    <option value='published'>Published</option>
                    <option value='draft'>Draft</option>
                    <option value='trash'>Trash</option>
                    <option value='pending'>Pending</option>
                    <option value='reported'>Reported</option>
                </select>
                <div className={'posts-importer-form-clientActions'}>
                    <input type='file' onChange={onSelectFileHandler} />
                    <button className={'btn btn-primary'} onClick={onImportPostsHandler}>Import Posts</button>
                </div>
                <textarea className={'primaryInput'} ref={dataPreview} />
            </div>
        </PostsImporterStyledDiv>
    );
};

export default PostsImporter;