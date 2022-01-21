import {FC} from 'react'
import styled from "styled-components";

const CardImageNextStyledImg = styled.img`
  width: calc(48vw - 5.6px);
  height: calc(calc(48vw - 5.6px)/1.777);
  position:relative;
  @media only screen and (min-width: 768px) {
    width: ${(props: { width: number, height: number }) => `${props.width}px`};
    height: ${(props: { width: number, height: number }) => `${props.height}px`};
  }
`

interface CardImageNextPropTypes {
    imageUrl: string,
    alt:string,
    width: number,
    height: number,
    errorHandler?:any
}

const CardImageNext: FC<CardImageNextPropTypes> = ({imageUrl,alt, width, height,errorHandler}) => {
    return (
        <CardImageNextStyledImg src={imageUrl} alt={alt} width={width} height={height} onError={()=>errorHandler? errorHandler : null}/>
    )
};
export default CardImageNext
