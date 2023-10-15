'use client';
import React, {FC, useState} from "react";
import {useParams, usePathname, useRouter} from 'next/navigation';
import './LanguagesSwitcher.styles.scss';
import {languagesMapOrigin} from "data-structures";

interface IProps {
    locale: string,
}

const LanguagesSwitcher: FC<IProps> = ({locale}) => {
    const {push} = useRouter()
    const pathname = usePathname()
    const params = useParams()

    const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const locales = process.env.NEXT_PUBLIC_LOCALES || '';
    const [isOpen, setIsOpen] = useState(false);

    const redirectedPathName = (targetedLocale: string) => {
        const locales = (process.env.NEXT_PUBLIC_LOCALES || '').split(' ');
        const queryString = window.location.search;

        if (!pathname) return '/'

        const segments = pathname.split('/')
        if (locales.some((locale: string) => pathname.includes(`/${locale}/`))) {

            if (targetedLocale === defaultLocale) {
                const newSegments = [...segments].filter(segment => segment !== params?.lang)
                push(newSegments.join('/') + queryString);
            } else {
                const newSegments = [...segments].map(segment => locales.includes(segment) ? targetedLocale : segment)
                push(newSegments.join('/') + queryString);
            }

        } else if (!locales.includes(segments[1])) {
            segments.splice(1, 0, targetedLocale);
            push(segments.join('/') + queryString);

        } else if (pathname === '/' || locales.some((locale: string) => pathname.includes(`/${locale}`))) {

            if (targetedLocale === defaultLocale) {
                push(`/`);
            } else {
                push(`/${targetedLocale}`);
            }

        }
    }

    return (
        <div className={'languagesSwitcherWidget'}>
            <div className={'languagesSwitcherWidgetActiveLanguage'}>
                <button type={'button'} onClick={() => setIsOpen(!isOpen)}>
                    {/*//@ts-ignore*/}
                    <span> {languagesMapOrigin?.[locale] || locale}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
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
                <div className="languagesSwitcherWidgetLanguages">
                    <div className={'languagesSwitcherWidgetLanguagesList'}
                         role={'menu'}
                         aria-orientation={'vertical'}
                         aria-labelledby={'options-menu'}>

                        {locales.split(' ').map((locale) => (
                            <button
                                key={locale}
                                onClick={() => redirectedPathName(locale)}
                                className={'languagesItem'}
                                role="menuitem">
                                {/*//@ts-ignore*/}
                                {languagesMapOrigin?.[locale] || locale}
                                {/*{locale.toUpperCase()}*/}
                            </button>
                        ))}

                    </div>
                </div>
            )}
        </div>
    );


};
export default LanguagesSwitcher;
