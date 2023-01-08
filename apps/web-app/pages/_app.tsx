import type {FC} from 'react'
import type {AppProps} from 'next/app'
import {useMemo} from "react";
import {useRouter} from "next/router";
import dynamic from "next/dynamic";
import {Provider} from 'react-redux';
import {wrapper} from '@store_toolkit/store';
const AppLayout = dynamic(() => import('../components/layouts/AppLayout/AppLayout'))
const MessengerLayout = dynamic(() => import('../components/layouts/MessengerLayout/MessengerLayout'))

const MyApp: FC<AppProps> = ({Component, ...rest}) => {
 
    const {asPath} = useRouter()
    const {store} = wrapper.useWrappedStore(rest);

    const activeEnvironment = useMemo(() => {
        return /\/messenger|\/chatroom/g.test(asPath) ? 'messenger' :
                'client'
    }, [asPath])

    const ActiveLayout = useMemo(() => {
        return  activeEnvironment === 'messenger' ? MessengerLayout : AppLayout
    }, [asPath])

        return (
                <Provider store={store}>
                    <ActiveLayout rest={rest}>
                        <Component {...rest.pageProps} />
                    </ActiveLayout>
                </Provider>
        )

};

export default MyApp;

