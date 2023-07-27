import {FC} from "react";

interface CardViewsPropTypes {
    quality: string,

}

const CardQuality : FC<CardViewsPropTypes> = ({quality}) => {
    return (
        <span className={`card-quality absolute top-0.5 right-0.5
            overflow-hidden py-0.5 px-1 text-secondary-text-color 
            bg-secondary-background-color rounded`}>
            {quality}
        </span>
    );
};

export default CardQuality;
