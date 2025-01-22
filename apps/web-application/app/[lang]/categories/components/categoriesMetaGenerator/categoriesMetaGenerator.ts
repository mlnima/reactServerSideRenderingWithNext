import type { Metadata } from 'next';
import { getTextDataWithTranslation, textContentReplacer } from '@repo/utils';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { PageParams, PageSearchParams } from '@repo/typescript-types';
import localDetector from "@lib/localDetector";
import {getSettings} from "@lib/database/operations/settings";

interface IProps {
    params: PageParams;
    searchParams?: PageSearchParams;
}

const alternatesGenerators = new AlternatesGenerators();
const categoriesMetaGenerator = async (props: IProps): Promise<Metadata> => {
    const params = await props.params;

    const locale = localDetector(params.lang);

    const { categoriesPageSettings  } = await getSettings(['categoriesPageSettings']);
    const {  initialSettings } = await getSettings(['initialSettings']);


    const pageTitle =
        categoriesPageSettings?.translations?.[locale]?.title ??
        categoriesPageSettings?.title;
    const pageKeywords =
        categoriesPageSettings?.translations?.[locale]?.keywords ??
        categoriesPageSettings?.keywords;
    const pageDescription =
        categoriesPageSettings?.translations?.[locale]?.description ??
        categoriesPageSettings?.description;

    return {
        alternates: alternatesGenerators.metasPage(locale, 'categories'),
        title: pageTitle
            ? textContentReplacer(pageTitle, {
                  siteName: initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(locale, 'title', categoriesPageSettings),
        description: pageDescription
            ? textContentReplacer(pageDescription, {
                  siteName: initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(locale, 'description', categoriesPageSettings),
        keywords: pageKeywords ?? '',
    };
};

export default categoriesMetaGenerator;
