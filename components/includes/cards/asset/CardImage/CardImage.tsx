import {FC, useState} from 'react'
import styled from "styled-components";

interface CardImagePropTypes {
    imageUrl: string,
    alt: string,
}

const CardImageStyledImg = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: contain;
`

const CardImage: FC<CardImagePropTypes> =
    ({
         imageUrl,
         alt,
     }) => {
        const [gotError,setGotError] = useState(false)

        return (
            <CardImageStyledImg src={gotError || !imageUrl ? '/static/images/noImage/no-image-available.png' : imageUrl}
                                alt={alt}
                                onError={() => setGotError(true)}
            />
        )
    };
export default CardImage


// ${({objectFitValue}) => objectFitValue ? `object-fit:${objectFitValue};` : ''}
// width: ${({strictImageSize, cardWidth}: CardImageStylePropTypes) => strictImageSize ? `${cardWidth}px` : 'calc(48vw - 5.6px)'};
// height: ${({strictImageSize, cardWidth}: CardImageStylePropTypes) => strictImageSize ? `${cardWidth}px` : 'calc(calc(48vw - 5.6px) / 1.777)'};
// position: relative;
//
// @media only screen and (min-width: 768px) {
//   width: ${({cardWidth, strictImageSize}: CardImageStylePropTypes) => strictImageSize ? '' : `${cardWidth}px`};
//   height: ${({cardHeight, strictImageSize}: CardImageStylePropTypes) => strictImageSize ? '' : `${cardHeight}px`};
// }