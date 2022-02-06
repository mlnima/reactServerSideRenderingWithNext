import {FC} from 'react'
import styled from "styled-components";

interface MobileCardImagePropTypes {
    imageUrl: string,
    mediaAlt: string,
    errorHandler?: any,
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
         errorHandler
     }) => {
        return (
            <CardImageStyledImg src={imageUrl}
                                alt={mediaAlt}
                                postsPerRawForMobile={postsPerRawForMobile}
                                onError={() => errorHandler ? errorHandler : null}
            />
        )
    };
export default MobileCardImage
