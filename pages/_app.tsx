import React from "react";
import {wrapper} from '../store/store';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {appWithTranslation} from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';
import type {AppProps} from 'next/app';
const AppLayout = dynamic(() => import('../components/layouts/AppLayout'));
const LoginRegisterPopup = dynamic(() => import('../components/includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false});
const AdminLayout = dynamic(() => import('../components/layouts/AdminLayout'));
const MessengerLayout = dynamic(() => import('../components/layouts/MessengerLayout'), {ssr: false});
const AppProvider = dynamic(() => import('../context/AppContext'));


const MyApp = ({Component, pageProps}: AppProps) => {
    const router = useRouter()

    if (router.pathname.includes('/admin')) {
        return (
            <AppProvider>
                <AdminLayout>
                    <Component {...pageProps} />
                </AdminLayout>
            </AppProvider>
        )
    } else if (router.pathname.includes('/messenger') || router.pathname.includes('/chatroom')) {
        return (
            <AppProvider>
                <MessengerLayout>
                    <Component {...pageProps} />
                </MessengerLayout>
                <LoginRegisterPopup/>
            </AppProvider>
        )
    } else return (
        <AppProvider>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
            <LoginRegisterPopup/>
        </AppProvider>
    )
};


// @ts-ignore
//export default appWithTranslation(wrapper.withRedux(MyApp), nextI18NextConfig);
export default wrapper.withRedux(appWithTranslation(MyApp, nextI18NextConfig));





