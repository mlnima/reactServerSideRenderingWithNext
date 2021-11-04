import React from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";
import {adminEditPost} from "../../../../store/actions/adminPanelPostsActions";
import postTypes from "../../../global/postTypes";

const FormatStyledDiv = styled.div`
.custom-select{
  width: 100%;
}
`
interface PostFormatPropTypes {
    onChangeHandler:any,
    postType:string

}

const Format = ({onChangeHandler,postType}:PostFormatPropTypes) => {
    const dispatch = useDispatch()
    const post = useSelector((state : StoreTypes) => state.adminPanelPosts.post);

    const onChangeHandlerAndSetPreferPostTypeToLocalStorage = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        dispatch(adminEditPost({
            [e.target.name]: e.target.value
        }))
        if (typeof window !== 'undefined') localStorage.setItem('preferAdminPostType',e.target.value)
    }

    return (
        <FormatStyledDiv className='format-section'>
            <select className={'custom-select'}
                    name='postType'
                    value={post?.postType || postType || 'standard'}
                    onChange={e => onChangeHandlerAndSetPreferPostTypeToLocalStorage(e)}
            >
                {postTypes.map(postType=>{
                    return(
                        <option value={postType}>{postType}</option>
                    )
                })}

            </select>
        </FormatStyledDiv>
    );
};

export default Format;