"use client";
import React, {FC, useState,memo} from "react";
import {usePathname, useRouter} from 'next/navigation';

import useTranslation from "next-translate/useTranslation";
import * as process from "process";

interface IProps {

}

const LanguagesSwitcher: FC<IProps> = () => {
    const {push} = useRouter()
    const {lang} = useTranslation();
    const pathName = usePathname()
    const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const locales = process.env.NEXT_PUBLIC_LOCALS || '';
    const [isOpen, setIsOpen] = useState(false);

    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/'
        const segments = pathName.split('/')
        segments[1] = locale
        push(segments.join('/'))
        // return segments.join('/')
    }

    return (
        <div className="relative inline-block text-left z-10">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-primary-text-color bg-transparent hover:border hover:border-gray-300 rounded-md hover:bg-secondary-background-color"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {/*{defaultLocale?.toUpperCase()}*/}
                    {/*//@ts-ignore*/}
                    {(lang && locales.includes(lang) ?  lang.toUpperCase() : defaultLocale.toUpperCase())}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M10 12a2 2 0 001.15-.364l2.535-2.474A1.5 1.5 0 0014.035 7H5.966a1.5 1.5 0 00-1.034 2.662l2.534 2.474A2 2 0 0010 12z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {locales.split(' ').map((locale) => (
                            <button
                                key={locale}
                                onClick={()=>redirectedPathName(locale)}
                                // href={redirectedPathName(locale)}
                                // locale={locale === defaultLocale ? false : locale}
                                // passHref
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white "
                                role="menuitem">
                                {locale.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );


};
export default memo(LanguagesSwitcher);
