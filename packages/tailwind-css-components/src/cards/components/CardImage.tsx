import React from 'react';

type CardImageProps = {
    imageUrl: string;
};

const CardImage: React.FC<CardImageProps> = ({ imageUrl }) => {
    return (
        <img
            src={imageUrl}
            alt=""
            className="w-full aspect-w-16 aspect-h-9 object-cover"
        />
    );
};

export default CardImage;