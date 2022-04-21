import React, {FC, useMemo} from "react";
import {useRouter} from "next/router";
// import parse from "html-react-parser";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
//import 'react-quill/dist/quill.snow.css';

const PostDescriptionStyledDiv = styled.div`
  color: var(--post-page-info-color, #ccc);
  margin: 0 5px;
  padding: 50px 0;
  max-width: 95%;

  @media only screen and (min-width: 768px) {
    max-width: 1300px;
  }
`

const PostDescription: FC = () => {

    const {locale} = useRouter();
    const {description, translations} = useSelector(({posts}: StoreTypes) => {
        return{
            description:posts.post?.description,
            translations:posts.post?.translations,
        }
    })

    const descriptionValue = useMemo(() => {
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
               description :
               translations?.[locale]?.description || description
    }, [description, translations]);

    return (
        <PostDescriptionStyledDiv className="description" dangerouslySetInnerHTML={{__html:descriptionValue as string}}/>
    )
};

export default PostDescription;
//
// <PostDescriptionStyledDiv className="description" dangerouslySetInnerHTML={{__html:descriptionValue as string}}>
//     {descriptionValue ? parse(descriptionValue as string) : ''}
// </PostDescriptionStyledDiv>