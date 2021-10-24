import {useRouter} from "next/router";
import styled from "styled-components";

const PostTitleStyledH1 = styled.h1`
  color: var(--post-page-info-color,#ccc);
  font-size: 1.25em;
  text-align: center;
`

const PostTitle = ({title, translations}) => {
    const router = useRouter()

    return (
        <PostTitleStyledH1 className='post-title'>
            {
                    translations ? translations[router.locale] ?
                    translations[router.locale]?.title || title :
                    title : title
            }
        </PostTitleStyledH1>
    )
};
export default PostTitle;
