// @ts-nocheck
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { loading, setAlert } from './globalStateReducer';
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "../store";
import {
    dashboardAPIRequestCreateNewPage,
    dashboardAPIRequestDeletePage,
    dashboardAPIRequestGetPages,
    dashboardAPIRequestGetPage,
    dashboardAPIRequestUpdatePage
} from "@repo/api-requests";

import dashboardGetPages from '@lib/actions/database/operations/pages/dashboardGetPages';



const initialState = {
    pages: [],
    page: {}
}

export const getPagesAction = createAsyncThunk(
    'adminPanelPages/getPagesAction',
    async (queries: object, thunkAPI) => {
      thunkAPI.dispatch(loading(true));
      const { data, success, message, error } = await dashboardGetPages(queries);
      thunkAPI.dispatch(loading(false));

      if (!success) {
        console.log(`getPagesAction error=> `, error);
        thunkAPI.dispatch(
          setAlert({
            message,
            type: 'Error',
            err: error,
          }),
        );
        return;
      }


      return {
        pages:data?.pages,
        totalCount: data?.totalCount,
      }
    }
)

// return await dashboardAPIRequestGetPages(data).then((response: AxiosResponse) => {
//     console.log(`payload=> `,response?.data)
//     return response.data?.pages
// }).catch((err: AxiosError) => {
//     console.log(`err=> `,err)
// }).finally(() => thunkAPI.dispatch(loading(false)))

export const getPageAction = createAsyncThunk(
    'adminPanelPages/getPageAction',
    async (id: string|null, thunkAPI) => {

        try {
            thunkAPI.dispatch(loading(true))
            const response : AxiosResponse = await dashboardAPIRequestGetPage(id)
            return response.data?.pageData
        }catch (err){
            console.log(`getPagesAction err=> `,err)
            return []
        }finally {
            thunkAPI.dispatch(loading(false))
        }



//         thunkAPI.dispatch(loading(true))
//         const body = {
//             _id: id,
//             token: localStorage.wt
//         };
// //@ts-ignore
//         return await dashboardAPIRequestGetPage(id).then((response: AxiosResponse) => {
//             return response.data?.pageData
//         }).catch((err: AxiosError) => {
//
//         }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const updatePageAction = createAsyncThunk(
    'adminPanelPages/updatePageAction',
    async (pageData: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            pageData,
            token: localStorage.wt
        };

        return await dashboardAPIRequestUpdatePage(pageData).then((response: AxiosResponse) => {

        }).catch((err: AxiosError) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const createNewPageAction = createAsyncThunk(
    'adminPanelPages/createNewPageAction',
    async ({pageData}: { pageData: {} }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await dashboardAPIRequestCreateNewPage(pageData).then((response: AxiosResponse) => {
            // const pageId = response.data.savedPageData._id
            // push(`/admin/page?id=${pageId}`)
        }).catch((err: AxiosError) => {


        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const deletePageAction = createAsyncThunk(
    'adminPanelPages/deletePageAction',
    async (id:string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return  await dashboardAPIRequestDeletePage(id).then(res=>{

        }).catch(err=>{

        }).finally(()=>thunkAPI.dispatch(loading(false)))
    }
)


export const pagesSlice = createSlice({
    name: 'adminPanelPages',
    initialState,
    reducers: {
        editPageFieldAction:(state, action: PayloadAction<any>) =>{
            return {
                ...state,
                page: {
                    ...state.page,
                    ...action.payload
                }
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPagesAction.fulfilled, (state, action: PayloadAction<any>) => {

                return {
                    ...state,
                    ...action.payload
                };
            })
            .addCase(getPageAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    page: action.payload
                };
            })

    }
})

//adminEditPageField

export const {editPageFieldAction} = pagesSlice.actions

export const pagesReducer = (state: RootState) => state?.pages || null

export default pagesSlice.reducer