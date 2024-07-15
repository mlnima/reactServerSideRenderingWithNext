import 'server-only';
import type { Locale } from '@i18nConfig';
import { i18n } from '@i18nConfig';

const dictionaries = i18n.locales.reduce((final: any, current: string) => {
    try {
        final[current] = () => import(`./dictionaries/${current}.json`).then(module => module.default);
        return final;
    } catch (error) {
        return {};
    }
}, {});

export const getDictionary = async (locale: Locale) => {
    try {
        return dictionaries[locale]();
    } catch (error) {
        console.log('getDictionary error on locale=> ', locale);
    }
};
