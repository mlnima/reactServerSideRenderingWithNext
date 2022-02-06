import {FC} from 'react'
import Image from 'next/image'
import styled from "styled-components";

interface MobileCardImageNextStyledDiv {
    imageUrl: string,
    mediaAlt: string,
    postsPerRawForMobile?: number,
    errorHandler?: any,
}

interface MobileCardImageNextStylePropTypes {
    postsPerRawForMobile: number
}

const MobileCardImageNextStyledDiv = styled.div`
  width: ${({postsPerRawForMobile}: MobileCardImageNextStylePropTypes) => `calc(96vw  / ${postsPerRawForMobile || 1})`};
  height: ${({postsPerRawForMobile}: MobileCardImageNextStylePropTypes) => `calc((96vw  / ${postsPerRawForMobile || 1})  / 1.777)`};
`

const MobileCardImageNext: FC<MobileCardImageNextStyledDiv> =
    ({
         imageUrl,
         mediaAlt,
         postsPerRawForMobile,
         errorHandler
     }) => {

        return (
            <MobileCardImageNextStyledDiv postsPerRawForMobile={postsPerRawForMobile}>
                <Image src={imageUrl}
                       alt={mediaAlt}
                       loading={'lazy'}
                       layout={'fill'}
                       quality={80}
                       objectFit={'contain'}
                       onError={() => errorHandler ? errorHandler : null}
                />
            </MobileCardImageNextStyledDiv>
        )
    };
export default MobileCardImageNext
