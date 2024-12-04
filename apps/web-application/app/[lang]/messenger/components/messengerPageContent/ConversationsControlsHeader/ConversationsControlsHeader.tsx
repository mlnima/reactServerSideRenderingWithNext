import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './ConversationsControlsHeader.scss';

const ConversationsControlsHeader = () => {
    return (
        <div className={'conversationsControlsHeader'}>
            <h1> Messages</h1>
            <Link href={'/'}>
                <FontAwesomeIcon icon={faHome} />
            </Link>
        </div>
    );
};

export default ConversationsControlsHeader;
