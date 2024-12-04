import React, { FC } from 'react';
import { shortNumber } from '@repo/shared-util';
import './CardViews.scss';

interface CardViewsPropTypes {
    views: number | undefined;
    dictionary: {
        [key: string]: string;
    },
    showViewsOnCard:boolean
}

const CardViews: FC<CardViewsPropTypes> = ({ views, dictionary, showViewsOnCard }) => {
    if (!views) return null;

    return (
        <span className={`cardViews smallText cardStat`}>
            <span >
                {shortNumber(views)} {dictionary?.['Views'] || 'Views'}
            </span>
        </span>
    );
};
export default CardViews;
