import type {FC} from 'react';
import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {wrapper} from '@store_toolkit/store';
import AppLayout from '../components/layouts/AppLayout/AppLayout';

const MyApp: FC<AppProps> = ({Component, ...rest}) => {
    const {store} = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <AppLayout rest={rest}>
                <Component {...rest.pageProps} />
            </AppLayout>
        </Provider>
    )
};

export default MyApp;

