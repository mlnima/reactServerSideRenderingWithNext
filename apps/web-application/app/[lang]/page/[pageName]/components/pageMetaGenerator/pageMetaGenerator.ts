import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getPage from '@lib/actions/database/pages/getPage';


const alternatesGenerators = new AlternatesGenerators();

const pageMetaGenerator = async (props: IPageProps) => {
  const params = await props.params;
  const { lang, pageName } = params;
  const locale = localDetector(lang);

  if (!pageName) {
    return;
  }

  const { success, data } = await getPage({ pageName });

  if (!success || !data) {
    return;
  }
  const pageTitle =
    data.pageData?.translations?.[locale]?.title || data.pageData.title || data.pageData.pageName;

  return {
    alternates: alternatesGenerators.customPage(locale, data.pageData.pageName),
    title: pageTitle,
    description: data.pageData?.translations?.[locale]?.description || data.pageData.description,
  };
};

export default pageMetaGenerator;
