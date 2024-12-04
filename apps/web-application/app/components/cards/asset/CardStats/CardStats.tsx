import React, { FC } from 'react';
import CardViews from '@components/cards/asset/CardViews/CardViews';
import CardRating from '@components/cards/asset/CardRating/CardRating';
import './CardStats.scss';
import CardDate from '@components/cards/asset/CardDate/CardDate';

interface IProps {
    views: number | undefined;
    dislikes: number | undefined;
    likes: number | undefined;
    updatedAt?: string;
    createdAt?: string;
    dictionary: {
        [key: string]: string;
    };
    settings: {
        showViewsOnCard:  boolean,
        showRatingOnCard:  boolean,
        showDateOnCard:  boolean,
    };
}

const CardStats: FC<IProps> = ({ views, dislikes, likes, dictionary, updatedAt, createdAt, settings }) => {
    return (
        <div className={'cardStats'}>
            {(settings?.showViewsOnCard && views != 0) &&
                <CardViews views={views} dictionary={dictionary} showViewsOnCard={settings?.showViewsOnCard} />
            }
            {settings?.showRatingOnCard &&
                <CardRating dislikes={dislikes} likes={likes} showRatingOnCard={settings?.showRatingOnCard} />
            }

            {settings?.showDateOnCard &&
                <CardDate updatedAt={updatedAt} createdAt={createdAt} showDateOnCard={settings?.showDateOnCard} />
            }


        </div>
    );
};
export default CardStats;
