import React, {useRef, useState} from 'react';
import styled from "styled-components";

const TagCardMediaStyledImage = styled.img`
  width: 100%;
  height: calc(48vw / 1.777);
  @media only screen and (min-width: 768px) {
    width: ${(props : {cardWidth:number}) => props.cardWidth}px;
    height: calc(${(props : {cardWidth:number}) => props.cardWidth}px / 1.777);
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
    width: ${(props : {cardWidth:number}) => props.cardWidth}px;
    height: calc(${props => props.cardWidth}px / 1.777);
  }
`

interface TagCardMediaPropTypes{
    cardWidth:number;
    imageUrl:string;
    mediaAlt:string;
}

const TagCardMedia = (props:TagCardMediaPropTypes) => {
    const imageRef = useRef(null)
    const [gotError, setGotError] = useState(false)

    if (!props.imageUrl || gotError){
        return (
            <NoImageStyleDiv   cardWidth={props.cardWidth} className='no-image'>
                <span className={'no-image-alt'}>{props.mediaAlt || 'NO IMAGE'}</span>
            </NoImageStyleDiv>
        );
    }else {
        return (
            <TagCardMediaStyledImage ref={imageRef}
                                     cardWidth={props.cardWidth}
                                     className='tag-card-image'
                                     src={props.imageUrl}
                                     onError={()=>setGotError(true)}
                                     alt={props.mediaAlt}
            />
        );
    }

};
export default TagCardMedia;
