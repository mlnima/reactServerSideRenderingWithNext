import {createAsyncThunk} from "@reduxjs/toolkit";
import {getTextDataWithTranslation, textContentReplacer,convertMetasTypeToSingular} from "custom-util";
import {setHeadData} from "../globalStateReducer";
import {_postsCanonicalUrlGenerator} from "@_variables/_clientVariables/clientVariables/_canonicalUrlGenerators";
import getPosts from "api-requests/src/client/posts/getPosts";

interface FetchPosts {
    context: any,
    metaId: string| null,
    options: {
        page: string,
        setHeadData?: boolean
    }
}

const getPostsAction = createAsyncThunk(
    'posts/getPostsAction',
    async ({context, metaId, options}: FetchPosts, thunkAPI) => {
        //@ts-ignore
        const {settings} = await thunkAPI.getState()
        const apiData = await getPosts(context.query,metaId)
        const metaType = apiData.data?.meta?.type
        const singularMetaForm = convertMetasTypeToSingular(metaType);

        const dataForm = metaType && singularMetaForm ? `${singularMetaForm}Data` : '';
        const meta = apiData?.data?.meta
        const metaData = dataForm && meta ? {[dataForm]: meta} : {}

        if (options.setHeadData) {
            const title = textContentReplacer(
                getTextDataWithTranslation(
                    context.locale,
                    `${options.page}PageTitle`,
                    settings?.identity,
                    process.env.NEXT_PUBLIC_DEFAULT_LOCAL
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
                    settings?.identity,
                    process.env.NEXT_PUBLIC_DEFAULT_LOCAL
                ), {
                    name: apiData.data?.meta?.name || context?.query?.keyword,
                    siteName: settings?.identity?.siteName || '',
                    count:apiData.data?.meta?.count
                }
            )

            const canonicalUrl = _postsCanonicalUrlGenerator(
                singularMetaForm,
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

export default getPostsAction