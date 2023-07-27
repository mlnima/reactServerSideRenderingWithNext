"use client";
import {FC, ReactNode} from 'react'
import {Provider} from "react-redux";
import {store} from '@store/store'

interface ReduxProviderProps {
    children: ReactNode;
}

const ReduxProvider: FC<ReduxProviderProps> = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default ReduxProvider;