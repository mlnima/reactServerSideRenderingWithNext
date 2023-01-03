import React, {FC} from 'react';
import AppLayoutInitializer from "./AppLayoutInitializer";

interface AppLayoutPropTypes {
    children: React.ReactNode,
    rest: any
}

const AppLayout: FC<AppLayoutPropTypes> = ({children}) => {

    // const {store} = wrapper.useWrappedStore(rest);

    return (
        <AppLayoutInitializer children={children}/>
    );

};

export default AppLayout;

// export default wrapper.withRedux(AppLayout);
// <Provider store={store}>
//        </Provider>