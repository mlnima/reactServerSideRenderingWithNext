import {useRouter} from "next/router";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

const PostTitleStyledH1 = styled.h1`
  color: var(--post-page-info-color,#ccc);
  font-size: 1.25em;
  text-align: center;
`

const PostTitle = () => {

    const {locale} = useRouter()
    const {title,translations} = useSelector(({posts}:StoreTypes)=>{
        return{
            title:posts?.post?.title,
            translations:posts?.post?.translations,
        }
    })

    return (
        <PostTitleStyledH1 className='post-title'>
            {
                    translations ? translations[locale] ?
                    translations[locale]?.title || title :
                    title : title
            }
        </PostTitleStyledH1>
    )
};
export default PostTitle;
