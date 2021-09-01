import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';

const CookiePopup = dynamic(() => import('../components/includes/ClientPopActionRequest/CookiePopup'), {ssr: false})
const AppLayout = dynamic(() => import('../components/layouts/AppLayout'))
const LoginRegisterPopup = dynamic(() => import('../components/includes/LoginRegisterPopup/LoginRegisterPopup'), {ssr: false})
const AdminLayout = dynamic(() => import('../components/layouts/AdminLayout'))
const MessengerLayout = dynamic(() => import('../components/layouts/MessengerLayout'), {ssr: false})
const AppProvider = dynamic(() => import('../context/AppContext'))

const MyApp = ({Component, pageProps}) => {
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
                <MessengerLayout
                    identity={pageProps.identity}
                    design={pageProps.design}
                    isMobile={pageProps.isMobile}
                    globalStyleDetected={!!pageProps.design?.data?.customStyles}
                >
                    <Component {...pageProps} />
                </MessengerLayout>
                <LoginRegisterPopup/>
            </AppProvider>
        )
    } else return (
        <AppProvider>

            <AppLayout
                design={pageProps.design}
                widgets={pageProps.widgets}
                identity={pageProps.identity}
                eCommerce={pageProps.eCommerce}
                referer={pageProps.referer}
                isMobile={pageProps.isMobile}
                globalStyleDetected={!!pageProps.design?.data?.customStyles}
                pageInfo={pageProps.pageInfo}
            >
                <Component {...pageProps} />
            </AppLayout>
            <LoginRegisterPopup/>
            <CookiePopup identity={pageProps.identity}/>
        </AppProvider>
    )
};

export default appWithTranslation(MyApp, nextI18NextConfig);


// <PwaInstallButton/>

// <RedirecterToHttps identity={pageProps.identity}/>
// <RedirectToHTTPS identity={pageProps.identity}/>