import { i18n } from '@i18nConfig';

const localDetector = (lang?:string) =>{
    return lang && i18n.locales.includes(lang)
        ? lang
        : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en'
}

export default localDetector;