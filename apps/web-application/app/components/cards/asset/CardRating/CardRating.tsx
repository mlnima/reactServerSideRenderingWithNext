import React, { FC } from 'react';
import './CardRating.styles.scss';
import { ratingCalculator } from '@repo/shared-util';

interface CardRatingPropTypes {
    like: number;
    dislike: number;
    showRatingOnCard: boolean;
}

const CardRating: FC<CardRatingPropTypes> = ({ like = 0, dislike = 0, showRatingOnCard }) => {
    const ratingValue = ratingCalculator(like, dislike);

    if (!showRatingOnCard) return null;

    return (
        <span
            className={`cardRating smallText cardStat`}
            data-nosnippet
            style={{
                visibility: ratingValue > 0 ? 'initial' : 'hidden',
            }}
        >
            <span>{ratingValue}%</span>
        </span>
    );
};
export default CardRating;
