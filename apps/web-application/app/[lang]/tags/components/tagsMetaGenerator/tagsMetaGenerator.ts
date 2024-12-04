import type { Metadata } from 'next';
import { fetchSettings } from '@lib/fetch-requests/fetchSettings';
import { getTextDataWithTranslation, textContentReplacer } from '@repo/shared-util';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from "@lib/localDetector";

const alternatesGenerators = new AlternatesGenerators();

const tagsMetaGenerator = async (props: IPageProps): Promise<Metadata> => {
    const params = await props.params;

    const locale = localDetector(params.lang);
    const settingsData = await fetchSettings({ requireSettings: ['tagsPageSettings'] });
    const initialSettingsData = await fetchSettings({ requireSettings: ['initialSettings'] });

    const pageTitle =
        settingsData?.settings?.tagsPageSettings?.translations?.[locale]?.title ??
        settingsData?.settings?.tagsPageSettings?.title;
    const pageKeywords =
        settingsData?.settings?.tagsPageSettings?.translations?.[locale]?.keywords ??
        settingsData?.settings?.tagsPageSettings?.keywords;
    const pageDescription =
        settingsData?.settings?.tagsPageSettings?.translations?.[locale]?.description ??
        settingsData?.settings?.tagsPageSettings?.description;

    return {
        alternates: alternatesGenerators.metasPage(locale, 'tags'),
        title: pageTitle
            ? textContentReplacer(pageTitle, {
                  siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(locale, 'title', settingsData?.settings?.tagsPageSettings),
        description: pageDescription
            ? textContentReplacer(pageDescription, {
                  siteName: initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(locale, 'description', settingsData?.settings?.tagsPageSettings),
        keywords: pageKeywords ?? '',
    };
};

export default tagsMetaGenerator;
