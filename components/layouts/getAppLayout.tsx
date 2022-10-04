import {ReactElement} from "react";
import AppLayout from "@components/layouts/AppLayout";
import {wrapper} from '@store_toolkit/store';
import {Provider} from 'react-redux';

const getAppLayout = (page: ReactElement) => {

    const {store} = wrapper.useWrappedStore(page);

    return (
        <Provider store={store}>
            <AppLayout>
                {page}
            </AppLayout>
        </Provider>
    )
}

export default getAppLayout;