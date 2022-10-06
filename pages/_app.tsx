import type {FC} from 'react'
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux';
import {useMemo} from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {wrapper as clientWrapper} from '@store_toolkit/store';
import {wrapper as adminWrapper} from '@store_toolkit/adminStore';

const AdminLayout = dynamic(() => import('@components/layouts/AdminLayout'))
const AppLayout = dynamic(() => import('@components/layouts/AppLayout'))
const MessengerLayout = dynamic(() => import('@components/layouts/MessengerLayout'))

const MyApp: FC<AppProps> = ({Component, ...rest}) => {

    const {asPath} = useRouter()

    const activeEnvironment = useMemo(()=>{
        return /\/admin\//g.test(asPath) || asPath === '/admin'  ? 'adminPanel' :
            /\/messenger|\/chatroom/g.test(asPath) ? 'messenger' :
                'client'
    },[asPath])

   const activeStore = activeEnvironment === 'adminPanel' ? adminWrapper : clientWrapper

    const {store, props} = activeStore.useWrappedStore(rest);

    const ActiveLayout = useMemo(()=>{
        return activeEnvironment === 'adminPanel' ? AdminLayout :
               activeEnvironment === 'messenger' ? MessengerLayout :
                   AppLayout
    },[asPath])

    return (
        <Provider store={store}>
                <ActiveLayout>
                   <Component {...props.pageProps} />
                </ActiveLayout>
        </Provider>
    )

};

export default MyApp;










