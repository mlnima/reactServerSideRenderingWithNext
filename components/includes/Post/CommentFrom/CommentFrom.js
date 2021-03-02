import React, { useEffect, useState, useContext, useRef } from 'react';
import { newComment } from '../../../../_variables/ajaxPostsVariables'
import { AppContext } from '../../../../context/AppContext'
import withRouter from 'next/dist/client/with-router'
import styled from "styled-components";
import  './CommentFrom.scss';

let StyledDiv = styled.div`${props => props.stylesData}`

const CommentFrom = props => {
    const contextData = useContext(AppContext);
    const authorInput = useRef(null)
    const emailInput = useRef(null)
    const bodyInput = useRef(null)

    const onSubmitHandler = e => {
        e.preventDefault()
        const commentData = {
            body: bodyInput.current.value,
            author: authorInput.current ? authorInput.current.value : contextData.userData.username || contextData.userData.username,
            authorID: contextData.userData._id,
            email: emailInput.current ? emailInput.current.value : contextData.userData.email || contextData.userData.email,
            onDocumentId: props.documentId,
            onDocumentTitle:props.documentTitle
        }
        if (props.documentId) {
            newComment(commentData).then(res => {
                bodyInput.current.value=''
                props.router.push({
                    pathname:props.router.pathname,
                    query:props.router.query
                })

            }).catch(err => {
                console.log(err)
            })
        }
    }

    const RenderLoggedInUser = () => {
        if (!contextData.userData.role && !contextData.userData._id) {
            return (
                <div className='comment-form-info'>
                    <input ref={ authorInput } required={ true } placeholder='Name' name='author'/>
                    <input ref={ emailInput } required={ true } placeholder='Email' name='email' type='email'/>
                </div>
            )
        } else return null
    }

    return (
        <form className='comment-form' onSubmit={ e => onSubmitHandler(e) }>
            <StyledDiv >
                <RenderLoggedInUser/>
                <div className='comment-form-input'>
                    <textarea ref={ bodyInput } required={ true } placeholder='Comment' name='body'/>
                </div>
            </StyledDiv>
            <button className='comment-form-submit-button' type='submit'>Post Comment</button>
        </form>
    );
};
export default withRouter(CommentFrom);
