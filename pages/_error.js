import React from 'react';

const Error = ({responseCode}) => {

    return (
        <div className='error-page'>
            <h1 className='error-page-message'>
                {responseCode
                    ? `error ${responseCode} occurred on server`
                    : 'An error occurred on client'}
            </h1>
        </div>
    )
}

export default Error
