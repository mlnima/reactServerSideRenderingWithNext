import type { Metadata, ResolvingMetadata } from 'next';
import { i18n } from '@i18nConfig';
import { fetchSettings } from '@lib/fetch-requests/client/fetchSettings';
import { getTextDataWithTranslation, textContentReplacer } from 'shared-util';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';

type Props = {
    params: { lang: string };
};

const alternatesGenerators = new AlternatesGenerators();

const actorsMetaGenerator = async (
    { params }: Props,
    parent?: ResolvingMetadata,
): Promise<Metadata> => {
    const locale = i18n.locales.includes(params?.lang)
        ? params?.lang
        : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const settingsData = await fetchSettings({ requireSettings: ['actorsPageSettings'] });
    const initialSettingsData = await fetchSettings({ requireSettings: ['initialSettings'] });

    const pageTitle =
        settingsData?.settings?.actorsPageSettings?.translations?.[locale]?.title ??
        settingsData?.settings?.actorsPageSettings?.title;
    const pageKeywords =
        settingsData?.settings?.actorsPageSettings?.translations?.[locale]?.keywords ??
        settingsData?.settings?.actorsPageSettings?.keywords;
    const pageDescription =
        settingsData?.settings?.actorsPageSettings?.translations?.[locale]?.description ??
        settingsData?.settings?.actorsPageSettings?.description;

    return {
        alternates: alternatesGenerators.metasPage(params?.lang, 'actors'),
        title: pageTitle
            ? textContentReplacer(pageTitle, {
                  siteName:
                      initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(
                  params?.lang,
                  'title',
                  settingsData?.settings?.actorsPageSettings,
              ),
        description: pageDescription
            ? textContentReplacer(pageDescription, {
                  siteName:
                      initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(
                  params?.lang,
                  'description',
                  settingsData?.settings?.actorsPageSettings,
              ),
        keywords: pageKeywords ?? '',
    };
};

export default actorsMetaGenerator;
