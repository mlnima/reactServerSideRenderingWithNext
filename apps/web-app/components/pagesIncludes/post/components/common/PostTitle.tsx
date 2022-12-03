import {useRouter} from "next/router";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";

const PostTitleStyledH1 = styled.h1`
  color: var(--secondary-text-color,#ccc);
  font-size: 1.25em;
  text-align: center;
  width: 100%;
  margin: 8px auto;
  
  @media only screen and (min-width: 768px) {
    width: 100%;
  }
`

const PostTitle = () => {

    const {locale} = useRouter()
    const {title,translations} = useSelector(({posts}:Store)=>{
        return{
            title:posts?.post?.title,
            translations:posts?.post?.translations,
        }
    })

    return (
        <PostTitleStyledH1 className='post-title sub-content'>
            {
                    translations ? translations[locale] ?
                    translations[locale]?.title || title :
                    title : title
            }
        </PostTitleStyledH1>
    )
};
export default PostTitle;
