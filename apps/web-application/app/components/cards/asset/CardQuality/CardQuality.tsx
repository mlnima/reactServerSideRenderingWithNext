import {FC} from "react";
import './CardQuality.scss'

interface CardViewsPropTypes {
    quality: string,
}

const CardQuality : FC<CardViewsPropTypes> = ({quality}) => {
    return (
        <span className={`card-quality`}>
            {quality}
        </span>
    );
};

export default CardQuality;
