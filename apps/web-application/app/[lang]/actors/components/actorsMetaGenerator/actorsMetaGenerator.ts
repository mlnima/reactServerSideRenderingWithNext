import type { Metadata } from 'next';
import { fetchSettings } from '@lib/fetch-requests/fetchSettings';
import { getTextDataWithTranslation, textContentReplacer } from '@repo/shared-util';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import {PageParams, PageSearchParams} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";

interface IProps {
    params: PageParams,
    searchParams?: PageSearchParams,
}

const alternatesGenerators = new AlternatesGenerators();

const actorsMetaGenerator = async (props: IProps): Promise<Metadata> => {
    const params = await props.params;
    const locale = localDetector(params.lang);
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
        alternates: alternatesGenerators.metasPage(locale, 'actors'),
        title: pageTitle
            ? textContentReplacer(pageTitle, {
                  siteName:
                      initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(
                  locale,
                  'title',
                  settingsData?.settings?.actorsPageSettings,
              ),
        description: pageDescription
            ? textContentReplacer(pageDescription, {
                  siteName:
                      initialSettingsData?.settings?.initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(
                locale,
                  'description',
                  settingsData?.settings?.actorsPageSettings,
              ),
        keywords: pageKeywords ?? '',
    };
};

export default actorsMetaGenerator;
