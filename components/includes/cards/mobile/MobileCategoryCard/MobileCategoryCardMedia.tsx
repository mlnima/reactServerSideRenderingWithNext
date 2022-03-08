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
    postsPerRawForMobile: number
}

const MobileCategoryCardMedia: FC<MobileCategoryCardMediaPropTypes> =
    ({
         imageUrl,
         mediaAlt,
         postsPerRawForMobile
     }) => {

        return (
            <MobileCategoryCardMediaStyledDiv>
                <MobileCardImageRenderer mediaAlt={mediaAlt}
                                         imageUrl={imageUrl}
                                         postsPerRawForMobile={postsPerRawForMobile}

                />
            </MobileCategoryCardMediaStyledDiv>
        )

    }
;
export default MobileCategoryCardMedia
