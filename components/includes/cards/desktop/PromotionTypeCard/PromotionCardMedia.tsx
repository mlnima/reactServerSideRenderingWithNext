import React, {useState} from 'react';
import styled from "styled-components";
import {PostTypes} from "../../../../../_variables/TypeScriptTypes/PostTypes";
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";
interface PromotionCardMediaPropTypes {
    post: PostTypes,
    postElementSize: string,
    cardWidth: number,
    mediaAlt: string,
}

interface PromotionCardMediaStyledDivPropTypes {
    cardWidth: number,
    postElementSize?: string
}

const PromotionCardMediaStyledDiv = styled.div`

  width: 100%;
  height: calc(${({cardWidth}: PromotionCardMediaStyledDivPropTypes) => cardWidth}px / 1.777);
  .promotion-card-image {
    width: 100%;
    height: calc(${({cardWidth}: PromotionCardMediaStyledDivPropTypes) => cardWidth}px / 1.777);
    object-fit: contain;
  }
`

const NoImageStyleDiv = styled.div`
  width:  ${({cardWidth}: PromotionCardMediaStyledDivPropTypes) => `${cardWidth}px`};
  height: calc(${({cardWidth}: PromotionCardMediaStyledDivPropTypes) => `${cardWidth}px`} / 1.777);
  display: flex;
  justify-content: center;
  align-items: center;
  span{
    color: var(--post-element-info-text-color,#ccc);
  }
`



const PromotionCardMedia = ({post,postElementSize,cardWidth,mediaAlt}: PromotionCardMediaPropTypes) => {
    const [gotError, setGotError] = useState(false)
    const errorHandler = () => {
        !gotError ? setGotError(true) : null
    }
    if (!post.mainThumbnail || gotError){
        return (
            <NoImageStyleDiv cardWidth={cardWidth} className='no-image'>
                <span className={'no-image-alt'}>{mediaAlt || 'NO IMAGE'}</span>
            </NoImageStyleDiv>
        )
    }else return (
        // @ts-ignore
        <PromotionCardMediaStyledDiv className='promotion-card-media' postElementSize={postElementSize} cardWidth={cardWidth}>
            <CardImageRenderer imageUrl={post?.mainThumbnail}
                               mediaAlt={mediaAlt}
                               cardWidth={cardWidth}
                               cardHeight={cardWidth / 1.777}
                               errorHandler={errorHandler}
            />
        </PromotionCardMediaStyledDiv>
    );
};
export default PromotionCardMedia;
