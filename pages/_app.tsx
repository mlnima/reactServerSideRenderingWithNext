import React, {useRef, useState, useEffect} from "react";
import type {AppProps} from 'next/app'
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {appWithTranslation} from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';

const CookiePopup = dynamic(() => import('../components/includes/ClientPopActionRequest/CookiePopup'), {ssr: false})
const AppLayout = dynamic(() => import('../components/layouts/AppLayout'))
const LoginRegisterPopup = dynamic(() => import('../components/includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false})
const AdminLayout = dynamic(() => import('../components/layouts/AdminLayout'))
const MessengerLayout = dynamic(() => import('../components/layouts/MessengerLayout'), {ssr: false})
const AppProvider = dynamic(() => import('../context/AppContext'))
import {connect} from 'react-redux';
import {useStore} from "react-redux";

//redux
import {Provider} from 'react-redux'
import store from "../store/store";
import {createWrapper} from "next-redux-wrapper";
// import {useDispatch, useSelector} from 'react-redux';
// import {setWidgets} from "../store/actions/widgetsActions";
const makeStore = () => store;
const wrapper = createWrapper(makeStore, {debug: false})

interface MyAppProps {
    MyApp: React.ComponentType;
    Component: AppProps;
    pageProps: {
        pageInfo: {
            pageName: string
        };
        identity: object,
        eCommerce: object,
        design: {
            customStyles: string
        },
        widgets: object[],
        isMobile: boolean,
        referer: boolean,

    };

    nextI18NextConfig: {
        i18n: {
            defaultLocale: string;
            locales: string[]
        }
    }
}




const MyApp = ({Component, pageProps}: AppProps) => {

    const router = useRouter()

    if (router.pathname.includes('/admin')) {
        return (
            <Provider store={store}>
                <AppProvider>
                    <AdminLayout>
                        <Component {...pageProps} />
                    </AdminLayout>
                </AppProvider>
            </Provider>
        )
    } else if (router.pathname.includes('/messenger') || router.pathname.includes('/chatroom')) {


        return (
            <Provider store={store}>
                <AppProvider>
                    <MessengerLayout
                        identity={pageProps.identity}
                        design={pageProps.design}
                        isMobile={pageProps.isMobile}
                        globalStyleDetected={!!pageProps.design?.customStyles}
                    >
                        <Component {...pageProps} />
                    </MessengerLayout>
                    <LoginRegisterPopup/>
                </AppProvider>
            </Provider>

        )
    } else return (
        <Provider store={store}>
            <AppProvider>
                <AppLayout
                    design={pageProps.design}
                    widgets={pageProps.widgets}
                    identity={pageProps.identity}
                    eCommerce={pageProps.eCommerce}
                    referer={pageProps.referer}
                    isMobile={pageProps.isMobile}
                    globalStyleDetected={!!pageProps.design?.customStyles}
                    pageInfo={pageProps.pageInfo}
                >
                    <Component {...pageProps} />
                </AppLayout>
                <LoginRegisterPopup/>
                <CookiePopup identity={pageProps.identity}/>
            </AppProvider>
        </Provider>
    )
};


// @ts-ignore

// @ts-ignore
export default appWithTranslation(wrapper.withRedux(MyApp), nextI18NextConfig);





