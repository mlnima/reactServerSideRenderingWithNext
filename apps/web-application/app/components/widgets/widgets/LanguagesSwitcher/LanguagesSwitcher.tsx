"use client";
import React, {FC, useState, memo} from "react";
import {usePathname, useRouter} from 'next/navigation';
import './LanguagesSwitcher.styles.scss'
import * as process from "process";

interface IProps {
    locale: string,
}

const LanguagesSwitcher: FC<IProps> = ({locale}) => {
    const {push} = useRouter()
    const pathName = usePathname()
    const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const locales = process.env.NEXT_PUBLIC_LOCALS || '';
    const [isOpen, setIsOpen] = useState(false);

    const redirectedPathName = (targetedLocale: string) => {
        const locales = (process.env.NEXT_PUBLIC_LOCALS || '').split(' ');
        if (!pathName) return '/'
        const segments = pathName.split('/')
        if (locales.some((locale: string) => pathName.includes(`/${locale}/`))) {
            const newSegments = [...segments].map(segment => locales.includes(segment) ? targetedLocale : segment)
            push(newSegments.join('/'));
        } else if (!locales.includes(segments[1])) {
            segments.splice(1, 0, targetedLocale);
            push(segments.join('/'));
        } else if (pathName === '/' || locales.some((locale: string) => pathName.includes(`/${locale}`))) {
            if (targetedLocale === defaultLocale) {
                push(`/`);
            } else {
                push(`/${targetedLocale}`);
            }
        }
    }

    return (
        <div className={'languages-switcher-widget'}>
            <div className={'languagesSwitcher-widget-current-languages-holder'}>
                <button type={'button'} onClick={() => setIsOpen(!isOpen)}>
                    {/*//@ts-ignore*/}
                    {locale.toUpperCase()}
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
                                onClick={() => redirectedPathName(locale)}
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
export default LanguagesSwitcher;
