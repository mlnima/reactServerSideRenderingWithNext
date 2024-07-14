import React, { FC } from 'react';
import CardViews from '@components/cards/asset/CardViews/CardViews';
import CardRating from '@components/cards/asset/CardRating/CardRating';
import './CardStats.scss';
import CardDate from '@components/cards/asset/CardDate/CardDate';

interface IProps {
    views: number;
    dislikes: number;
    likes: number;
    updatedAt?: string;
    createdAt?: string;
    dictionary: {
        [key: string]: string;
    };
    settings: {
        [key: string]: string;
    };
}

const CardStats: FC<IProps> = ({ views, dislikes, likes, dictionary, updatedAt, createdAt, settings }) => {
    return (
        <div className={'cardStats'}>
            <CardViews views={views} dictionary={dictionary} showViewsOnCard={settings?.showViewsOnCard} />
            <CardRating dislike={dislikes} like={likes} showRatingOnCard={settings?.showRatingOnCard} />
            <CardDate updatedAt={updatedAt} createdAt={createdAt} showDateOnCard={settings?.showDateOnCard} />
        </div>
    );
};
export default CardStats;
