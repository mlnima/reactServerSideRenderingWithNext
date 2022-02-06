import {FC, useMemo} from 'react'
import dynamic from "next/dynamic";
import isAbsolutePath from "../../../../_variables/util/isAbsolutePath";
import isImageAllowedForNextImage from "../../../../_variables/util/isImageAllowedForNextImage";

const MobileCardImage = dynamic(() => import('./MobileCardImage/MobileCardImage'));
const MobileCardImageNext = dynamic(() => import('./MobileCardImageNext/MobileCardImageNext'));

interface CardImageNextPropTypes {
    imageUrl: string,
    mediaAlt: string,
    errorHandler?: any,
    postsPerRawForMobile?: number,
}

const MobileCardImageRenderer: FC<CardImageNextPropTypes> =
    ({
         imageUrl,
         mediaAlt,
         errorHandler,
         postsPerRawForMobile,
     }) => {

        const imageUrlSource = useMemo(() => {
            return imageUrl && !isAbsolutePath(imageUrl) ? `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${imageUrl}` : imageUrl
        }, [imageUrl])

        const CardImageProps = useMemo(() => errorHandler ? {errorHandler} : {}, [])

        if (imageUrlSource && isImageAllowedForNextImage(imageUrlSource)) {
            return (
                <MobileCardImageNext imageUrl={imageUrlSource}
                                     mediaAlt={mediaAlt}
                                     postsPerRawForMobile={postsPerRawForMobile}
                                     {...CardImageProps}
                />
            )
        } else {
            return (
                <MobileCardImage imageUrl={imageUrlSource}
                                 mediaAlt={mediaAlt}
                                 postsPerRawForMobile={postsPerRawForMobile}
                                 {...CardImageProps}
                />
            )
        }
    };
export default MobileCardImageRenderer
