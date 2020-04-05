import React, { useEffect, useState, useContext } from 'react';
import DropDownWidget from "../DropDownWidget/DropDownWidget";
import { AppContext } from "../../../../context/AppContext";
import FA from "react-fontawesome";
import withRouter from "next/dist/client/with-router";
import { updatePost, savePost } from '../../../../_variables/ajaxPostsVariables'

const ActionOnPost = props => {
    const contextData = useContext(AppContext);

    const [ state, setState ] = useState({});
    useEffect(() => {

    }, []);

    const onSaveHandler = () => {
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        if (props.postData._id) {
            // contextData.functions.updatePost(contextData.editingPostData)
            updatePost(props.postData, window.location.origin).then(() => {
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                })
            }).catch(err => {
                console.log( err)
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                })
            })
        } else {
            savePost(props.postData, window.location.origin).then(() => {
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                })
            }).catch(err => {
                console.log( err)
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                })
            })
        }
    };



    return (
        <div className='ActionOnPost'>
            <div className='ActionOnPostItem'>
                <button className='saveDraftBtn'>Save Draft</button>
                <button className='previewBtn'>Preview</button>
            </div>
            <div className='ActionOnPostItem'>
                <p><FA className='fontawesomeMedium' name='key'/> Status:{ props.postData.status }</p>
                <select name='status' value={ props.postData.status } onChange={ e => props.onChangeHandler(e) }>
                    {/*<option value={ contextData.editingPostData.status }>{ contextData.editingPostData.status.charAt(0).toUpperCase() + contextData.editingPostData.status.slice(1) }</option>*/}
                    <option value='published'>Published</option>
                    <option value='draft'>Draft</option>
                    <option value='trash'>Trash</option>
                </select>
            </div>
            <div className='ActionOnPostItem'>
                <button className='SaveBtn' onClick={ () => onSaveHandler() }>Save</button>
            </div>
        </div>
    );
};

ActionOnPost.getInitialProps = async ({ query }) => {

    return { query }
};
export default withRouter(ActionOnPost);