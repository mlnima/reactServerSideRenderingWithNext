// @ts-nocheck
'use client';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useAppSelector } from '@storeDashboard/hooks';

import { useAppDispatch } from '@storeDashboard/hooks';
import { dashboardAPIRequestCreateNewPost } from '@repo/api-requests';
import qualityConvertor from '../../assets/components/qualityConvertor';
import './styles.scss';


const ImportPostsPage = (): JSX.Element => {
  const userData = useAppSelector(({ users }) => users?.userData);
  const statusElement = useRef(null);
  const dataPreview = useRef(null);
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    status: 'draft',
  });

  const [posts, setPosts] = useState([]);

  const onImportPostsHandler = async () => {
    for await (let post of posts) {
      const postDataToSave = {
        ...post,
        status: statusElement.current.value || 'draft',
        quality: qualityConvertor(post.quality),
        author: userData._id,
      };
      await dashboardAPIRequestCreateNewPost(postDataToSave);
      // dispatch(createNewPostAction({data:postDataToSave, router:null}))
    }
  };

  const onSelectFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = e => {
      if (typeof e.target.result === 'string') {
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
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="ImportPostsPage">
      <div className={'posts-importer-form'}>
        <select ref={statusElement} className={'primarySelect'} name={'status'} onChange={onChangeHandler}>
          <option value="">No Change</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="trash">Trash</option>
          <option value="pending">Pending</option>
          <option value="reported">Reported</option>
        </select>
        <div className={'posts-importer-form-clientActions'}>
          <input type="file" onChange={onSelectFileHandler} />
          <button className={'btn btn-primary'} onClick={onImportPostsHandler}>Import Posts</button>
        </div>
        <textarea className={'primaryInput'} ref={dataPreview} />
      </div>
    </div>
  );
};

export default ImportPostsPage;