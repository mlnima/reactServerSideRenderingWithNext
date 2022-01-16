import React from "react";
import {wrapper} from '../store/store';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {appWithTranslation} from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';
import type {AppProps} from 'next/app';
const AppLayout = dynamic(() => import('../components/layouts/AppLayout'));
const AdminLayout = dynamic(() => import('../components/layouts/AdminLayout'));
const MessengerLayout = dynamic(() => import('../components/layouts/MessengerLayout'), {ssr: false});

const MyApp = ({Component, pageProps}: AppProps) => {
    const router = useRouter()

    if (router.pathname.includes('/admin')) {
        return (
            <AdminLayout>
                <Component {...pageProps} />
            </AdminLayout>
        )
    } else if (router.pathname.includes('/messenger') || router.pathname.includes('/chatroom')) {
        return (
            <MessengerLayout>
                <Component {...pageProps} />
            </MessengerLayout>
        )
    } else return (

        <AppLayout>
            <Component {...pageProps} />
        </AppLayout>


    )
};


//export default appWithTranslation(wrapper.withRedux(MyApp), nextI18NextConfig);
export default wrapper.withRedux(appWithTranslation(MyApp, nextI18NextConfig));




