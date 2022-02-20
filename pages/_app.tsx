import {wrapper} from '@store/store';
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {appWithTranslation} from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';
import type {AppProps} from 'next/app';
import {useMemo} from "react";
const AppLayout = dynamic(() => import('../components/layouts/AppLayout'));
const AdminLayout = dynamic(() => import('../components/layouts/AdminLayout'));
const MessengerLayout = dynamic(() => import('../components/layouts/MessengerLayout'), {ssr: false});

const MyApp = ({Component, pageProps}: AppProps) => {
    const {pathname} = useRouter()

    const ActiveLayout = useMemo(()=>{
      return pathname.match( /\/admin/g ) ? AdminLayout :
             pathname.match( /\/messenger|\/chatroom/g ) ? MessengerLayout:
             AppLayout
    },[pathname])

    return(
        <ActiveLayout >
            <Component {...pageProps} />
        </ActiveLayout>
    )
};

export default wrapper.withRedux(appWithTranslation(MyApp, nextI18NextConfig));




