import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import {appWithTranslation} from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';
import {wrapper} from '@store_toolkit/store';
import {Provider} from "react-redux";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const MyApp = ({Component, pageProps}: AppPropsWithLayout) => {
    // const {store, props} = wrapper.useWrappedStore(pageProps);
    const getLayout = Component.getLayout ?? ((page) => page)

    return getLayout(<Component {...pageProps} />)

    // return getLayout(
    //     <Provider store={store}>
    //         <Component {...props.pageProps} />
    //     </Provider>
    // )
}

//@ts-ignore
export default wrapper.withRedux(appWithTranslation(MyApp, nextI18NextConfig));

// export default appWithTranslation(MyApp, nextI18NextConfig)









