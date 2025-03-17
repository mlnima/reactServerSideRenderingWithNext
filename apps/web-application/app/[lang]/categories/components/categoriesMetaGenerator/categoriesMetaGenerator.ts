import type { Metadata } from 'next';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { PageParams, PageSearchParams } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import { headMetaFromSettings } from '@lib/headMetaFromSettings';

interface IProps {
  params: PageParams;
  searchParams?: PageSearchParams;
}

const alternatesGenerators = new AlternatesGenerators();
const categoriesMetaGenerator = async (props: IProps): Promise<Metadata> => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const locale = localDetector(params.lang);

  const headData = await headMetaFromSettings({
    pageSettingToGet: 'categoriesPageSettings',
    locale,
    pageNumber: searchParams?.page || '',
    fallbackTitle:'categories'
  });

  if (!headData) return {};

  return {
    alternates: alternatesGenerators.metasPage(locale, 'categories'),
    ...headData,
  };
};

export default categoriesMetaGenerator;
