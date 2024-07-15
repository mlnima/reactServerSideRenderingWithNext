import React, { FC } from 'react';
import { shortNumber } from '@repo/shared-util';
import './CardViews.scss';

interface CardViewsPropTypes {
    views: number;
    dictionary: {
        [key: string]: string;
    };
}
//dataNosnippet
const CardViews: FC<CardViewsPropTypes> = ({ views, dictionary, showViewsOnCard }) => {
    if (!showViewsOnCard || views === 0) return null;

    return (
        <span className={`cardViews smallText cardStat`}>
            <span >
                {shortNumber(views)} {dictionary?.['Views'] || 'Views'}
            </span>
        </span>
    );
};
export default CardViews;
