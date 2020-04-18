import React, { useEffect, useState, useContext, useRef } from 'react';
import { newComment } from '../../../../_variables/ajaxPostsVariables'
import { AppContext } from '../../../../context/AppContext'

const CommentFrom = props => {
    const contextData = useContext(AppContext);

    const [ state, setState ] = useState({
        body: '',
        author: '',
        authorID:'',
        email: '',
        onDocument: props.documentId
    });

    useEffect(() => {
        if (contextData.userData.username && contextData.userData.email) {
            setState({
                ...state,
                author: contextData.userData.username,
                authorID: contextData.userData._id,
                email: contextData.userData.email,
            })
        }
    }, [ contextData.userData ]);


    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        if (state.onDocument) {
            newComment(state).then(res => {
                // console.log( res)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const RenderLoggedInUser = () => {
        if (!contextData.userData.role && !contextData.userData._id) {
            return (
                <div className='comment-form-info'>
                    <input required={ true } placeholder='Name' name='author' onChange={ e => onChangeHandler(e) }/>
                    <input type='email' required={ true } placeholder='Email' name='email' onChange={ e => onChangeHandler(e) }/>
                </div>
            )
        } else return null
    }

    return (
        <form className='comment-form' onSubmit={ e => onSubmitHandler(e) }>
            <div>
                <RenderLoggedInUser/>
                <div className='comment-form-input'>
                    <textarea required={ true } placeholder='Comment' name='body' onChange={ e => onChangeHandler(e) }/>
                </div>
            </div>
            <button className='comment-form-submit-button' type='submit'>Post Comment</button>
        </form>
    );
};
export default CommentFrom;
