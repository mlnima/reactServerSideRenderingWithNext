import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons/faThumbsUp";

interface CardRatingPropTypes {
    rating: number
}

const CardRating: FC<CardRatingPropTypes> = ({rating}) => {

    return (
        <span className={`card-rating text-xs flex items-center gap-0.5 py-0.25 text-secondary-text-color`}>
            <FontAwesomeIcon className={'icon'} icon={faThumbsUp} style={{width: 11, height: 11}}/>
            <span>{rating || 0}%</span>
        </span>
    );
};
export default CardRating;
