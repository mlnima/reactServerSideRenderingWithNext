import React, {useRef,useState} from 'react';
import styled from "styled-components";

const CategoryCardMediaStyledImage = styled.img`
  width: 100%;
  height: calc(48vw / 1.777);
  object-fit: contain;
  @media only screen and (min-width: 768px) {
    width: ${(props : {cardWidth:number}) => props?.cardWidth}px;
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
    width:  ${(props : {cardWidth:number}) => props?.cardWidth}px;
    height: calc(${(props : {cardWidth:number}) => props?.cardWidth}px / 1.777);
  }
`

interface CategoryCardMediaPropTypes{
    cardWidth:number;
    imageUrl:string;
    mediaAlt:string;
}

const CategoryCardMedia = (props:CategoryCardMediaPropTypes) => {
    const imageRef = useRef(null)
    const [gotError,setGotError] = useState(false)

    if (!props.imageUrl || gotError){

        return (
            <NoImageStyleDiv cardWidth={props.cardWidth} className='no-image'>
                <span className={'no-image-alt'}>{props.mediaAlt || 'NO IMAGE'}</span>
            </NoImageStyleDiv>
        );
    }else {
        return (
            <CategoryCardMediaStyledImage cardWidth={props.cardWidth}
                                          ref={imageRef}
                                          className='category-card-image'
                                          src={props.imageUrl}
                                          alt={props.mediaAlt}
                                          onError={()=>setGotError(true)}
                />
        );
    }

};
export default CategoryCardMedia;
