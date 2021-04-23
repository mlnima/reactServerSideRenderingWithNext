import React, { useEffect, useState, useContext, useRef } from 'react';
import { newComment } from '../../../../_variables/ajaxPostsVariables'
import { AppContext } from '../../../../context/AppContext'
import withRouter from 'next/dist/client/with-router'
import styled from "styled-components";


let StyledDiv = styled.div`${props => props.stylesData}`
let StyledFrom = styled.form`
  display: flex;
  flex-direction: column;
  width: 95%;
  .comment-form-info{
    display: flex;
    justify-content: flex-start;
    input{
      width: 50%;
    }
  }
  .comment-form-input {
    display: flex;
    textarea {
      width: 100%;
    }
  }

  .comment-form-submit-button {
      background: linear-gradient(#67ae55, #578843);
  box-shadow: inset 0 1px 1px #a4e388;
  border-color: #3b6e22 #3b6e22 #2c5115;
  //border: 1px solid;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  letter-spacing: 1px;
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 0, 0, .5);
  width: 200px;
  height: 40px;
  min-width: 194px;
  padding: 7px 20px;
  text-align: center;
  line-height: 126%;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 10px;
  }

  input, textarea {
    background-color: #282828;
    margin: 5px;
    border: 1px solid #181818;
    color: white;
  }

  textarea {
    min-height: 200px;
  }
`

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
        <StyledFrom className='comment-form' onSubmit={ e => onSubmitHandler(e) }>
            <StyledDiv >
                <RenderLoggedInUser/>
                <div className='comment-form-input'>
                    <textarea ref={ bodyInput } required={ true } placeholder='Comment' name='body'/>
                </div>
            </StyledDiv>
            <button className='comment-form-submit-button' type='submit'>Post Comment</button>
        </StyledFrom>
    );
};
export default withRouter(CommentFrom);
