import React from 'react';

type CardTitleProps = {
    views: number | null;
};

const CardViews: React.FC<CardTitleProps> = ({views}) => {

    if (!views) {
        return null;
    }

    return (
        <p className={`text-grey-darker text-sm`}>
            {views}
        </p>
    );
};

export default CardViews;