"use client";
import I18nProvider from 'next-translate/I18nProvider'
import useTranslation from 'next-translate/useTranslation'
import React, {FC} from "react";

interface IProps {
    lang: string
    children: React.ReactNode
}

const I18nTranslationProvider: FC<IProps> = ({lang, children}) => {
    return (
        <I18nProvider lang={lang}>
            {children}
        </I18nProvider>
    )
}

export default I18nTranslationProvider;