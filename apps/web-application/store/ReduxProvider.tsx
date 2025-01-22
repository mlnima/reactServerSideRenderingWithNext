"use client";
import { FC, ReactNode, Suspense } from 'react';
import {Provider} from "react-redux";
import {store} from '@store/store'

interface ReduxProviderProps {
    children: ReactNode;
}

const ReduxProvider: FC<ReduxProviderProps> = ({children}) => {
    return (
        <Suspense>
            <Provider store={store}>
                {children}
            </Provider>
        </Suspense>

    );
}

export default ReduxProvider;