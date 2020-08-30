import React from 'react';
import {AppProviderWithRouter} from "../context/AppContext";
import '../components/global/fontawesome/fontawesome'

const MyApp = ({Component, pageProps}) => {

    return (
        <AppProviderWithRouter>
            <Component {...pageProps} />
        </AppProviderWithRouter>
    )

};

export default MyApp;
