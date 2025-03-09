import type { Metadata } from 'next';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getPost from '@lib/actions/database/operations/posts/getPost';

const alternatesGenerators = new AlternatesGenerators();

const postMetaGenerator = async (props: IPageProps): Promise<Metadata> => {
  const params = await props.params;

  const { lang, identifier, postType } = params;
  const locale = localDetector(lang);
  const fallbackImage = '/asset/images/default/no-image-available.png';

  const { data, success } = await getPost(identifier as string);

  if (!success) {
    return {
      title: '404',
    };
  }
  const title = data?.post?.translations?.[locale]?.title ?? data?.post?.title;
  const descriptionValue =
    typeof data?.post.description === 'string' ? data?.post?.translations?.[locale]?.description ?? data?.post?.description : '';
  const description = typeof descriptionValue === 'string' ? descriptionValue.substring(0, 300) : '';

  const alternates = identifier && postType
    ? {
      alternates: alternatesGenerators.postPage(locale, identifier, postType),
    }
    : {};

  return {
    ...alternates,
    title,
    description,
    keywords: [...(data?.post?.tags || []), ...(data?.post?.categories || []), ...(data?.post?.actors || [])]
      .map(meta => meta?.translations?.[locale]?.name ?? meta?.name)
      .join(', '),
    openGraph: {
      images: [data?.post?.mainThumbnail || fallbackImage],
    },
  };
};

export default postMetaGenerator;
