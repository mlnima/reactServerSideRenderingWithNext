import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from '../../../context/AppContext';
import {deleteComments} from '../../../_variables/ajaxPostsVariables'
import withRouter from 'next/dist/client/with-router'
import _ from "lodash";
import styled from "styled-components";

let StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  max-width:90%;
  padding: 5px;
  .comments-item {
    padding: 5px 10px;
    border-radius: 12px;
    min-width: 250px;
    text-align: left;
    margin: 5px;
    position: relative;
    .comment-triangle{
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 0;
      height: 0;
      border-top: 60px solid transparent;
      border-bottom: 60px solid transparent;
      z-index: -1;
      border-left: 60px solid transparent;
    }
    .comment-author{
      color:var( --main-blue-color);
    }
    .comment-date{
      color:var( --main-red-color);
    }
    .comment-body{
      color: var(--main-text-color);
    }
  }
`

const CommentsRenderer = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        authorStyle: {},
        dateStyle: {},
        bodyStyle: {},
        style: {}
    });

    const onDeleteHandler = (id) => {
        deleteComments([id], window.location.origin).then(() => {
            props.router.push({
                pathname: props.router.pathname,
                query: props.router.query
            })
        }).catch(err => {
            console.log(err)
        })
    }

    const renderComments = props.comments.map(comment => {

        const commentDate = new Date(comment.postedDate)
        return (
            <div key={_.uniqueId('id_')} style={state.style} className='comments-item'>
                <p style={state.dateStyle} className='comment-date'>{commentDate.toLocaleDateString()}</p>
                <p style={state.authorStyle} className='comment-author'>{comment.author}:</p>
                <p style={state.bodyStyle} className='comment-body'>{comment.body}</p>
                {
                    contextData.userData.role === 'administrator' ?
                        <div className='comments-admin-action-btns'>
                            <button onClick={() => onDeleteHandler(comment._id)}>Delete</button>
                        </div> : null
                }
                <div className='comment-triangle' style={{
                    borderLeft: `60px ${state.style.backgroundColor || 'transparent'} solid `
                }}/>
            </div>
        )
    })

    return (
        <StyledDiv className='comments'>
            {renderComments}
        </StyledDiv>
    );
};
export default withRouter(CommentsRenderer);
