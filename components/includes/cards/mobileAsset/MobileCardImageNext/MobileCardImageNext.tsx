import {FC, useState} from 'react'
import Image from 'next/image'
import styled from "styled-components";

interface MobileCardImageNextStyledDiv {
    imageUrl: string,
    mediaAlt: string,
    postsPerRawForMobile?: number,
}

interface MobileCardImageNextStylePropTypes {
    postsPerRawForMobile: number
}

const MobileCardImageNextStyledDiv = styled.div`
  width: ${({postsPerRawForMobile}: MobileCardImageNextStylePropTypes) => `calc(96vw  / ${postsPerRawForMobile || 2})`};
  height: ${({postsPerRawForMobile}: MobileCardImageNextStylePropTypes) => `calc((96vw  / ${postsPerRawForMobile || 2})  / 1.777)`};
`

const MobileCardImageNext: FC<MobileCardImageNextStyledDiv> =
    ({
         imageUrl,
         mediaAlt,
         postsPerRawForMobile,
     }) => {

        const [gotError, setGotError] = useState(false)

        return (
            <MobileCardImageNextStyledDiv postsPerRawForMobile={postsPerRawForMobile}>
                <Image src={gotError || !imageUrl ? '/static/images/noImage/no-image-available.png' : imageUrl}
                       alt={mediaAlt}
                       loading={'lazy'}
                       layout={'fill'}
                       quality={80}
                       objectFit={'contain'}
                       onError={() => setGotError(true)}
                />
            </MobileCardImageNextStyledDiv>
        )
    };
export default MobileCardImageNext
