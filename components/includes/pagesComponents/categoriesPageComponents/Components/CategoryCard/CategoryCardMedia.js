import React, {useRef} from 'react';
import styled from "styled-components";

const CategoryCardMediaStyledImage = styled.img`
  width: 100%;
  height: calc(48vw / 1.777);
  @media only screen and (min-width: 768px) {
    width: ${props => props.cardWidth}px;
    height: calc(${props => props.cardWidth}px / 1.777);
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
    width: ${props => props.cardWidth}px;
    height: calc(${props => props.cardWidth}px / 1.777);
  }
`

const CategoryCardMedia = props => {
    const imageRef = useRef(null)

    if (!props.imageUrl){
        return (
            <NoImageStyleDiv   cardWidth={props.cardWidth} className='no-image'>
                <span>NO IMAGE</span>
            </NoImageStyleDiv>
        );
    }else {
        return (
            <CategoryCardMediaStyledImage cardWidth={props.cardWidth}
                                          ref={imageRef}
                                          className='category-card-image'
                                          src={props.imageUrl}
                                          alt={props.mediaAlt}/>
        );
    }

};
export default CategoryCardMedia;
