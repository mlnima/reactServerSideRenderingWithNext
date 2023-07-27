import React from 'react';

type CardDurationProps = {
    duration?: string;
};

const CardDuration: React.FC<CardDurationProps> = ({ duration }) => {
    if (!duration) {
        return null;
    }

    return (
        <div
            className="absolute bottom-2 right-2 text-xs font-semibold py-1 px-2 bg-primary-background text-primary-text rounded"
            style={{
                backgroundColor: 'var(--primary-background-color)',
                color: 'var(--primary-text-color)'
            }}
            role="note"
            aria-label={`Video duration: ${duration}`}
        >
            {duration}
        </div>
    );
};

export default CardDuration;