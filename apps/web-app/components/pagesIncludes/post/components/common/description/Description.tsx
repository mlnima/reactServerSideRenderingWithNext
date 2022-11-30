import React, {FC, useMemo} from "react";
import {useRouter} from "next/router";
import parse from "html-react-parser";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";

const PostDescriptionStyledDiv = styled.div`
  color: var(--secondary-text-color, #ccc);
  margin-bottom: 10px;
  width: 100%;
  padding:  10px;
  box-sizing: border-box;

  @media only screen and (min-width: 768px) {
    
    max-width: 1300px;
    margin: 0 auto;
  }
`

interface PropTypes {
    descriptionRef: React.Ref<any>
}

const Description: FC<PropTypes> = ({descriptionRef}) => {

    const {locale} = useRouter();
    const {description, translations} = useSelector(({posts}: Store) => {
        return {
            description: posts.post?.description,
            translations: posts.post?.translations,
        }
    })

    const descriptionValue = useMemo(() => {
        return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ?
            description :
            translations?.[locale]?.description || description
    }, [description, translations]);

    if (descriptionValue){
        return (
            <PostDescriptionStyledDiv className="description" ref={descriptionRef}>
                {descriptionValue ? parse(descriptionValue as string) : ''}
            </PostDescriptionStyledDiv>
        )
    }else return null

};

export default Description;
