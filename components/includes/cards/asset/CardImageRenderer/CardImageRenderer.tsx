import {FC, useMemo} from 'react'
import dynamic from "next/dynamic";
import isAbsolutePath from "../../../../../_variables/util/isAbsolutePath";
import isImageAllowedForNextImage from "../../../../../_variables/util/isImageAllowedForNextImage";
const CardImage = dynamic(() => import('../CardImage/CardImage'));
const CardImageNext = dynamic(() => import('../CardImageNext/CardImageNext'));

interface CardImageNextPropTypes {
    imageUrl: string,
    alt:string,
    cardWidth: number,
    cardHeight: number,
    errorHandler?:any,
}

const CardImageRenderer: FC<CardImageNextPropTypes> = ({imageUrl,alt, cardWidth, cardHeight,errorHandler}) => {
    const imageUrlSource = useMemo(() => {
        return imageUrl && !isAbsolutePath(imageUrl) ? `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${imageUrl}` : imageUrl
    }, [imageUrl])

    const CardImageProps = useMemo(()=>errorHandler ? {errorHandler}:{},[])

    if (imageUrlSource && isImageAllowedForNextImage(imageUrlSource)  ){
        return (
            <CardImageNext imageUrl={imageUrlSource} alt={alt} width={cardWidth} height={cardHeight} {...CardImageProps}/>
        )
    }else {
        return (
            <CardImage imageUrl={imageUrlSource} alt={alt} width={cardWidth} height={cardHeight} {...CardImageProps}/>
        )
    }


};
export default CardImageRenderer
