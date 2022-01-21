import React from "react";
// import moment from "moment";
import {  formatDistance } from 'date-fns'

interface CardLastUpdatePropTypes {
    updatedAt: string
}

const CardLastUpdate: React.FC<CardLastUpdatePropTypes> = ({updatedAt}) => {
    return (
        <span className={'last-update'}>
             {/*{moment(new Date(updatedAt), 'YYYYMMDD').fromNow(false)}*/}
             {formatDistance(new Date(updatedAt), new Date(), { addSuffix: true })}
        </span>
    )
};

export default CardLastUpdate
