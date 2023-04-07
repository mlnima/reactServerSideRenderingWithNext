import {FC} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "typescript-types";

const Style = styled.section`

`

interface ComponentPropTypes {
}

const PostTypeSelector: FC<ComponentPropTypes> = ({}) => {
    const dispatch = useDispatch()
    const allowedPostTypeUserCanCreate = useSelector(({settings}:Store)=>settings?.membershipSettings?.allowedPostTypeUserCanCreate)
    return (
        <Style className={'post-editor-section'}>
            <select name={'postType'} className={'custom-select'}></select>
        </Style>
    )
};

export default PostTypeSelector;


//PostTypeSelector
