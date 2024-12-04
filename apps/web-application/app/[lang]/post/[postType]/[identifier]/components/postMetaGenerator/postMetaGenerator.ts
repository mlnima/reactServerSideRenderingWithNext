import type { Metadata } from 'next';
import { fetchPost } from '@lib/fetch-requests/fetchPosts';
import { AlternatesGenerators } from '@lib/alternatesCanonicalGenerator';
import { IPageProps } from '@repo/typescript-types';
import localDetector from "@lib/localDetector";

const alternatesGenerators = new AlternatesGenerators();

const postMetaGenerator = async (props: IPageProps): Promise<Metadata> => {
    const params = await props.params;

    const { lang, identifier, postType } = params;
    const locale = localDetector(lang);
    const fallbackImage = '/asset/images/default/no-image-available.png';
    const postData = identifier ? await fetchPost({ identifier }) : {};
    if (!postData?.post?._id)
        return {
            title: '404',
        };
    const post = postData.post;
    const title = post?.translations?.[locale]?.title ?? post?.title;
    const descriptionValue =
        typeof post.description === 'string' ? post?.translations?.[locale]?.description ?? post?.description : '';
    const description = descriptionValue.substring(0, 300);

    const alternates = identifier && postType
        ? {
            alternates: alternatesGenerators.postPage(locale, identifier, postType),
        }
        : {};

    return {
        ...alternates,
        title,
        description,
        keywords: [...(post.tags || []), ...(post.categories || []), ...(post.actors || [])]
            .map(meta => meta?.translations?.[locale]?.name ?? meta?.name)
            .join(', '),
        openGraph: {
            images: [post.mainThumbnail || fallbackImage],
        },
    };
};

export default postMetaGenerator;
