import {useEffect} from 'react';
import AppProvider from "../context/AppContext";
import AppLayout from "../components/layouts/AppLayout";
import {useRouter} from "next/router";
import AdminLayout from "../components/layouts/AdminLayout";
import * as Scroll from 'react-scroll';
import '../styles/styles.scss';
import '../styles/globalAdminPanel.scss';
import '../components/widgetsArea/WidgetArea/WidgetArea.scss';
import '../components/includes/checkOutPageComponents/CheckoutPop/CheckoutPop.scss';
import '../components/includes/PostElement/PostElement.scss';
import '../components/includes/CardElement/CardElement.scss';
import '../components/layouts/AppLayout.scss';
import '../components/layouts/AdminLayout.scss';

// export function reportWebVitals(metric) {
//     console.log(metric)
// }

const MyApp = ({Component, pageProps}) => {
    const router = useRouter()
    const scroll = Scroll.animateScroll;

    useEffect(() => {
        scroll.scrollToTop();
    }, [pageProps]);

    useEffect(() => {
        if("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker.register("/sw.js").then(
                    // function (registration) {
                    //     console.log("Service Worker registration successful with scope: ", registration.scope);
                    // },
                    // function (err) {
                    //     console.log("Service Worker registration failed: ", err);
                    // }
                );
            })}
    }, []);

    if (!router.pathname.includes('/admin')) {
        return (
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
            </AppProvider>
        )
    } else return (
        <AppProvider>
            <AdminLayout>
                <Component {...pageProps} />
            </AdminLayout>
        </AppProvider>
    )
};

export default MyApp;
