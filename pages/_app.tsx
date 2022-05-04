import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import {wrapper} from '@store/store';
import {appWithTranslation} from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';

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





