import {useContext} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import {useRouter} from "next/router";
import styled from "styled-components";

const PostTitleStyledH1 = styled.h1`
  color: var(--post-page-info-color);
  font-size: 1.25em;
  text-align: center;
`

const PostTitle = ({title, translations}) => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    return (
        <PostTitleStyledH1 className='post-title'>
            {
                translations ? translations[router.locale ?? contextData.state.activeLanguage] ?
                    translations[router.locale ?? contextData.state.activeLanguage]?.title || title :
                    title : title
            }
        </PostTitleStyledH1>
    )
};
export default PostTitle;
