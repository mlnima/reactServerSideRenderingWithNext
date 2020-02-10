import React, { useEffect, useState, useContext } from 'react';
import DropDownWidget from "../DropDownWidget/DropDownWidget";
import { AppContext } from "../../../../context/AppContext";
import './ActionOnPost.scss'
import FA from "react-fontawesome";
import withRouter from "next/dist/client/with-router";
const ActionOnPost = props => {
    const contextData = useContext(AppContext);

    const [ state, setState ] = useState({});
    useEffect(() => {

    }, []);

    const onSaveHandler = ()=>{
        console.log(props )
        if (contextData.editingPostData._id){
            contextData.functions.updatePost(contextData.editingPostData);
        }else {
            contextData.functions.savePosts(contextData.editingPostData);
        }
    };

    return (
        <div className='ActionOnPost'>
            <div className='ActionOnPostItem'>
                <button className='saveDraftBtn'>Save Draft</button>
                <button className='previewBtn'>Preview</button>
            </div>
            <div className='ActionOnPostItem'>
                <p><FA className='fontawesomeMedium' name='key'/> Status:{ contextData.editingPostData.status }</p>
                <select defaultValue={contextData.editingPostData.status?contextData.editingPostData.status:'draft'}>
                    <option value={contextData.editingPostData.status}>{contextData.editingPostData.status}</option>
                    <option value='Published'>Published</option>
                    <option value='Draft'>Draft</option>
                    <option value='Trash'>Trash</option>
                </select>
            </div>
            <div className='ActionOnPostItem'>
                <button className='SaveBtn' onClick={()=>onSaveHandler()}>Save</button>
            </div>
        </div>
    );
};


ActionOnPost.getInitialProps = async ({ query }) => {

    return { query }
};
export default withRouter(ActionOnPost);