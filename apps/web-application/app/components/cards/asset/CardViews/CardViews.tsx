import React, { FC } from 'react';
import { shortNumber } from '@repo/shared-util';

import './CardViews.scss';

interface CardViewsPropTypes {
    views: number;
    dictionary: {
        [key: string]: string;
    };
}

const CardViews: FC<CardViewsPropTypes> = ({ views, dictionary, showViewsOnCard }) => {

    if (!showViewsOnCard) return null;

    return (
        <span
            className={`cardViews smallText cardStat`}
            style={{
                visibility: views > 0 ? 'initial' : 'hidden',
            }}
        >
            {views > 0 && (
                <span data-nosnippet>
                    {' '}
                    {shortNumber(views)} {dictionary?.['Views'] || 'Views'}
                </span>
            )}
        </span>
    );
};
export default CardViews;
