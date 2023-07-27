import React, {FC} from "react";
import useTranslation from "next-translate/useTranslation";
import {shortNumber} from "custom-util";

interface CardViewsPropTypes {
    views: number
}

const CardViews: FC<CardViewsPropTypes> = ({views}) => {
    const {t} = useTranslation('common')

    return (
        <span className={`card-views text-xs flex items-center gap-0.5 py-0.25 text-secondary-text-color`}>
            <span>
                {views > 0 ? shortNumber(views) : t('common:No View', {}, {fallback: 'No View'})}
            </span>
            <span>{views > 0 ? t('common:Views', {}, {fallback: 'Views'}) : null}</span>
        </span>
    );
};
export default CardViews;
