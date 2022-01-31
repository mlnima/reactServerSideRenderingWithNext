import {FC} from 'react'
import styled from "styled-components";

interface CardImageNextPropTypes {
    imageUrl: string,
    alt: string,
    cardWidth: number,
    cardHeight: number,
    errorHandler?: any,
    objectFitValue?: string,
    strictImageSize?:boolean
}

interface CardImageNextStylePropTypes {
    cardWidth: number,
    cardHeight: number,
    objectFitValue?: string,
    strictImageSize?:boolean,
}

const CardImageNextStyledImg = styled.img`
  ${({objectFitValue}) => objectFitValue ? `object-fit:${objectFitValue};` : ''}
  width: ${({strictImageSize,cardWidth} :CardImageNextStylePropTypes )=> strictImageSize ? `${cardWidth}px` :  'calc(48vw - 5.6px)'};
  height: ${({strictImageSize,cardWidth} :CardImageNextStylePropTypes )=> strictImageSize ? `${cardWidth}px` :  'calc(calc(48vw - 5.6px) / 1.777)'} ;
  position: relative;
  
  @media only screen and (min-width: 768px) {
    width: ${({cardWidth,strictImageSize}: CardImageNextStylePropTypes) => strictImageSize? '' : `${cardWidth}px`};
    height: ${({cardHeight,strictImageSize}: CardImageNextStylePropTypes) => strictImageSize? '' :`${cardHeight}px`};
  }
`

const CardImageNext: FC<CardImageNextPropTypes> = ({imageUrl, alt, cardWidth, cardHeight, objectFitValue,strictImageSize, errorHandler}) => {
    return (
        <CardImageNextStyledImg src={imageUrl}
                                alt={alt}
                                strictImageSize={strictImageSize}
                                cardWidth={cardWidth}
                                cardHeight={cardHeight}
                                objectFitValue={objectFitValue || 'contain'}
                                onError={() => errorHandler ? errorHandler : null}
        />
    )
};
export default CardImageNext
