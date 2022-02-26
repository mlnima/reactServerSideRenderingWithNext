import {FC, useState} from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
const MobileCardNoImage = dynamic(() =>
    import('@components/includes/cards/mobileAsset/MobileCardNoImage/MobileCardNoImage'));
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
        const [gotError, setGotError] = useState(false)

        const errorHandler = () => {
            !gotError ? setGotError(true) : null
        }

        if (!imageUrl || gotError) {
            return <MobileCardNoImage mediaAlt={mediaAlt}/>
        } else {
            return (
                <MobileCategoryCardMediaStyledDiv>
                    <MobileCardImageRenderer mediaAlt={mediaAlt}
                                             imageUrl={imageUrl}
                                             postsPerRawForMobile={postsPerRawForMobile}
                                             errorHandler={errorHandler}
                    />
                </MobileCategoryCardMediaStyledDiv>
            )

        }

    }
;
export default MobileCategoryCardMedia
