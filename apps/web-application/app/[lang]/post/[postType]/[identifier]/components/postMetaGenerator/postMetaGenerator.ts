import type {Metadata, ResolvingMetadata} from 'next'
import {fetchPost} from "fetch-requests";

type Props = {
    params: { identifier: string,lang:string,postType:string }
    searchParams: { [key: string]: string | string[] | undefined }
}

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
        // alternates: {
        //     canonical: `/post/${postType}/${identifier}`,
        //     languages: process.env.NEXT_PUBLIC_LOCALES?.replace(`${process.env.NEXT_PUBLIC_DEFAULT_LOCALE} `,'')
        //         ?.split(' ').reduce((finalValue:{[key:string]:string},currentLocale)=>{
        //             finalValue[currentLocale] = `/${currentLocale}/post/${postType}/${identifier}`
        //             return finalValue
        //         },{}),
        // },
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