import {FC, useMemo} from 'react'
import dynamic from "next/dynamic";
import isAbsolutePath from "../../../../../_variables/util/isAbsolutePath";
import isImageAllowedForNextImage from "../../../../../_variables/util/isImageAllowedForNextImage";
const CardImage = dynamic(() => import('../CardImage/CardImage'));
const CardImageNext = dynamic(() => import('../CardImageNext/CardImageNext'));

interface CardImageNextPropTypes {
    imageUrl: string,
    mediaAlt:string,
    cardWidth: number,
    cardHeight: number,
    errorHandler?:any,
    objectFitValue?:string,
    strictImageSize?:boolean
}

const CardImageRenderer: FC<CardImageNextPropTypes> =
    ({
         imageUrl,
         mediaAlt,
         cardWidth,
         cardHeight,
         errorHandler,
         strictImageSize,
         objectFitValue
    }) => {

    const imageUrlSource = useMemo(() => {
        return imageUrl && !isAbsolutePath(imageUrl) ? `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${imageUrl}` : imageUrl
    }, [imageUrl]);

    const CardImageProps = useMemo(()=>errorHandler ? {errorHandler}:{},[]);

    if (imageUrlSource && isImageAllowedForNextImage(imageUrlSource)  ){
        return (
            <CardImageNext imageUrl={imageUrlSource}
                           alt={mediaAlt}
                           cardWidth={cardWidth}
                           cardHeight={cardHeight}
                           objectFitValue={objectFitValue}
                           strictImageSize={strictImageSize}
                           {...CardImageProps}
            />
        )
    }else {
        return (
            <CardImage imageUrl={imageUrlSource}
                       alt={mediaAlt}
                       cardWidth={cardWidth}
                       cardHeight={cardHeight}
                       objectFitValue={objectFitValue}
                       strictImageSize={strictImageSize}
                       {...CardImageProps}
            />
        )
    }
};
export default CardImageRenderer
