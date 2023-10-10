import React, {FC} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import { editPostAction} from "@store/reducers/postsReducer";
import {postTypes} from "data-structures";
import {DashboardStore, Store} from "typescript-types";
import {useAppDispatch} from "@store/hooks";

const FormatStyledDiv = styled.div`
  .primarySelect {
    width: 100%;
  }
`

interface PostFormatPropTypes {
    onChangeHandler: any,
    postType: string

}

const Format: FC<PostFormatPropTypes> = ({postType}) => {
    const dispatch = useAppDispatch()
    const post = useSelector(({posts}:DashboardStore) => posts.post);

    const onChangeHandlerAndSetPreferPostTypeToLocalStorage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(editPostAction({
            [e.target.name]: e.target.value
        }))
        localStorage.setItem('preferAdminPostType', e.target.value)
    }

    return (
        <FormatStyledDiv className='format-section'>
            <select className={'primarySelect'}
                    name='postType'
                    value={post?.postType || postType || 'standard'}
                    onChange={e => onChangeHandlerAndSetPreferPostTypeToLocalStorage(e)}
            >
                {postTypes.map((postType) => {
                    return (
                        <option value={postType} key={postType}>{postType}</option>
                    )
                })}
            </select>
        </FormatStyledDiv>
    );
};

export default Format;