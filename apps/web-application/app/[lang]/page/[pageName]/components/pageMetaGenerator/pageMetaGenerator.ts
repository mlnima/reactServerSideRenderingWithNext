import { fetchPage } from '@lib/fetch-requests/fetchPage';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';

const alternatesGenerators = new AlternatesGenerators();

const pageMetaGenerator = async (props: IPageProps) => {
    const params = await props.params;
    const { lang, pageName } = params;
    const locale = localDetector(lang);
    const pageData = pageName ? await fetchPage({ pageName }) : {};
    const pageTitle =
        pageData.pageData?.translations?.[locale]?.title || pageData.pageData.title || pageData.pageData.pageName;

    return {
        alternates: alternatesGenerators.customPage(locale, pageData.pageData.pageName),
        title: pageTitle,
        description: pageData.pageData?.translations?.[locale]?.description || pageData.pageData.description,
    };
};

export default pageMetaGenerator;
