import React, {useState, useRef, ChangeEvent} from 'react';
import { useSelector} from "react-redux";
import styled from "styled-components";
import {fetchAdminPanelSaveNewPost} from "../../../../store_toolkit/adminReducers/adminPanelPostsReducer";
import {useAdminDispatch} from "../../../../store_toolkit/hooks";
import {Store} from "typescript-types";
// import {adminSaveNewPost} from "../../../../store/adminActions/adminPanelPostsActions";

const PostsImporterStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .posts-importer-form {
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    .posts-importer-form-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`

const postsImporter = () => {
    const userData = useSelector((store: Store) => store?.user.userData)
    const statusElement = useRef(null)
    const dataPreview = useRef(null)
    const dispatch = useAdminDispatch()
    const [state, setState] = useState({
        status: 'draft'
    });

    const [posts, setPosts] = useState([])

    const onImportPostsHandler = async () => {
        for await (let post of posts) {
            const postDataToSave = {
                ...post,
                status:  statusElement.current.value || 'draft',
                author:  userData._id
            }
            dispatch(fetchAdminPanelSaveNewPost({data:postDataToSave, router:null}))
        }
    }


    const onSelectFileHandler = (e:any) => {
        const reader = new FileReader()
        reader.readAsText(e.target.files[0])
        reader.onload = e => {
            if (typeof e.target.result === "string") {
                const parsedPosts = JSON.parse(e.target.result)
                if (parsedPosts?.length){
                    setPosts(parsedPosts)
                }
            }
        }
    };

    const onChangeHandler = (e:ChangeEvent<any>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    return (

        <PostsImporterStyledDiv className='posts-importer'>
            <div className={'posts-importer-form'}>
                <select ref={statusElement} className={'custom-select'} name={'status'} onChange={e => onChangeHandler(e)}>

                    <option value='' >No Change</option>
                    <option value='published'>Published</option>
                    <option value='draft'>Draft</option>
                    <option value='trash'>Trash</option>
                    <option value='pending'>Pending</option>
                    <option value='reported'>Reported</option>
                </select>
                <div className={'posts-importer-form-clientActions'}>
                    <input type='file' onChange={async e => onSelectFileHandler(e)}/>
                    <button className={'btn btn-primary'} onClick={() => onImportPostsHandler()}>Import Posts</button>
                </div>

                <textarea className={'form-control-input'} ref={dataPreview}/>
            </div>

        </PostsImporterStyledDiv>

    );
}

export default postsImporter;