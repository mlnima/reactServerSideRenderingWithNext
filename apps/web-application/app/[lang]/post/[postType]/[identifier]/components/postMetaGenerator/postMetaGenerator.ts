import type {Metadata, ResolvingMetadata} from 'next'
import {fetchPost} from "@lib/fetch-requests/fetchPosts";
import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";

type Props = {
    params: { identifier: string,lang:string,postType:string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const alternatesGenerators = new AlternatesGenerators()

const postMetaGenerator = async ({params:{identifier,lang,postType}, searchParams}: Props, parent?: ResolvingMetadata): Promise<Metadata> => {



    const fallbackImage = '/asset/images/default/no-image-available.png'
    const postData = await fetchPost({identifier})
    if (!postData?.post?._id) return {
        title: '404',
    }
    const post = postData.post
    const title= post?.translations?.[lang]?.title ?? post?.title
    const descriptionValue = typeof post.description === 'string'? post?.translations?.[lang]?.description ?? post?.description:''
    const description = descriptionValue.substring(0, 300)

    return {
        alternates: alternatesGenerators.postPage(lang,identifier,postType),
        title,
        description,
        keywords:[...(post.tags || []), ...(post.categories || []), ...(post.actors || [])].map(
            meta => meta?.translations?.[lang]?.name ?? meta?.name ).join(', '),
        openGraph:{
            images:[post.mainThumbnail || fallbackImage],
        }

    }
}

export default postMetaGenerator;