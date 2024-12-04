import React, { FC } from 'react';
import './NotFoundOrRestricted.scss';
import Link from 'next/link';

interface PropTypes {
    dictionary: {
        [key: string]: string;
    };
}

const NotFoundOrRestricted: FC<PropTypes> = ({ dictionary }) => {
    return (
        <div id={'primary'} className="post-page notFoundOrRestrictedPage">
            <div className={'notFoundOrRestricted'}>
                <div className="entry-header-data">
                    <h1>
                        {dictionary?.['This Content is Restricted, Deleted, or is Unpublished'] ||
                            'This Content is Restricted, Deleted, or is Unpublished'}
                    </h1>
                    <Link href="/" className="back-to-homepage">
                        <h2>{dictionary?.['Go To Homepage'] || 'Go To Homepage'}</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default NotFoundOrRestricted;
