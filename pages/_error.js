import React from 'react';

const Error = ({responseCode}) => {

    console.log(responseCode)
    return (
        <div className='error-page'>
            <style jsx>{`
              #not-found-page {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 50vh;

                h1 {
                  color: var(--main-text-color);
                }
                .back-to-homepage{
                  color: var(--main-text-color);
                  text-decoration: none;
                }
              }
            `}</style>
                <h1 className='error-page-message'>
                    {responseCode
                        ? `error ${responseCode} occurred on server`
                        : 'An error occurred on client'}
                </h1>
        </div>
    )
}

export default Error


