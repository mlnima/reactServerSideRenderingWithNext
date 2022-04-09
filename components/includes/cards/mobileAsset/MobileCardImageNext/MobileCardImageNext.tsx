import {FC, useState} from 'react'
import Image from 'next/image'
import styled from "styled-components";

interface MobileCardImageNextStyledDiv {
    imageUrl: string,
    mediaAlt: string,
    isAppleMobileDevice: boolean,
}

const MobileCardImageStyledDiv = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  img{
      position: unset !important;
  }
`

const AppleCardImageStyledDiv = styled.div`

  aspect-ratio: 16 / 9;
  width: 100%;
  height: calc(100% / 1.777);
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;

  div {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
  }
`

const MobileCardImageNext: FC<MobileCardImageNextStyledDiv> =
    ({
         imageUrl,
         mediaAlt,
         isAppleMobileDevice,
     }) => {

        const [gotError, setGotError] = useState(false)

        const StyleToRender =  isAppleMobileDevice ? AppleCardImageStyledDiv : MobileCardImageStyledDiv

        return (
            <StyleToRender>
                <Image src={gotError || !imageUrl ? '/static/images/noImage/no-image-available.png' : imageUrl}
                       alt={mediaAlt}
                       loading={'lazy'}
                       layout={'fill'}
                       quality={80}
                       objectFit={'contain'}
                       onError={() => setGotError(true)}
                />
            </StyleToRender>
        )
    };

export default MobileCardImageNext

