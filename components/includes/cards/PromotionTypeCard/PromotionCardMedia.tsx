import React, {useState} from 'react';
import styled from "styled-components";
import {PostTypes} from "../../../../_variables/TypeScriptTypes/PostTypes";
import CardImageRenderer from "../asset/CardImageRenderer/CardImageRenderer";

const PromotionCardMediaStyled = styled.div`

  width: ${(props: { cardWidth: number, postElementSize: string }) => props.postElementSize === 'list' ? '116.6px' : '48vw'};
  height: calc(48vw / 1.777);

  .promotion-card-image {
    width: 100%;
    height: calc(48vw / 1.777);
    object-fit: contain;
  }

  @media only screen and (min-width: 768px) {
    width: ${(props: { cardWidth: number, postElementSize: string }) => props.postElementSize === 'list' ? '116.6px' : '100%'};
    height: calc(${props => props.cardWidth}px / 1.777);
    .promotion-card-image {
      width: ${(props: { cardWidth: number, postElementSize: string }) => props.postElementSize === 'list' ? '116.6px' : '100%'};
      height: calc(${props => props.cardWidth}px / 1.777);
    }
  }
`

const NoImageStyleDiv = styled.div`
  width: 100%;
  height: calc(48vw / 1.777);
  display: flex;
  justify-content: center;
  align-items: center;
  span{
    color: var(--post-element-info-text-color,#ccc);
  }
  @media only screen and (min-width: 768px) {
    width:  ${(props : {cardWidth?:number}) => props?.cardWidth}px;
    height: calc(${(props : {cardWidth?:number}) => props?.cardWidth}px / 1.777);
  }
`

interface PromotionCardMediaPropTypes {
    post: PostTypes,
    postElementSize: string,
    cardWidth: number,
    mediaAlt: string,
    noImageUrl: string,
}

const PromotionCardMedia = (props: PromotionCardMediaPropTypes) => {
    const [gotError, setGotError] = useState(false)
    const errorHandler = () => {
        !gotError ? setGotError(true) : null
    }
    if (!props?.post.mainThumbnail || gotError){
        return (
            // @ts-ignore
            <NoImageStyleDiv cardWidth={props.cardWidth} className='no-image'>
                <span className={'no-image-alt'}>{props.mediaAlt || 'NO IMAGE'}</span>
            </NoImageStyleDiv>
        )
    }else return (
        // @ts-ignore
        <PromotionCardMediaStyled className='promotion-card-media' postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
            <CardImageRenderer imageUrl={props?.post.mainThumbnail}
                               alt={props.mediaAlt}
                               cardWidth={props.cardWidth}
                               cardHeight={props.cardWidth / 1.777}
                               errorHandler={errorHandler}
            />
        </PromotionCardMediaStyled>
    );
};
export default PromotionCardMedia;

// <img className='promotion-card-image'
//      alt={props.mediaAlt}
//      src={props?.post.mainThumbnail}
//      onError={()=>setGotError(true)}
// />