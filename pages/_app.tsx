import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import {appWithTranslation} from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config';
import {wrapper} from '@store_toolkit/store';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const MyApp = ({Component, pageProps}: AppPropsWithLayout) => {

    const getLayout = Component.getLayout ?? ((page) => page)

    return getLayout(<Component {...pageProps} />)
}

//@ts-ignore
export default wrapper.withRedux(appWithTranslation(MyApp, nextI18NextConfig));

// export default appWithTranslation(MyApp, nextI18nextConfig)









