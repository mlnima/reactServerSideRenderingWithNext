// "use client";
import React, {FC} from 'react';

interface CardImageNextPropTypes {
    imageUrl: string,
    mediaAlt: string,
    aspectRatio?: string,
    objectFit?: string,
    index: number,
    numberOfCardsPerRowInMobile: number,
}

const CardImageRenderer: FC<CardImageNextPropTypes> =
    ({
         imageUrl,
         mediaAlt,
         aspectRatio,
         objectFit,
         numberOfCardsPerRowInMobile,
         index,
     }) => {


        // const onErrorHandler = (e:React.SyntheticEvent<HTMLImageElement, Event>) => {
        //     if (typeof window !== 'undefined'){
        //         setTimeout(() => {
        //             if (e?.target){
        //                 //@ts-ignore
        //                 e.target.src = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/asset/images/default/no-image-available.png`
        //             }
        //         }, 500)
        //     }
        //
        // }

        return (
            <div className={`w-1/${numberOfCardsPerRowInMobile} md:w-64 `}>
                <img src={imageUrl}
                     alt={mediaAlt || ''}
                     loading={'lazy'}
                     //{...(index > 1 ? {loading: 'lazy'} : {})}
                     className={`card-image w-full aspect-${aspectRatio ||  'video'} object-${objectFit || 'contain'}`}
                     // onError={(e) => onErrorHandler(e)}
                />
            </div>
        )

    };

export default CardImageRenderer
