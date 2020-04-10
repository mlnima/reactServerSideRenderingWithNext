import React, { useContext, useEffect } from 'react';
import { AppProviderWithRouter, AppContext } from "../context/AppContext";
import '../styles/global.scss'

const MyApp = ({ Component, pageProps }) => {
    return (
        <AppProviderWithRouter>
            <Component { ...pageProps } />
        </AppProviderWithRouter>
    )

};

export default MyApp;
