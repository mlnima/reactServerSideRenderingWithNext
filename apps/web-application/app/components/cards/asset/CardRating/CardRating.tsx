import React, { FC } from 'react';
import './CardRating.scss';
import { ratingCalculator } from '@repo/utils/dist/src';

interface CardRatingPropTypes {
  dislikes: number | undefined;
  likes: number | undefined;
  showRatingOnCard: boolean;
}

const CardRating: FC<CardRatingPropTypes> = ({ likes = 0, dislikes = 0, showRatingOnCard }) => {
  const ratingValue = ratingCalculator(likes, dislikes);

  if (ratingValue === 0) return null;

  return (
    <span className={`cardRating smallText cardStat`} data-nosnippet>
      <span>{ratingValue}%</span>
    </span>
  );
};
export default CardRating;
