import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../context/AppContext';
import { deleteComments } from '../../../_variables/ajaxPostsVariables'
import withRouter from 'next/dist/client/with-router'

const CommentsRenderer = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        authorStyle: {},
        dateStyle: {},
        bodyStyle: {},
        style: {}
    });

    useEffect(() => {
        setState({
            ...state,
            authorStyle: {
                color: contextData.siteDesign.commentsAuthorTextColor
            },
            dateStyle: {
                color: contextData.siteDesign.commentsDateTextColor
            },
            bodyStyle: {
                color: contextData.siteDesign.commentsBodyTextColor
            },
            style: {
                backgroundColor: contextData.siteDesign.commentsBackgroundColor
            }
        })
    }, [ props ]);

    const onDeleteHandler = (id) => {
        deleteComments([ id ], window.location.origin).then(() => {
            props.router.push({
                pathname: props.router.pathname,
                query: props.router.query
            })
        }).catch(err => {
            console.log(err)
        })
    }



    const RenderAdminActionBtns = props => {
        if (contextData.userData.role === 'administrator') {
            return (
                <div className='comments-admin-action-btns'>
                    <button onClick={ () => onDeleteHandler(props.id) }>Delete</button>
                </div>
            )
        } else return null
    }

    // useEffect(() => {
    //     console.log(contextData.userData)
    // }, [ contextData.userData ]);

    const renderComments = props.comments.map(comment => {
        return (
            <div key={ comment.postedDate } style={ state.style } className='comments-item'>
                <p style={ state.authorStyle } className='comment-author'>{ comment.author } says:</p>
                <p style={ state.dateStyle } className='comment-date'>{ comment.postedDate }</p>
                <p style={ state.bodyStyle } className='comment-body'>{ comment.body }</p>
                <RenderAdminActionBtns id={ comment._id }/>
            </div>
        )
    })

    return (
        <div className='comments'>
            { renderComments }
        </div>
    );
};
export default withRouter(CommentsRenderer);
