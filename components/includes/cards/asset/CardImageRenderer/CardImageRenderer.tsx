import {FC, useMemo} from 'react'
import dynamic from "next/dynamic";
import isAbsolutePath from "../../../../../_variables/util/isAbsolutePath";
import isImageAllowedForNextImage from "../../../../../_variables/util/isImageAllowedForNextImage";
const CardImage = dynamic(() => import('../CardImage/CardImage'));
const CardImageNext = dynamic(() => import('../CardImageNext/CardImageNext'));

interface CardImageNextPropTypes {
    imageUrl: string,
    mediaAlt:string,
    index?:number
}

const CardImageRenderer: FC<CardImageNextPropTypes> = ({imageUrl, mediaAlt, index}) => {

    const imageUrlSource = useMemo(() => {
        return imageUrl && !isAbsolutePath(imageUrl) ? `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${imageUrl}` : imageUrl
    }, [imageUrl]);

    if (imageUrlSource && isImageAllowedForNextImage(imageUrlSource) && index >= 2  ){
        return  <CardImageNext imageUrl={imageUrlSource} alt={mediaAlt}/>
    }else  return <CardImage imageUrl={imageUrlSource} alt={mediaAlt}/>
};
export default CardImageRenderer
