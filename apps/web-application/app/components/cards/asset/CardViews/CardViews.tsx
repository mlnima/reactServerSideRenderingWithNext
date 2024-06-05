import React, {FC} from "react";
import {shortNumber} from "shared-util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-regular-svg-icons/faEye";
import './CardViews.styles.scss';

interface CardViewsPropTypes {
    views: number
}

const CardViews: FC<CardViewsPropTypes> = ({views}) => {

    return (
        <span className={`card-views`}>
            {views > 0 && <span> {shortNumber(views)}</span>}
            {views > 0 && <FontAwesomeIcon className={`view-icon`} icon={faEye}/>}
        </span>
    );
};
export default CardViews;
