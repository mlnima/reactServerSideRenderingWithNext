import type { Metadata } from 'next';
import { getTextDataWithTranslation, textContentReplacer } from '@repo/shared-util';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import {PageParams, PageSearchParams} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";
import {getSettings} from "@lib/database/operations/settings";

interface IProps {
    params: PageParams,
    searchParams?: PageSearchParams,
}

const alternatesGenerators = new AlternatesGenerators();

const actorsMetaGenerator = async (props: IProps): Promise<Metadata> => {
    const params = await props.params;
    const locale = localDetector(params.lang);

    const { actorsPageSettings  } = await getSettings(['actorsPageSettings']);
    const {  initialSettings } = await getSettings(['initialSettings']);

    const pageTitle =
        actorsPageSettings?.translations?.[locale]?.title ??
        actorsPageSettings?.title;
    const pageKeywords =
        actorsPageSettings?.translations?.[locale]?.keywords ??
        actorsPageSettings?.keywords;
    const pageDescription =
        actorsPageSettings?.translations?.[locale]?.description ??
        actorsPageSettings?.description;

    return {
        alternates: alternatesGenerators.metasPage(locale, 'actors'),
        title: pageTitle
            ? textContentReplacer(pageTitle, {
                  siteName:
                      initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(
                  locale,
                  'title',
                  actorsPageSettings,
              ),
        description: pageDescription
            ? textContentReplacer(pageDescription, {
                  siteName:
                      initialSettings?.headDataSettings?.siteName,
              })
            : getTextDataWithTranslation(
                locale,
                  'description',
                  actorsPageSettings,
              ),
        keywords: pageKeywords ?? '',
    };
};

export default actorsMetaGenerator;
