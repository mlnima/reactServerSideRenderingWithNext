import type { Metadata } from 'next';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import { headMetaFromSettings } from '@lib/headMetaFromSettings';

const alternatesGenerators = new AlternatesGenerators();

const tagsMetaGenerator = async (props: IPageProps): Promise<Metadata> => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const locale = localDetector(params.lang);

  const headData = await headMetaFromSettings({
    pageSettingToGet: 'tagsPageSettings',
    locale,
    pageNumber: searchParams?.page || '',
    fallbackTitle: 'categories',
  });

  if (!headData) return {};

  return {
    alternates: alternatesGenerators.metasPage(locale, 'categories'),
    ...headData,
  };
};

export default tagsMetaGenerator;
