import 'react-quill/dist/quill.snow.css';
import {useRouter} from "next/router";
import parse from "html-react-parser";
import {useState} from "react";
import styled from "styled-components";

const PostDescriptionStyledDiv = styled.div`
  color: var(--post-page-info-color);
  margin: 0 5px;
  padding: 50px 0;
  
`


const PostDescription = ({description, translations}) => {

    const router = useRouter();

    const [descriptionValue,setDescriptionValue] = useState(()=>{
        return translations ? translations?.[router.locale] ? translations?.[router.locale]?.description || description : description : description
    });

    return (
        <PostDescriptionStyledDiv className="description" >
            {descriptionValue ? parse(descriptionValue) : ''}
        </PostDescriptionStyledDiv>
    )
};
export default PostDescription;

