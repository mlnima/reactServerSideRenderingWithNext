import React, { useState, useRef} from 'react';
import {useSelector} from "react-redux";
import {fetchAdminPanelSaveNewPost} from "../../../../store_toolkit/adminReducers/adminPanelPostsReducer";
import {useAdminDispatch} from "../../../../store_toolkit/hooks";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const importContent = () => {
    const userData = useSelector((store:Store) => store?.user.userData)
    const dataPreview = useRef(null)
    const dispatch = useAdminDispatch()
    const [state, setState] = useState({
        data: []
    });

    const onImportPostsHandler = async () => {
        if (state.data[1]) {
            // @ts-ignore
            if (state.data[1].title) {
                for await (let post of state.data) {
                    // @ts-ignore
                    post.status = 'draft'
                    // @ts-ignore
                    post.author = userData._id
                    // @ts-ignore
                    post.tags = post.tags ? post.tags.map(tag => {
                        if (tag.name && tag.type){
                            return tag
                        }else{
                            return {name: tag.trim(), type: 'tags'}
                        }
                    }) : []
                    // @ts-ignore
                    post.categories = post.categories ? post.categories.map(category => {

                        if (category.name && category.type){
                            return category
                        }else{
                            return {name: category.trim(), type: 'categories'}
                        }


                    }) : []
                    // @ts-ignore
                    post.actors = post.actors ? post.actors.map(actor => {
                        if (actor.name && actor.type){
                            return actor
                        }else{
                            return {name: actor.trim(), type: 'actors'}
                        }
                    }) : []
                    dispatch(fetchAdminPanelSaveNewPost({data:post,router:null}))

                }
            }
        }

    }
    return (

            <div className='import-content'>
                <input type='file' onChange={async e => {
                    const reader = new FileReader()
                    // @ts-ignore
                    reader.readAsText(e.target.files[0])
                    reader.onload = e => {
                        // @ts-ignore
                        setState({...state, data: JSON.parse(e.target.result)})
                    }
                }}/>
                <button onClick={() => onImportPostsHandler()}>Import Posts</button>
                <textarea ref={dataPreview}/>
            </div>

    );
};

export default importContent;
