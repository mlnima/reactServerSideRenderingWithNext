import React, {FC} from "react";
import styled from "styled-components";
import { useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {adminEditPost} from "@store_toolkit/adminReducers/adminPanelPostsReducer";
import postTypes from "../../../global/postTypes";
import {useAppDispatch} from "@store_toolkit/hooks";

const FormatStyledDiv = styled.div`
.custom-select{
  width: 100%;
}
`
interface PostFormatPropTypes {
    onChangeHandler:any,
    postType:string

}

const Format:FC<PostFormatPropTypes> = ({postType}) => {
    const dispatch = useAppDispatch()
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
                {postTypes.map((postType,index)=>{
                    return(
                        <option value={postType} key={index}>{postType}</option>
                    )
                })}

            </select>
        </FormatStyledDiv>
    );
};

export default Format;