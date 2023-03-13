import type {FC} from 'react';
import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {wrapper} from '@store_toolkit/store';
import RootLayout from "@components/RootLayout/RootLayout";

const MyApp: FC<AppProps> = ({Component, ...rest}) => {
    const {store} = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <RootLayout rest={rest}>
                <Component {...rest.pageProps} />
            </RootLayout>
        </Provider>
    )
};

export default MyApp;

