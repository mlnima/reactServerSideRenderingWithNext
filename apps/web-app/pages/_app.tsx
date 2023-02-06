import type {FC} from 'react';
import type {AppProps} from 'next/app';
import dynamic from "next/dynamic";
import {Provider} from 'react-redux';
import {wrapper} from '@store_toolkit/store';
const AppLayout = dynamic(() => import('../components/layouts/AppLayout/AppLayout'))

const MyApp: FC<AppProps> = ({Component, ...rest}) => {
 
    // const {asPath} = useRouter()
    const {store} = wrapper.useWrappedStore(rest);

    // if (/\/messenger|\/chatroom/g.test(asPath)){
    //     return (
    //         <Provider store={store}>
    //             <MessengerLayout rest={rest}>
    //                 <Component {...rest.pageProps} />
    //         </Provider>
    //     )
    // }else {
    //     return (
    //         <Provider store={store}>
    //             <AppLayout rest={rest}>
    //                 <Component {...rest.pageProps} />
    //             </AppLayout>
    //         </Provider>
    //     )
    // }

    return (
        <Provider store={store}>
            <AppLayout rest={rest}>
                <Component {...rest.pageProps} />
            </AppLayout>
        </Provider>
    )


};

export default MyApp;

