import { IPageProps } from '@repo/typescript-types';
import Soft404 from '@components/Soft404/Soft404';
import InternalVideoPlayer from '../../[lang]/post/[postType]/[identifier]/components/VideoTypePostPage/InternalVideoPlayer/InternalVideoPlayer';
import getPost from '@lib/actions/database/posts/getPost';
import postMetaGenerator from '../../[lang]/post/[postType]/[identifier]/components/postMetaGenerator/postMetaGenerator';

const fallbackImage = '/asset/images/default/no-image-available.png';

export const generateMetadata = async (props: IPageProps) => {
  try {
    const params = await props.params;
    const { id } = params;

    if (!id) {
      return {
        title: '404',
      };
    }
    const { data, success } = await getPost(id as string);

    if (!success) {
      return {
        title: '404',
      };
    }

    return {
      title: data?.post?.title,
      description: data?.post.description && typeof data?.post.description === 'string' ? data?.post.description.substring(0, 300) : '',
      keywords: [...(data?.post?.tags || []), ...(data?.post?.categories || []), ...(data?.post?.actors || [])]
        .map((meta) => meta?.name)
        .join(', '),
      openGraph: {
        images: [data?.post?.thumbnail?.filePath || data?.post?.mainThumbnail || fallbackImage],
      },
    };
  } catch (error) {
    console.log(error);
  }
};

const embedPage = async (props: IPageProps) => {
  const params = await props.params;
  const { id } = params;

  if (!id) {
    return <Soft404 />;
  }

  const { data, success } = await getPost(id as string);

  console.log(`data=> `, data);
  if (!success || !data || !data.post) {
    return <Soft404 />;
  }

  return (
    <InternalVideoPlayer
      src={data?.post?.video?.filePath}
      poster={data?.post?.thumbnail?.filePath || data?.post?.mainThumbnail || fallbackImage}
      controls
      className="custom-video"
      style={{ width: '100%', height: 'auto' }}
    />
  );
};
export default embedPage;

//http://localhost:4000/embed/689df42ff2e6e0384af48cf2