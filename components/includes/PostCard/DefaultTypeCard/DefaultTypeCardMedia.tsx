import React, {useState} from 'react';
import styled from "styled-components";
import {PostTypes} from "../../../../_variables/TypeScriptTypes/PostTypes";

let DefaultTypeCardMediaStyledDiv = styled.div`
  .post-card-image {
    width: ${(props : {cardWidth:number,postElementSize:string}) =>props.postElementSize === 'list' ? '116.6px' : '100%'};
    height: calc(48vw / 1.777);
  }
  @media only screen and (min-width: 768px) { 
    .post-card-image {
      width: ${(props : {cardWidth:number,postElementSize:string}) =>props.postElementSize === 'list' ? '116.6px' : `${props.cardWidth}px`};
      height: calc(${(props : {cardWidth:number,postElementSize:string}) => props.cardWidth}px / 1.777);
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

interface DefaultTypeCardMediaPropTypes {
    post:PostTypes,
    postElementSize:string,
    cardWidth:string,
    mediaAlt:string,
    noImageUrl:string,
}

const DefaultTypeCardMedia = (props:DefaultTypeCardMediaPropTypes) => {
    const [gotError, setGotError] = useState(false)

    if (!props?.post?.mainThumbnail || gotError){
        return (
            // @ts-ignore
            <NoImageStyleDiv cardWidth={props.cardWidth} className='no-image'>
                <span className={'no-image-alt'}>{props.mediaAlt || 'NO IMAGE'}</span>
            </NoImageStyleDiv>
        )
    }else return (
        // @ts-ignore
        <DefaultTypeCardMediaStyledDiv className='post-card-media' postElementSize={props.postElementSize} cardWidth={props.cardWidth}>
            <img className='post-card-image'
                 alt={props.mediaAlt}
                 src={props?.post?.mainThumbnail}
                 onError={()=>setGotError(true)}
            />
        </DefaultTypeCardMediaStyledDiv>
    );
};
export default DefaultTypeCardMedia;
