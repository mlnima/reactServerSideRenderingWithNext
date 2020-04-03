import React, { useEffect, useState, useContext, useRef } from 'react';
import _ from 'lodash'
import './AdminCommentItem.scss'
import withRouter from 'next/dist/client/with-router'
import { updateComment,getComments } from '../../../../../_variables/ajaxPostsVariables'

const AdminCommentItem = props => {
    const [ state, setState ] = useState({
        hovered: false,
        checked: false,
        changed: false
    });

    const [ commentData, setCommentData ] = useState({})

    useEffect(() => {
        console.log( props)
        setCommentData(props.data)
    }, [ props.data ]);



    const onChangeHandler = e => {
        setCommentData({
            ...commentData,
            [e.target.name]: e.target.value
        })
    }

    const onSaveHandler = () => {
        updateComment({
            _id: props.data._id,
            update: commentData
        }).then(()=>{
            props.router.push(props.router.asPath)
        })
    }
    return (
        <div key={ props.data._id } className='adminCommentsItem' onMouseOver={ () => setState({ ...state, hovered: true }) } onMouseOut={ () => setState({ ...state, hovered: false }) }>
            <div className="adminCommentsItemHead">
                <input type='checkbox' checked={ state.checked } onChange={ () => state.checked ? setState({ ...state, checked: false }) : setState({ ...state, checked: true }) }/>
                <p>{ props.data.author }</p>
            </div>
            <div className="adminCommentsItemBody">
                <p>{ props.data.postedDate }</p>
                <p>{ props.data.body }</p>
                <div className='commentControl'>
                    <select name='status' value={ commentData.status  } onChange={ e => onChangeHandler(e) }>
                        <option value='approved'>Approved</option>
                        <option value='trash'>Trash</option>
                        <option value='pending'>Pending</option>
                    </select>
                    <button onClick={ () =>onSaveHandler()  }>Save Changes
                    </button>
                </div>

            </div>

        </div>
    );
};
export default withRouter(AdminCommentItem);
