import React, { useState } from 'react';
import './AdminRenderComments.scss'
import AdminCommentItem from './AdminCommentItem/AdminCommentItem'

const AdminRenderComments = props => {

    const [ hovered, setHovered ] = useState('')
    const [ checkedItems, setCheckedItems ] = useState([])

    const onChangeHandler = (e, id) => {
        e.target.checked ?
            setCheckedItems([ ...checkedItems, id ]) :
            setCheckedItems(checkedItems.filter(i => i !== id))
    }

    const renderComments = props.comments.map(comment => {
        return(
            <AdminCommentItem data={comment} commentData={props.getCommentsData}/>
        )
    })

    return (
        <div className='AdminRenderComments'>
            { renderComments }
        </div>
    );
};
export default AdminRenderComments;
