import React, { useContext, useEffect } from 'react';
import { AppProviderWithRouter, AppContext } from "../context/AppContext";

const MyApp = ({ Component, pageProps }) => {

    return (
        <AppProviderWithRouter>
            <Component { ...pageProps } />
        </AppProviderWithRouter>
    )

};

export default MyApp;
