import {createAsyncThunk} from "@reduxjs/toolkit";
import isValidObjectId from "@_variables/util/mongoIdValidatorClient";
import Axios from "@_variables/util/Axios";
import _postPageQueryGenerator from "@_variables/_clientVariables/clientVariables/_postPageQueryGenerator";
import {setHeadData} from "../../../clientReducers/globalStateReducer";
import {_postCanonicalUrlGenerator} from "@_variables/_clientVariables/clientVariables/_canonicalUrlGenerators";
// import postTypes from "@data-structures/postTypes";

interface FetchPost {
    identifier: string,
    options: {
        page: string
        setHeadData?: boolean
    },
    context: any
}

const fetchPost = createAsyncThunk(
    'posts/fetchPost',
    async ({context, identifier}: FetchPost, thunkAPI) => {
        const queryGeneratorData = isValidObjectId(identifier) ? {_id: identifier} : {title: identifier}

        const apiData = await Axios.get(`/api/v1/posts/clientGetPost${_postPageQueryGenerator(queryGeneratorData)}`)
        // const regexMatchCorrectPostsRoutes =postTypes.map(postType=> `^\/${postType}\/i|\/post\/${postType}\/` ).join('|')

        // const correctPathRegex = new RegExp(`${regexMatchCorrectPostsRoutes}/g`)
        //
        // const ifIsInternalNavigated = new RegExp(`\/_next\/data\/`)

        // if (!correctPathRegex.test(context.req.path) && !ifIsInternalNavigated.test(context.req.path)){
        //     context.res.writeHead(301, {
        //         Location: `/post/${apiData.data?.post?.postType}/${apiData.data?.post?._id}`
        //     });
        //     context.res.end();
        // }

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


export default fetchPost