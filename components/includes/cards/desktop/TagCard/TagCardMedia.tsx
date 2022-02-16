import {FC,useState} from 'react';
import styled from "styled-components";
import CardImageRenderer from "../../asset/CardImageRenderer/CardImageRenderer";

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
    width: ${({cardWidth} : {cardWidth:number}) => cardWidth}px;
    height: calc(${({cardWidth}) => cardWidth}px / 1.777);
  }
`

interface TagCardMediaPropTypes{
    cardWidth:number;
    imageUrl:string;
    mediaAlt:string;
}

const TagCardMedia:FC<TagCardMediaPropTypes> = (props:TagCardMediaPropTypes) => {

    const [gotError, setGotError] = useState(false)

    if (!props.imageUrl || gotError){
        return (
            <NoImageStyleDiv  cardWidth={props.cardWidth} className={'no-image'}>
                <span className={'no-image-alt'}>{props.mediaAlt || 'NO IMAGE'}</span>
            </NoImageStyleDiv>
        );
    }else {
        return (
            <CardImageRenderer imageUrl={props.imageUrl}
                               mediaAlt={props.mediaAlt}
                               cardWidth={props.cardWidth}
                               cardHeight={props.cardWidth / 1.777}
                               errorHandler={()=>setGotError(true)}
            />
        );
    }

};
export default TagCardMedia;
