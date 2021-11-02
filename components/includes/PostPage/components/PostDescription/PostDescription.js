import React, {useState} from "react";
import 'react-quill/dist/quill.snow.css';
import {useRouter} from "next/router";
import parse from "html-react-parser";
import styled from "styled-components";

const PostDescriptionStyledDiv = styled.div`
  color: var(--post-page-info-color, #ccc);
  margin: 0 5px;
  padding: 50px 0;
  max-width: 95%;
  @media only screen and (min-width: 768px) {
    max-width: 1300px;
  }
`

const PostDescription = ({description, translations}) => {

    const router = useRouter();

    const [descriptionValue, setDescriptionValue] = useState(() => {
        return translations ? translations?.[router.locale] ? translations?.[router.locale]?.description || description : description : description
    });

    return (
        <PostDescriptionStyledDiv className="description">
            {descriptionValue ? parse(descriptionValue) : ''}
        </PostDescriptionStyledDiv>
    )
};

export default PostDescription;

