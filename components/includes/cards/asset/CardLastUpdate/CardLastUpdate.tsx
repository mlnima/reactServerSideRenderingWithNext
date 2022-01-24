import {FC} from "react";
import {  formatDistance } from 'date-fns'

interface CardLastUpdatePropTypes {
    updatedAt: string
}

const CardLastUpdate: FC<CardLastUpdatePropTypes> = ({updatedAt}) => {

    return (
        <span className={'last-update'}>
             {formatDistance(new Date(updatedAt), new Date(), { addSuffix: true})}
        </span>
    )
};

export default CardLastUpdate
