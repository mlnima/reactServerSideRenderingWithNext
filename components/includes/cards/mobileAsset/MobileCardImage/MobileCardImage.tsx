import {FC, useEffect, useState} from 'react'
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

interface MobileCardImagePropTypes {
    imageUrl: string,
    mediaAlt: string,
    isAppleMobileDevice :boolean
}

const AppleCardImageStyledDiv = styled.div`
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: calc(100% / 1.777);
  padding-top: 56.25%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    -o-object-fit: contain;
    object-fit: contain;
    aspect-ratio: 16 / 9;
  }
`
const MobileCardImageStyledDiv = styled.div`
  width: 100%;
  height: auto;
  img{
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: contain;
  }
`


const MobileCardImage: FC<MobileCardImagePropTypes> =
    ({
         imageUrl,
         mediaAlt,
         isAppleMobileDevice
     }) => {
        const [gotError, setGotError] = useState(false)

        const StyleToRender =  isAppleMobileDevice ? AppleCardImageStyledDiv : MobileCardImageStyledDiv

        return (
            <StyleToRender>
                <img
                    src={gotError || !imageUrl ? '/static/images/noImage/no-image-available.png' : imageUrl}
                    alt={mediaAlt}
                    onError={() => setGotError(true)}
                />
            </StyleToRender>
        )
    };
export default MobileCardImage
//
// <MobileCardImageStyledDiv>
//
// </MobileCardImageStyledDiv>