import {FC} from "react";
import './CardDuration.styles.scss'

interface CardViewsPropTypes {
    duration: string,
}

const CardDuration: FC<CardViewsPropTypes> = ({duration}) => {
    return (
        <span className={`card-duration`}>
            {duration}
        </span>
    );
};

export default CardDuration;
