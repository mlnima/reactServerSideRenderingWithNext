import {createAsyncThunk} from "@reduxjs/toolkit";
import Axios from "@_variables/util/Axios";
import {setHeadData, setNotFoundPage} from "@store_toolkit/clientReducers/globalStateReducer";

const fetchPageData = createAsyncThunk(
    'posts/fetchPageData',
    async (pageName: string | string[], thunkAPI) => {
        return await Axios.get(`/api/v1/pages/getPageData?pageName=${pageName}`).then(res => {

            if (res.data?.pageData && res.data?.pageData?.status === 'published') {

                thunkAPI.dispatch(setHeadData({
                    title: res.data?.pageData?.title || pageName,
                    description: res.data?.pageData?.description?.substring(0, 155) || null,
                    keywords: res.data?.pageData?.keywords || null,
                    ogTitle: res.data?.pageData?.title || pageName,
                    canonicalUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/page/${pageName}`,
                    ogType: 'website',
                    ogDescription: res.data?.pageData?.description?.substring(0, 155) || null,
                    ogUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/page/${pageName}`,
                    ogImage: res.data?.pageData?.imageUrl || null,
                    twitterCard: true,
                    twitterUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/page/${pageName}`,
                    twitterTitle: res.data?.pageData?.title || pageName,
                    twitterDescription: res.data?.pageData?.description?.substring(0, 155) || null,
                    twitterImage: res.data?.pageData?.imageUrl || null,
                }))

                thunkAPI.dispatch(setNotFoundPage(false))

                return res.data?.pageData || null
            } else {
                thunkAPI.dispatch(setNotFoundPage(true))
                return null
            }

        })
    }
)

export default fetchPageData