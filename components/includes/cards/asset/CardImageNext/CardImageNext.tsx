import {FC, useState} from 'react'
import Image from 'next/image'
import styled from "styled-components";

interface CardImageNextPropTypes {
    imageUrl: string,
    alt: string,
    cardHeight: number,
    cardWidth: number,
    errorHandler?: any,
    objectFitValue?: string,
    strictImageSize?: boolean
}

interface CardImageNextStylePropTypes {
    imageWidth: number,
    imageHeight: number,
    objectFitValue?: string,
    strictImageSize: boolean
}

const CardImageNextStyledDiv = styled.div`
  ${({objectFitValue}) => objectFitValue ? `object-fit:${objectFitValue};` : ''};
  width: ${({
              strictImageSize,
              imageWidth
            }: CardImageNextStylePropTypes) => strictImageSize ? `${imageWidth}px` : 'calc(48vw - 5.6px)'};
  height: ${({
               strictImageSize,
               imageHeight
             }: CardImageNextStylePropTypes) => strictImageSize ? `${imageHeight}px` : 'calc(calc(48vw - 5.6px) / 1.777)'};
  @media only screen and (min-width: 768px) {
    width: ${({imageWidth}: CardImageNextStylePropTypes) => `${imageWidth}px`};
    height: ${({imageHeight}: CardImageNextStylePropTypes) => `${imageHeight}px`};
  }
`

const CardImageNext: FC<CardImageNextPropTypes> =
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
            <CardImageNextStyledDiv imageWidth={cardWidth} imageHeight={cardHeight} objectFitValue={objectFitValue}
                                    strictImageSize={strictImageSize}>
                <Image src={!gotError ? imageUrl : '/static/images/noImage/no-image-available.png'}
                       alt={alt}
                    // loading={'lazy'}
                       priority
                       layout={'responsive'}
                       width={cardWidth}
                       height={cardHeight}
                       quality={80}
                    // @ts-ignore
                       objectFit={objectFitValue || 'contain'}
                       onError={() => setGotError(true)}
                />
            </CardImageNextStyledDiv>
        )
    };
export default CardImageNext
