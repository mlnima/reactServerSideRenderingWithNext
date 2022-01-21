import {FC} from 'react'
import Image from 'next/image'
import styled from "styled-components";

const CardImageNextStyledDiv = styled.div`
  width: calc(48vw - 5.6px);
  height: calc(calc(48vw - 5.6px)/1.777);
  position:relative;
  span{
    img{
      object-fit: contain;
    }
  }
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
        <CardImageNextStyledDiv width={width} height={height}>
            <Image src={imageUrl}
                   alt={alt}
                   loading={'lazy'}
                   layout={'fill'}
                   quality={80}
                   onError={()=>errorHandler? errorHandler : null}
                   // priority
            />
        </CardImageNextStyledDiv>
    )
};
export default CardImageNext
