'use client';
import {Provider} from 'react-redux';
import {store} from '../store/store'
import {FC, ReactNode} from "react";

interface PropTypes {
    children: ReactNode,
}

const ReduxProvider: FC<PropTypes> = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxProvider;