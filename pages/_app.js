import React, { useContext, useEffect } from 'react';
import { AppProviderWithRouter, AppContext } from "../context/AppContext";
// import '../styles/styles.scss'
// import '../styles/styles.scss'

const MyApp = ({ Component, pageProps }) => {
    return (
        <AppProviderWithRouter>
            <Component { ...pageProps } />
        </AppProviderWithRouter>
    )

};

export default MyApp;
