import React, { useEffect, useState, useContext, useRef } from 'react';
import {newComment} from '../../../../_variables/ajaxPostsVariables'

const CommentFrom = props => {
    const [ state, setState ] = useState({
        body:'',
        author:'',
        email:'',
        onDocument: props.documentId
    });
    useEffect(() => {
        console.log( props)
    }, [props]);

    const onChangeHandler = e =>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    const onSubmitHandler = e=>{
        e.preventDefault()
        if (state.onDocument){
            newComment(state).then(res=>{
                console.log( res)
            }).catch(err=>{
                console.log( err)
            })
        }
    }


    return (
        <form className='comment-form' onSubmit={e=>onSubmitHandler(e)}>
            <div className='comment-form-input'>
                <textarea required={true} placeholder='Comment' name='body' onChange={e=>onChangeHandler(e)}/>
            </div>
            <div className='comment-form-info'>
                <input required={true} placeholder='Name' name='author' onChange={e=>onChangeHandler(e)}/>
                <input type='email' required={true} placeholder='Email' name='email' onChange={e=>onChangeHandler(e)}/>
            </div>

            <button  className='comment-form-submit-button' type='submit'>Post Comment</button>
        </form>
    );
};
export default CommentFrom;
