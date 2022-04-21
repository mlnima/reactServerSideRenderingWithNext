import {FC, useMemo} from 'react'
import dynamic from "next/dynamic";
import isAbsolutePath from "../../../../_variables/util/isAbsolutePath";
import isImageAllowedForNextImage from "../../../../_variables/util/isImageAllowedForNextImage";
const MobileCardImage = dynamic(() => import('./MobileCardImage/MobileCardImage'));
const MobileCardImageNext = dynamic(() => import('./MobileCardImageNext/MobileCardImageNext'));

interface CardImageNextPropTypes {
    imageUrl: string,
    mediaAlt: string,
    index?:number,
    isAppleMobileDevice :boolean
}

const MobileCardImageRenderer: FC<CardImageNextPropTypes> =
    ({
         imageUrl,
         mediaAlt,
         index,
         isAppleMobileDevice
     }) => {

        const imageUrlSource = useMemo(() => {
            return imageUrl && !isAbsolutePath(imageUrl) ? `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${imageUrl}` : imageUrl
        }, [imageUrl])

        if (imageUrlSource && isImageAllowedForNextImage(imageUrlSource)  && index >= 2 )
            return <MobileCardImageNext imageUrl={imageUrlSource} mediaAlt={mediaAlt} isAppleMobileDevice={isAppleMobileDevice}/>

        else return  <MobileCardImage imageUrl={imageUrlSource} mediaAlt={mediaAlt} isAppleMobileDevice={isAppleMobileDevice}/>

    };
export default MobileCardImageRenderer
