import React, {FC} from 'react';
import AppLayoutInitializer from "./AppLayoutInitializer";
import {Provider} from 'react-redux';
import {wrapper} from '@store_toolkit/store';

interface AppLayoutPropTypes {
    children: React.ReactNode,
    rest: any
}

const AppLayout: FC<AppLayoutPropTypes> = ({children,rest}) => {

    const {store} = wrapper.useWrappedStore(rest);

    return (
        <Provider store={store}>
            <AppLayoutInitializer children={children}/>
        </Provider>
    );
};

export default AppLayout;

