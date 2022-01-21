import {FC, useRef, useState} from 'react';
import styled from "styled-components";
import CardImageRenderer from "../asset/CardImageRenderer/CardImageRenderer";

// const TagCardMediaStyledImage = styled.img`
//   width: 100%;
//   height: calc(48vw / 1.777);
//   object-fit: contain;
//   @media only screen and (min-width: 768px) {
//     width: ${(props : {cardWidth:number}) => props.cardWidth}px;
//     height: calc(${(props : {cardWidth:number}) => props.cardWidth}px / 1.777);
//   }
// `

const NoImageStyleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(48vw / 1.777);

  span{
    color: var(--post-element-info-text-color,#ccc);
  }
  @media only screen and (min-width: 768px) {
    width: ${(props : {cardWidth:number}) => props.cardWidth}px;
    height: calc(${props => props.cardWidth}px / 1.777);
  }
`

interface TagCardMediaPropTypes{
    cardWidth:number;
    imageUrl:string;
    mediaAlt:string;
}

const TagCardMedia:FC<TagCardMediaPropTypes> = (props:TagCardMediaPropTypes) => {

    const [gotError, setGotError] = useState(false)

    const errorHandler = () => {
        !gotError ? setGotError(true) : null
    }

    if (!props.imageUrl || gotError){
        return (
            <NoImageStyleDiv   cardWidth={props.cardWidth} className='no-image'>
                <span className={'no-image-alt'}>{props.mediaAlt || 'NO IMAGE'}</span>
            </NoImageStyleDiv>
        );
    }else {
        return (
            <CardImageRenderer imageUrl={props.imageUrl}
                               alt={props.mediaAlt}
                               width={props.cardWidth}
                               height={props.cardWidth / 1.777}
                               errorHandler={errorHandler}
            />
        );
    }

};
export default TagCardMedia;

// <TagCardMediaStyledImage ref={imageRef}
//                          cardWidth={props.cardWidth}
//                          className='tag-card-image'
//                          src={props.imageUrl}
//                          onError={()=>setGotError(true)}
//                          alt={props.mediaAlt}
// />