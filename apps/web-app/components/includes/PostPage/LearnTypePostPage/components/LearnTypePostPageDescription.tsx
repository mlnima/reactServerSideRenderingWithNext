import {FC, useMemo} from "react";
import {useRouter} from "next/router";
import dynamic from 'next/dynamic'
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
// const ReactPageDescriptionRenderer = dynamic(() => import('../../components/ReactPageDescriptionRenderer/ReactPageDescriptionRenderer'))
const ObjectKeyDescriptionRenderer = dynamic(() => import('../../components/ObjectKeyDescriptionRenderer/ObjectKeyDescriptionRenderer'))

const PostDescriptionStyledDiv = styled.div`
  color: var(--post-page-info-color, #ccc);
  margin: 0 5px;
  padding: 50px 0;
  width: 100%;
  max-width: 98vw;
  @media only screen and (min-width: 768px) {
    max-width: 1300px;
    .crayons-article__body{
      max-width: 100%;
      .js-code-highlight{
      }
    }
  }
`

const LearnTypePostPageDescription :FC = () => {
    const router = useRouter();

    const {description,translations,source}  = useSelector(({posts}:Store)=>posts.post)

    const descriptionValue = useMemo(() => {
        return translations ?
                  translations?.[router?.locale || process.env.NEXT_PUBLIC_DEFAULT_LOCAL] ?
                      translations?.[router?.locale || process.env.NEXT_PUBLIC_DEFAULT_LOCAL]?.description || description
                  : description
               : description;
    },[description]);

    return (
        <PostDescriptionStyledDiv className={'learn-post-description'}>
            {Array.isArray(description) && source ? <ObjectKeyDescriptionRenderer description={descriptionValue}/>:
                null
            }
        </PostDescriptionStyledDiv>
    );
};


export default LearnTypePostPageDescription;