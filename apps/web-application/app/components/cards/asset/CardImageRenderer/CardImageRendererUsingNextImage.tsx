import React, {FC} from 'react';
import Image from 'next/image'
import './CardImageRenderer.scss'

interface CardImageNextPropTypes {
    imageUrl: string | undefined,
    mediaAlt: undefined | string,
    aspectRatio?: string | undefined,
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | undefined,
    index: number
}

const CardImageRendererUsingNextImage: FC<CardImageNextPropTypes> =
    ({
         imageUrl,
         mediaAlt,
         aspectRatio,
         objectFit,
         index
     }) => {

        const imagesAllowedDomainsForNextImage = process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES?.split(' ') || []
        const fallbackImage = '/asset/images/default/no-image-available.png'
        const isImageAllowed = imagesAllowedDomainsForNextImage.some(domain => imageUrl?.includes(domain))

        if (!!imageUrl && !isImageAllowed) {
            return    <div className={`card-image-wrapper`} style={{
                aspectRatio: aspectRatio || '16/9'
            }}>
                <Image src={imageUrl}
                       alt={mediaAlt || ''}
                       width={280}
                       height={157.5}
                       loading={index > 3 ? 'lazy' : 'eager'}
                       style={{
                           objectFit: objectFit || 'cover',
                           aspectRatio: aspectRatio || '16/9'
                       }}
                       // className={`card-image w-full aspect-${aspectRatio || 'video'} object-${objectFit || 'cover'}`}
                />

            </div>
        }

        return (
            <div className={`card-image-wrapper`} style={{
                aspectRatio: aspectRatio || '16/9'
            }}>
                <img src={imageUrl || fallbackImage}
                     alt={mediaAlt || ''}
                     loading={index > 3 ? 'lazy' : 'eager'}
                     style={{
                         objectFit: objectFit || 'cover',
                         aspectRatio: aspectRatio || '16/9'
                     }}
                     // className={`card-image w-full aspect-${aspectRatio || 'video'} object-${objectFit || 'cover'}`}
                />
            </div>
        )

    };

export default CardImageRendererUsingNextImage
