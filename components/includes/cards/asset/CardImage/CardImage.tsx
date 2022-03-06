import {FC, useState} from 'react'
import styled from "styled-components";

interface CardImagePropTypes {
    imageUrl: string,
    alt: string,
    cardWidth: number,
    cardHeight: number,
    errorHandler?: any,
    objectFitValue?: string,
    strictImageSize?: boolean
}

interface CardImageStylePropTypes {
    cardWidth: number,
    cardHeight: number,
    objectFitValue?: string,
    strictImageSize?: boolean,
}

const CardImageStyledImg = styled.img`
  ${({objectFitValue}) => objectFitValue ? `object-fit:${objectFitValue};` : ''}
  width: ${({strictImageSize, cardWidth}: CardImageStylePropTypes) => strictImageSize ? `${cardWidth}px` : 'calc(48vw - 5.6px)'};
  height: ${({strictImageSize, cardWidth}: CardImageStylePropTypes) => strictImageSize ? `${cardWidth}px` : 'calc(calc(48vw - 5.6px) / 1.777)'};
  position: relative;

  @media only screen and (min-width: 768px) {
    width: ${({cardWidth, strictImageSize}: CardImageStylePropTypes) => strictImageSize ? '' : `${cardWidth}px`};
    height: ${({cardHeight, strictImageSize}: CardImageStylePropTypes) => strictImageSize ? '' : `${cardHeight}px`};
  }
`

const CardImage: FC<CardImagePropTypes> =
    ({
         imageUrl,
         alt,
         cardWidth,
         cardHeight,
         objectFitValue,
         strictImageSize,
         errorHandler
     }) => {
        const [gotError,setGotError] = useState(false)

        return (
            <CardImageStyledImg src={!gotError ? imageUrl : '/static/images/noImage/no-image-available.png'}
                                alt={alt}
                                strictImageSize={strictImageSize}
                                cardWidth={cardWidth}
                                cardHeight={cardHeight}
                                objectFitValue={objectFitValue || 'contain'}
                                onError={() => setGotError(true)}
            />
        )
    };
export default CardImage
