import type { Metadata } from 'next';
import { getTextDataWithTranslation, textContentReplacer } from '@repo/utils';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from "@lib/localDetector";
import getSettings from '@lib/actions/database/operations/settings/getSettings';

const alternatesGenerators = new AlternatesGenerators();

const tagsMetaGenerator = async (props: IPageProps): Promise<Metadata> => {
    const params = await props.params;
    const locale = localDetector(params.lang);
    const { initialSettings,tagsPageSettings } = await getSettings(['initialSettings','tagsPageSettings']);

    const pageTitle =
        tagsPageSettings?.translations?.[locale]?.title ??
        tagsPageSettings?.title;
    const pageKeywords =
        tagsPageSettings?.translations?.[locale]?.keywords ??
        tagsPageSettings?.keywords;
    const pageDescription =
        tagsPageSettings?.translations?.[locale]?.description ??
        tagsPageSettings?.description;

    return {
        alternates: alternatesGenerators.metasPage(locale, 'tags'),
        title: pageTitle
            ? textContentReplacer(pageTitle, {
                  siteName: initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(locale, 'title', tagsPageSettings),
        description: pageDescription
            ? textContentReplacer(pageDescription, {
                  siteName: initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(locale, 'description', tagsPageSettings),
        keywords: pageKeywords ?? '',
    };
};

export default tagsMetaGenerator;
