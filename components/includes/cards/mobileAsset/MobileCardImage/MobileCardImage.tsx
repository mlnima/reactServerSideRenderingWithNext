import {FC, useState} from 'react'
import styled from "styled-components";

interface MobileCardImagePropTypes {
    imageUrl: string,
    mediaAlt: string,
    postsPerRawForMobile: number
}

interface CardImageStylePropTypes {
    postsPerRawForMobile?: number
}

const CardImageStyledImg = styled.img`
  object-fit: contain;
  width: ${({postsPerRawForMobile}: CardImageStylePropTypes) => `calc(96vw  / ${postsPerRawForMobile || 1})`};
  height: ${({postsPerRawForMobile}: CardImageStylePropTypes) => `calc((96vw  / ${postsPerRawForMobile || 1})  / 1.777)`};
  position: relative;
`

const MobileCardImage: FC<MobileCardImagePropTypes> =
    ({
         imageUrl,
         mediaAlt,
         postsPerRawForMobile,
     }) => {
        const [gotError, setGotError] = useState(false)
        return (
            <CardImageStyledImg src={gotError || !imageUrl ? '/static/images/noImage/no-image-available.png' : imageUrl}
                                alt={mediaAlt}
                                postsPerRawForMobile={postsPerRawForMobile}
                                onError={() => setGotError(true)}
            />
        )
    };
export default MobileCardImage
