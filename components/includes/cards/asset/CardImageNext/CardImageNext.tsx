import {FC, useState} from 'react'
import Image from 'next/image'
import styled from "styled-components";

interface CardImageNextPropTypes {
    imageUrl: string,
    alt: string,
}

const CardImageNextStyledDiv = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;

  div {
    position: unset !important;
  }
`

const CardImageNext: FC<CardImageNextPropTypes> = ({imageUrl, alt}) => {
        const [gotError, setGotError] = useState(false)

        // const onHoverProps = onHoverHandler ? {
        //     onMouseEnter: onHoverHandler(true),
        //     onMouseOver: onHoverHandler(true),
        //     onMouseOut: onHoverHandler(false),
        //     onTouchStartCapture: onHoverHandler(true),
        //     onMouseDown: onHoverHandler(false),
        // } :{}

        return (
            <CardImageNextStyledDiv >
                <Image src={gotError || !imageUrl ? '/static/images/noImage/no-image-available.png' : imageUrl}
                       alt={alt}
                    // priority
                       layout={'fill'}
                       loading={'lazy'}
                       quality={80}
                       objectFit={'contain'}
                       onError={() => setGotError(true)}
                />
            </CardImageNextStyledDiv>
        )
    };
export default CardImageNext


// ${({objectFitValue}) => objectFitValue ? `object-fit:${objectFitValue};` : ''};
// width: ${({
//               strictImageSize,
//               imageWidth
//             }: CardImageNextStylePropTypes) => strictImageSize ? `${imageWidth}px` : 'calc(48vw - 5.6px)'};
// height: ${({
//                strictImageSize,
//                imageHeight
//              }: CardImageNextStylePropTypes) => strictImageSize ? `${imageHeight}px` : 'calc(calc(48vw - 5.6px) / 1.777)'};
// @media only screen and (min-width: 768px) {
//     width: ${({imageWidth}: CardImageNextStylePropTypes) => `${imageWidth}px`};
// height: ${({imageHeight}: CardImageNextStylePropTypes) => `${imageHeight}px`};
// }