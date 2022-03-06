import {FC} from 'react';
import styled from "styled-components";
import {PostTypes} from "@_variables/TypeScriptTypes/PostTypes";

interface DefaultTypeCardMediaPropTypes {
    post:PostTypes,
    postElementSize:string,
    cardWidth:number,
    mediaAlt:string,
}

interface DefaultTypeCardMediaStyledDivPropTypes{
    cardWidth:number,
    postElementSize:string
}

let DefaultTypeCardMediaStyledDiv = styled.div`
  .post-card-image {
    width: ${({postElementSize} : DefaultTypeCardMediaStyledDivPropTypes) => postElementSize === 'list' ? '116.6px' : '100%'};
    height: calc(48vw / 1.777);
    object-fit: contain;
  }
  @media only screen and (min-width: 768px) { 
    .post-card-image {
      width: ${({postElementSize,cardWidth}  : DefaultTypeCardMediaStyledDivPropTypes) =>postElementSize === 'list' ? '116.6px' : `${cardWidth}px`};
      height: calc(${({cardWidth} : DefaultTypeCardMediaStyledDivPropTypes) => cardWidth}px / 1.777);
    }
  }
`


const DefaultTypeCardMedia:FC<DefaultTypeCardMediaPropTypes> =
    ({
         cardWidth,
         postElementSize,
         post,
         mediaAlt,
    }) => {

    return (
        <DefaultTypeCardMediaStyledDiv className='post-card-media' postElementSize={postElementSize} cardWidth={cardWidth}>
            <img className='post-card-image'
                 alt={mediaAlt}
                 src={post?.mainThumbnail}
            />
        </DefaultTypeCardMediaStyledDiv>
    );
};
export default DefaultTypeCardMedia;
