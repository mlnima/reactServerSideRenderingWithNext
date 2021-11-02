import React from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";
import {adminEditPost} from "../../../../store/actions/adminPanelPostsActions";

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
                <option value='video'>Video</option>
                <option value='standard'>Standard</option>
                <option value='product'>Product</option>
                <option value='promotion'>promotion</option>
                <option value='article'>Article</option>
                <option value='learn'>Learn</option>
                <option value='food'>Food</option>
                <option value='book'>Book</option>
            </select>
        </FormatStyledDiv>
    );
};

export default Format;