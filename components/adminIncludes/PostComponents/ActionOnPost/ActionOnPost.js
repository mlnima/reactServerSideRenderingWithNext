import React, { useContext } from 'react';
import DropDownWidget from "../DropDownWidget/DropDownWidget";
import { AppContext } from "../../../../context/AppContext";
import withRouter from "next/dist/client/with-router";
import { updatePost, savePost } from '../../../../_variables/ajaxPostsVariables'

const ActionOnPost = props => {
    const contextData = useContext(AppContext);

    const onSaveHandler = () => {
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        const postValue = {
            ...props.postData,
            author: props.postData.author ? props.postData.author : contextData.userData._id,
            price: props.postData.postType === 'product' ? props.postData.price ? props.postData.price : 0 : 0
        }

        if (props.postData._id) {
            // contextData.functions.updatePost(contextData.editingPostData)
            updatePost(postValue, window.location.origin).then(() => {
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                })
            }).catch(err => {
                console.log(err)
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                })
            })
        } else {

            savePost(postValue, window.location.origin).then(res => {

                props.router.push('/admin/post?id=' + res.data.savedPostData._id)
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                })
            }).catch(err => {

                contextData.dispatchAlert({
                    ...contextData.alert,
                    active: true,
                    alertMessage: err.response.data.error,
                    type: 'error'
                })
                contextData.dispatchState({
                    ...contextData.state,
                    loading: false
                })
            })
        }
    };

    const onViewHandler = () => {
        window.open('/' + props.postData.title, '_blank')
    }

    return (
        <div className='ActionOnPost'>
            <div className='ActionOnPostItem'>
                <button className='previewBtn' onClick={ () => onViewHandler() }>View</button>
            </div>
            <div className='ActionOnPostItem'>
                <select name='status' value={ props.postData.status } onChange={ e => props.onChangeHandler(e) }>
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