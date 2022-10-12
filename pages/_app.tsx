import type {FC} from 'react'
import type {AppProps} from 'next/app'
import {useMemo} from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";

const AdminLayout = dynamic(() => import('@components/layouts/AdminLayout/AdminLayout'))
const AppLayout = dynamic(() => import('@components/layouts/AppLayout/AppLayout'))
const MessengerLayout = dynamic(() => import('@components/layouts/MessengerLayout/MessengerLayout'))

const MyApp: FC<AppProps> = ({Component, ...rest}) => {

    const {asPath} = useRouter()

    const activeEnvironment = useMemo(() => {
        return /\/admin\//g.test(asPath) || asPath === '/admin' ? 'adminPanel' :
            /\/messenger|\/chatroom/g.test(asPath) ? 'messenger' :
                'client'
    }, [asPath])

    const ActiveLayout = useMemo(() => {
        return activeEnvironment === 'adminPanel' ? AdminLayout :
            activeEnvironment === 'messenger' ? MessengerLayout :
                AppLayout
    }, [asPath])

    if (activeEnvironment === 'adminPanel') {
        return (
            <AdminLayout rest={rest}>
                <Component {...rest.pageProps} />
            </AdminLayout>
        )
    } else {
        return (
            <ActiveLayout rest={rest}>
                <Component {...rest.pageProps} />
            </ActiveLayout>
        )
    }


};

export default MyApp;










