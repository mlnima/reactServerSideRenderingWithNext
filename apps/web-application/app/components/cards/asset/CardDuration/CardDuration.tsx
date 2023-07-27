import {FC} from "react";

interface CardViewsPropTypes {
    duration: string,
}

const CardDuration: FC<CardViewsPropTypes> = ({duration}) => {
    return (
        <span className={`card-duration absolute bottom-0.5 right-0.5
            overflow-hidden py-0.5 px-1 text-secondary-text-color 
            bg-secondary-background-color rounded`}>
            {duration}
        </span>
    );
};

export default CardDuration;
