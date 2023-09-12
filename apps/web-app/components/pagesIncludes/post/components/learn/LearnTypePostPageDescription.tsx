import {FC, useMemo} from "react";
import {useRouter} from "next/router";
import dynamic from 'next/dynamic'
import styled from "styled-components";
import {useAppSelector} from "@store_toolkit/hooks";
// const ReactPageDescriptionRenderer = dynamic(() => import('../../components/ReactPageDescriptionRenderer/ReactPageDescriptionRenderer'))
const ObjectKeyDescriptionRenderer = dynamic(() => import('../common/description/ObjectKeyDescriptionRenderer'))

const PostDescriptionStyledDiv = styled.div`
  color: var(--secondary-text-color, #ccc);
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
    const {locale} = useRouter();

    const {description,translations,source}  = useAppSelector(({posts} )=>posts.post)

    const descriptionValue = useMemo(() => {
        return translations ?
            //@ts-ignore
                  translations?.[locale as string || process.env.NEXT_PUBLIC_DEFAULT_LOCALE] ?
                      //@ts-ignore
                      translations?.[locale as string || process.env.NEXT_PUBLIC_DEFAULT_LOCALE]?.description || description
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