'use client';
import React, { FC } from 'react';
import './ForbiddenMessage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    dictionary: {
        [key: string]: string;
    };
}

const ForbiddenMessage: FC<IProps> = ({ dictionary }) => {
    return (
        <div className={'forbiddenAccessMessage'}>
            <h1>{dictionary?.['You can not access this page'] || 'You can not access this page'}</h1>
            <FontAwesomeIcon className={`view-icon`} icon={faBan} />
        </div>
    );
};
export default ForbiddenMessage;
