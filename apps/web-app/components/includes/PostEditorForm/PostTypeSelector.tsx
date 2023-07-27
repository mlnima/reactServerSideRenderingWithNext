import {FC} from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@store_toolkit/hooks";

const Style = styled.section`

`

interface ComponentPropTypes {
}

const PostTypeSelector: FC<ComponentPropTypes> = ({}) => {
    const dispatch = useDispatch()
    const allowedPostTypeUserCanCreate = useAppSelector(({settings})=>settings?.membershipSettings?.allowedPostTypeUserCanCreate)
    return (
        <Style className={'post-editor-section'}>
            <select name={'postType'} className={'custom-select'}></select>
        </Style>
    )
};

export default PostTypeSelector;


//PostTypeSelector
