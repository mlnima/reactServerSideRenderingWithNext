//_clientPostsAsyncThunksFetchPost
import {createAsyncThunk} from "@reduxjs/toolkit";
import isValidObjectId from "@_variables/util/mongoIdValidatorClient";
import Axios from "@_variables/util/Axios";
import _postPageQueryGenerator from "@_variables/clientVariables/_postPageQueryGenerator";
import {setHeadData} from "@store_toolkit/clientReducers/globalStateReducer";

interface FetchPost {
    identifier: string,
    options: {
        page: string
        setHeadData?: boolean
    },
    locale: string
}

const fetchPost = createAsyncThunk(
    'posts/fetchPost',
    async ({locale, identifier}: FetchPost, thunkAPI) => {
        const queryGeneratorData = isValidObjectId(identifier) ? {_id: identifier} : {title: identifier}
        const apiData = await Axios.get(`/api/v1/posts/clientGetPost${_postPageQueryGenerator(queryGeneratorData)}`)

        const isDefaultLocale = locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL;
        const postTitle = isDefaultLocale ?
            apiData.data.post?.title || '' :
            apiData.data.post?.translations?.[locale]?.title || apiData.data.post?.title || '';
        const postDescription = isDefaultLocale ?
            apiData.data.post?.description || '' :
            apiData.data.post?.translations?.[locale]?.description || apiData.data.post || '';

        const keywords = [
            ...(apiData.data.post?.tags || []),
            ...(apiData.data.post?.categories || []),
            ...(apiData.data.post?.actors || [])
        ].map(meta => meta?.name)

        thunkAPI.dispatch(
            setHeadData({
                    title: postTitle,
                    description: typeof postDescription === 'string' ? postDescription?.substring(0, 155) : null,
                    keywords,
                    canonicalUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/post/${apiData.data.post?.postType || 'article'}/${apiData.data.post?._id}`,
                    ogTitle: postTitle,
                    // ogType: postData?.postType === 'video' ? 'video.other' : postData?.postType || '',
                    ogType: 'website',
                    ogDescription: typeof postDescription === 'string' ? postDescription?.substring(0, 155) : null,
                    ogUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/post/${apiData.data.post?.postType || 'article'}/${apiData.data.post?._id}`,
                    ogImage: apiData.data.post?.mainThumbnail || null,

                    twitterCard: true,
                    twitterUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/post/${apiData.data.post?.postType || 'article'}/${apiData.data.post?._id}`,
                    twitterTitle: postTitle,
                    twitterDescription: typeof postDescription === 'string' ? postDescription?.substring(0, 155) : null,
                    twitterImage: apiData.data.post?.mainThumbnail || null,
                }
            )
        )


        return ({
            post: apiData.data.post,
            relatedPosts: apiData.data.relatedPosts
        })
    }
)


export default fetchPost