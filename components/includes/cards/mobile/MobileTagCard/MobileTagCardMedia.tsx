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
    postsPerRawForMobile: number,
    index?:number

}

const MobileTagCardMedia: FC<MobileTagCardMediaPropTypes> =
    ({
         imageUrl,
         mediaAlt,
         postsPerRawForMobile,
         index
     }) => {

        return (
            <MobileTagCardMediaStyledDiv>
                <MobileCardImageRenderer mediaAlt={mediaAlt}
                                         imageUrl={imageUrl}
                                         postsPerRawForMobile={postsPerRawForMobile}
                                         index={index}
                />
            </MobileTagCardMediaStyledDiv>
        )
    }
;
export default MobileTagCardMedia
