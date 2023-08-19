import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons/faThumbsUp";
import './CardRating.styles.scss'

interface CardRatingPropTypes {
    rating: number
}

const CardRating: FC<CardRatingPropTypes> = ({rating}) => {

    return (
        <span className={`card-rating`}>
            <FontAwesomeIcon className={'rating-icon'} icon={faThumbsUp}/>
            <span>{rating || 0}%</span>
        </span>
    );
};
export default CardRating;
