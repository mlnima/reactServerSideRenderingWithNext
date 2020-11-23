import React from 'react';
import {AppProviderWithRouter} from "../context/AppContext";
import '../components/global/fontawesome/fontawesome'
import '../styles/styles.scss'

const MyApp = ({Component, pageProps}) => {

    return (
        <AppProviderWithRouter>
            <Component {...pageProps} />
        </AppProviderWithRouter>
    )

};

export default MyApp;
