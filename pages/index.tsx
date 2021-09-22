import React from 'react';
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {getFirstLoadData} from "../_variables/ajaxVariables";
import MainWidgetArea from "../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {ClientPagesTypes} from '../_variables/TypeScriptTypes/ClientPagesTypes'
import {GetServerSidePropsContext} from '../_variables/TypeScriptTypes/GlobalTypes'

const Home  = ({isMobile, widgets, design, identity} : ClientPagesTypes) => {
    return (
        < MainWidgetArea isMobile={isMobile}
                         rendering={true}
                         widgets={(widgets || []).filter(widget => widget.data?.position === 'home')}
                         className='home-page main'
                         position='home'
                         stylesData={design?.homePageStyle}
                         currentPageSidebar={identity?.homePageSidebar}
                         postElementSize={design?.postElementSize}
                         postElementStyle={design?.postElementStyle}
                         postElementImageLoader={design?.postElementImageLoader}
                         postElementImageLoaderType={design?.postElementImageLoaderType} referer={undefined}        />
    );
};

// @ts-ignore
export const getServerSideProps:GetServerSideProps = async (context:GetServerSidePropsContext) => {
    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'])

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            widgets : firstLoadData?.widgets || [],
            ...firstLoadData?.settings,
            isMobile: firstLoadData?.isMobile ? Boolean(firstLoadData.isMobile) :false,
            referer: firstLoadData?.referer ? firstLoadData?.referer :false,

        }}
}

export default Home;

// export const getServerSideProps:(context: GetServerSidePropsContext) => Promise<{ props: { referer: boolean; _nextI18Next: { initialI18nStore: any; initialLocale: string; userConfig: UserConfig | null }; identity: any; design: any; isMobile: boolean; widgets: * } }> = async (context:GetServerSidePropsContext) => {
//     const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'])
//
//     return {
//         props: {
//             ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
//             widgets : firstLoadData?.widgets || [],
//             ...firstLoadData?.settings,
//             isMobile: firstLoadData?.isMobile ? Boolean(firstLoadData.isMobile) :false,
//             referer: firstLoadData?.referer ? firstLoadData?.referer :false,
//
//         }}
// }