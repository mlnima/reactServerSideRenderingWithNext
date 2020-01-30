import React from 'react';

const MyApp = ({ Component, pageProps }) => {

    console.log(pageProps )

    return <Component {...pageProps} />
};

export default MyApp;
