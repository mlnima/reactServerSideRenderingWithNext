import React, {useEffect} from 'react';
import {AppProviderWithRouter} from "../context/AppContext";
//import './post/Post.scss'

const MyApp = ({Component, pageProps}) => {





    return (
        <AppProviderWithRouter>
            <Component {...pageProps} />
        </AppProviderWithRouter>
    )

};

export default MyApp;
