import {createAsyncThunk} from "@reduxjs/toolkit";
import {setHeadData} from "../globalStateReducer";
import {_postCanonicalUrlGenerator} from "@_variables/_clientVariables/clientVariables/_canonicalUrlGenerators";
import getPost from "api-requests/src/client/posts/getPost";

interface GetPostAction {
    identifier: string,
    options: {
        page: string
        setHeadData?: boolean
    },
    context: any
}

const getPostAction = createAsyncThunk(
    'posts/getPostAction',
    async ({context, identifier}: GetPostAction, thunkAPI) => {
        const apiData = await getPost(identifier)
        const isDefaultLocale = context.locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL;
        const postTitle = isDefaultLocale ?
            apiData.data.post?.title || '' :
            apiData.data.post?.translations?.[context.locale]?.title || apiData.data.post?.title || '';
        const postDescription = isDefaultLocale ?
            apiData.data.post?.description || '' :
            apiData.data.post?.translations?.[context.locale]?.description || apiData.data.post || '';

        const keywords = [
            ...(apiData.data.post?.tags || []),
            ...(apiData.data.post?.categories || []),
            ...(apiData.data.post?.actors || [])
        ].map(meta => meta?.name)

        const canonicalUrl = _postCanonicalUrlGenerator(apiData.data.post?.postType,apiData.data.post?._id,context.locale)

        thunkAPI.dispatch(
            setHeadData({
                    title: postTitle,
                    allowIndexByRobots: apiData.data.post.status === 'published',
                    description: typeof postDescription === 'string' ? postDescription?.substring(0, 155) : null,
                    keywords,
                    canonicalUrl: canonicalUrl,
                    ogTitle: postTitle,
                    ogType: 'website',
                    ogDescription: typeof postDescription === 'string' ? postDescription?.substring(0, 155) : null,
                    ogUrl: canonicalUrl,
                    ogImage: apiData.data.post?.mainThumbnail || null,
                    twitterCard: true,
                    twitterUrl: canonicalUrl,
                    twitterTitle: postTitle,
                    twitterDescription: typeof postDescription === 'string' ? postDescription?.substring(0, 155) : null,
                    twitterImage: apiData.data.post?.mainThumbnail || null,
                }
            )
        )
        return ({
            post: apiData?.data?.post || {},
            relatedPosts: apiData?.data?.relatedPosts || []
        })
    }
)


export default getPostAction