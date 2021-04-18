import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../context/AppContext';
import { deleteComments } from '../../../_variables/ajaxPostsVariables'
import withRouter from 'next/dist/client/with-router'
import _ from "lodash";


const CommentsRenderer = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        authorStyle: {},
        dateStyle: {},
        bodyStyle: {},
        style: {}
    });

    // useEffect(() => {
    //     setState({
    //         ...state,
    //         authorStyle: {
    //             color: contextData.siteDesign.commentsAuthorTextColor
    //         },
    //         dateStyle: {
    //             color: contextData.siteDesign.commentsDateTextColor
    //         },
    //         bodyStyle: {
    //             color: contextData.siteDesign.commentsBodyTextColor
    //         },
    //         style: {
    //             backgroundColor: contextData.siteDesign.commentsBackgroundColor
    //         }
    //     })
    // }, [ props ]);

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



    const renderComments = props.comments.map(comment => {

        const commentDate = new Date(comment.postedDate)
        return (
            <div key={ _.uniqueId('id_') } style={ state.style } className='comments-item'>
                <p style={ state.dateStyle } className='comment-date'>{ commentDate.toLocaleDateString() }</p>
                <p style={ state.authorStyle } className='comment-author'>{ comment.author }:</p>
                <p style={ state.bodyStyle } className='comment-body'>{ comment.body }</p>
                {
                    contextData.userData.role === 'administrator' ?
                    <div className='comments-admin-action-btns'>
                        <button onClick={ () => onDeleteHandler(comment._id ) }>Delete</button>
                    </div>:null
                }
                <div className='comment-triangle' style={{
                    borderLeft: `60px ${state.style.backgroundColor || 'transparent'} solid `
                }}/>
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
