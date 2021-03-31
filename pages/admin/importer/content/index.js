import React, {useEffect, useState, useContext, useRef} from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout';
import {savePost} from '../../../../_variables/ajaxPostsVariables'
import {AppContext} from "../../../../context/AppContext";

const importContent = props => {
    const contextData = useContext(AppContext);
    const dataPreview = useRef(null)
    const [state, setState] = useState({
        data: []
    });
    useEffect(() => {
    }, []);

    const onImportPostsHandler = async () => {
        if (state.data[1]) {
            if (state.data[1].title) {
                for await (let post of state.data) {
                    post.status = 'draft'
                    post.author = contextData.userData._id
                    post.tags = post.tags ? post.tags.map(tag => {
                        if (tag.name && tag.type){
                            return tag
                        }else{
                            return {name: tag.trim(), type: 'tags'}
                        }




                    }) : []
                    post.categories = post.categories ? post.categories.map(category => {

                        if (category.name && category.type){
                            return category
                        }else{
                            return {name: category.trim(), type: 'categories'}
                        }


                    }) : []
                    post.actors = post.actors ? post.actors.map(actor => {
                        if (actor.name && actor.type){
                            return actor
                        }else{
                            return {name: actor.trim(), type: 'actors'}
                        }





                    }) : []
                    await savePost(post, window.location.origin)
                }
            }
        }
        console.log(state.data)
    }
    return (

            <div className='import-content'>
                <input type='file' onChange={async e => {
                    const reader = new FileReader()
                    reader.readAsText(e.target.files[0])
                    reader.onload = e => {
                        // console.log( e.target.result)
                        setState({...state, data: JSON.parse(e.target.result)})
                    }
                }}/>
                <button onClick={() => onImportPostsHandler()}>Import Posts</button>
                <textarea ref={dataPreview}/>
            </div>

    );
};
export default importContent;
