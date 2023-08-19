import React, {FC} from 'react';
import './CardImageRenderer.styles.scss'

interface CardImageNextPropTypes {
    imageUrl: string|undefined,
    mediaAlt: undefined | string,
    aspectRatio?: string | undefined,
    objectFit?: string | undefined,
    index: number
}

const CardImageRenderer: FC<CardImageNextPropTypes> =
    ({
         imageUrl,
         mediaAlt,
         aspectRatio,
         objectFit,
         index
     }) => {

        return (
            <div className={`card-image-wrapper`} style={{
                aspectRatio: aspectRatio || '16/9'
            }}>
                <img src={imageUrl}
                     alt={mediaAlt || ''}
                    // loading={'lazy'}
                     loading={index > 1 ? 'lazy' : 'eager'}
                     style={{
                         //@ts-ignore
                         objectFit: objectFit || 'contain',
                         aspectRatio: aspectRatio || '16/9'
                     }}
                     className={`card-image w-full aspect-${aspectRatio || 'video'} object-${objectFit || 'contain'}`}
                />
            </div>
        )

    };

export default CardImageRenderer
