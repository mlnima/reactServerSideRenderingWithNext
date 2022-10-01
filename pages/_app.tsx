import type {
    FC,
    // ReactElement,
    // ReactNode
} from 'react'
// import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import {wrapper} from '@store_toolkit/store';
import {Provider} from 'react-redux';

// type NextPageWithLayout = NextPage & {
//     getLayout?: (page: ReactElement) => ReactNode
// }

// type AppPropsWithLayout = AppProps & {
//     Component: NextPageWithLayout
// }


const MyApp: FC<AppProps> = ({Component, ...rest}) => {

    const {store, props} = wrapper.useWrappedStore(rest);
    //@ts-ignore
    const getLayout = Component.getLayout ?? ((page) => page)

    return getLayout(
        <Provider store={store}>
            <Component {...props.pageProps} />
        </Provider>
    )

};


// const MyApp = ({Component, pageProps}: AppPropsWithLayout) => {
//
//     const getLayout = Component.getLayout ?? ((page) => page)
//
//     return getLayout(
//            <Component {...pageProps} />
//     )
//
// }


//@ts-ignore
export default wrapper.withRedux(MyApp);










