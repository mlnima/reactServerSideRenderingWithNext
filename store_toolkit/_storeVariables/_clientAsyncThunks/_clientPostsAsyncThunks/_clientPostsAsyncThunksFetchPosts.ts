import {createAsyncThunk} from "@reduxjs/toolkit";
import {convertMetasTypeToSingular, getTextDataWithTranslation, textContentReplacer} from "@_variables/_variables";
import _clientGetPostsQueryGenerator from "@_variables/clientVariables/_clientGetPostsQueryGenerator";
import Axios from "@_variables/util/Axios";
import {setHeadData} from "@store_toolkit/clientReducers/globalStateReducer";
import {_postsCanonicalUrlGenerator} from "@_variables/clientVariables/_canonicalUrlGenerators";
import {locale} from "moment";


interface FetchPosts {
    context: any,
    metaId: string,
    metaType: string,
    options: {
        page: string,
        setHeadData?: boolean
    },

}

const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async ({context, metaId, metaType, options}: FetchPosts, thunkAPI) => {
        //@ts-ignore
        const {settings} = await thunkAPI.getState()
        const singularMetaForm = convertMetasTypeToSingular(metaType);
        const gettingPostsQueries = _clientGetPostsQueryGenerator(context.query, metaId)
        const apiData = await Axios.get(`/api/v1/posts/clientGetPosts${gettingPostsQueries}`)
        const dataForm = metaType && singularMetaForm ? `${singularMetaForm}Data` : '';
        const meta = apiData?.data?.meta
        const metaData = dataForm && meta ? {[dataForm]: meta} : {}

        if (options.setHeadData) {
            const title = textContentReplacer(
                getTextDataWithTranslation(
                    context.locale,
                    `${options.page}PageTitle`,
                    settings?.identity
                ),
                {
                    name: apiData.data?.meta?.name || context?.query?.keyword ,
                    siteName: settings?.identity?.siteName || '',
                    count:apiData.data?.meta?.count
                }
            )

            const description = textContentReplacer(
                getTextDataWithTranslation(
                    context.locale,
                    `${options.page}PageDescription`,
                    settings?.identity
                ), {
                    name: apiData.data?.meta?.name || context?.query?.keyword,
                    siteName: settings?.identity?.siteName || '',
                    count:apiData.data?.meta?.count
                }
            )

            const canonicalUrl = _postsCanonicalUrlGenerator(
                options?.page?.match('category|tag|actor'),
                metaId,context.locale,
                context.req?.query?.page,
                context.req?.query?.keyword
            )

            thunkAPI.dispatch(
                setHeadData(
                    {
                        title: title || null,
                        description: description?.substring(0, 155) || null,
                        keywords: apiData?.data?.meta?.name ? [apiData?.data?.meta?.name] : null,
                        ogTitle: title || null,
                        ogType: 'website',
                        ogDescription: description?.substring(0, 155) || null,
                        canonicalUrl,
                        ogUrl: canonicalUrl,
                        ogImage: meta?.mainThumbnail || null,
                        twitterCard: true,
                        twitterUrl: canonicalUrl,
                        twitterTitle: meta?.name || null,
                        twitterDescription: meta?.description?.substring(0, 155) || null,
                        twitterImage: meta?.imageUrl || null,
                    }
                )
            )
        }

        return {
            posts: apiData.data?.posts || [],
            totalCount: apiData?.data?.totalCount || 0,
            ...metaData
        }

    }
)

export default fetchPosts