import React from 'react';

type CardQualityProps = {
    quality?: string;
};

const CardQuality: React.FC<CardQualityProps> = ({ quality }) => {
    if (!quality) {
        return null;
    }

    return (
        <div
            className="absolute top-2 right-2 text-xs font-semibold py-1 px-2 bg-primary-background text-primary-text rounded"
            style={{
                backgroundColor: 'var(--primary-background-color)',
                color: 'var(--primary-text-color)'
            }}
            role="note"
            aria-label={`Video quality: ${quality}`}
        >
            {quality}
        </div>
    );
};

export default CardQuality;
