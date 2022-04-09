import {FC} from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
const MobileCardImageRenderer = dynamic(() =>
    import('@components/includes/cards/mobileAsset/MobileCardImageRenderer'));

const MobileCategoryCardMediaStyledDiv = styled.div`
  position: relative;
  width: 100%;
`

interface MobileCategoryCardMediaPropTypes {
    imageUrl: string,
    mediaAlt: string,
    index?:number,
    isAppleMobileDevice:boolean
}

const MobileCategoryCardMedia: FC<MobileCategoryCardMediaPropTypes> =
    ({
         imageUrl,
         mediaAlt,
         index,
         isAppleMobileDevice
     }) => {

        return (
            <MobileCategoryCardMediaStyledDiv>
                <MobileCardImageRenderer mediaAlt={mediaAlt}
                                         imageUrl={imageUrl}
                                         index={index}
                                         isAppleMobileDevice={isAppleMobileDevice}
                />
            </MobileCategoryCardMediaStyledDiv>
        )

    }
;
export default MobileCategoryCardMedia
