import {FC} from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
const MobileCardImageRenderer = dynamic(() =>
    import('@components/includes/cards/mobileAsset/MobileCardImageRenderer'));

const MobileTagCardMediaStyledDiv = styled.div`
  position: relative;
  width: 100%;
`

interface MobileTagCardMediaPropTypes {
    imageUrl: string,
    mediaAlt: string,
    postsPerRawForMobile: number
}

const MobileTagCardMedia: FC<MobileTagCardMediaPropTypes> =
    ({
         imageUrl,
         mediaAlt,
         postsPerRawForMobile
     }) => {

        return (
            <MobileTagCardMediaStyledDiv>
                <MobileCardImageRenderer mediaAlt={mediaAlt}
                                         imageUrl={imageUrl}
                                         postsPerRawForMobile={postsPerRawForMobile}
                />
            </MobileTagCardMediaStyledDiv>
        )
    }
;
export default MobileTagCardMedia
