import {FC, useState} from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
const MobileCardNoImage = dynamic(() =>
    import('@components/includes/cards/mobileAsset/MobileCardNoImage/MobileCardNoImage'));
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
        const [gotError, setGotError] = useState(false)

        const errorHandler = () => {
            !gotError ? setGotError(true) : null
        }

        if (!imageUrl || gotError) {
            return <MobileCardNoImage mediaAlt={mediaAlt}/>
        } else {
            return (
                <MobileTagCardMediaStyledDiv>
                    <MobileCardImageRenderer mediaAlt={mediaAlt}
                                             imageUrl={imageUrl}
                                             postsPerRawForMobile={postsPerRawForMobile}
                                             errorHandler={errorHandler}
                    />
                </MobileTagCardMediaStyledDiv>
            )
        }
    }
;
export default MobileTagCardMedia
