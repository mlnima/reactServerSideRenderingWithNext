import React, { useState } from 'react';
import AdminCommentItem from './AdminCommentItem/AdminCommentItem'
import styled from "styled-components";
let StyledDiv = styled.div`
padding: 20px;
`
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
        <StyledDiv className='AdminRenderComments'>
            { renderComments }
        </StyledDiv>
    );
};
export default AdminRenderComments;
