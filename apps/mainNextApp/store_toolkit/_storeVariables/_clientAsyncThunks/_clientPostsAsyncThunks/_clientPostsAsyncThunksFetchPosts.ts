import {createAsyncThunk} from "@reduxjs/toolkit";
import {getTextDataWithTranslation, textContentReplacer,convertMetasTypeToSingular} from "custom-util";
import _clientGetPostsQueryGenerator from "@_variables/_clientVariables/clientVariables/_clientGetPostsQueryGenerator";
import Axios from "@_variables/Axios";
import {setHeadData} from "../../../clientReducers/globalStateReducer";
import {_postsCanonicalUrlGenerator} from "@_variables/_clientVariables/clientVariables/_canonicalUrlGenerators";

interface FetchPosts {
    context: any,
    metaId: string,
    options: {
        page: string,
        setHeadData?: boolean
    }
}

const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async ({context, metaId, options}: FetchPosts, thunkAPI) => {
        //@ts-ignore
        const {settings} = await thunkAPI.getState()
        const gettingPostsQueries = _clientGetPostsQueryGenerator(context.query, metaId)
        const apiData = await Axios.get(`/api/v1/posts/clientGetPosts${gettingPostsQueries}`)
        const metaType = apiData.data?.meta?.type
        const singularMetaForm = convertMetasTypeToSingular(metaType);

        // const isWrongPathWithContentQueryRegex = new RegExp('\/posts\\?content=','g')
        // const ifIsInternalNavigated = new RegExp(`\/_next\/data\/`)
        // console.log(ifIsInternalNavigated.test(context.req.url))
        // console.log(context.req.url)


        // if (!!context && singularMetaForm !== options.page && options.page!== '404' && options.page!== 'posts' && options.page!== 'search'){
        //     console.log(`/${singularMetaForm}/${apiData.data?.meta?._id}`)
            // context.res.writeHead(301, {
            //     Location: `/${singularMetaForm}/${apiData.data?.meta?._id}`
            // });
            // context.res.end();
        // }

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

export default fetchPosts