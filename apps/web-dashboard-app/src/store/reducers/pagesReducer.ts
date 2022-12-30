import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading} from "./globalStateReducer";
import {AxiosInstance} from "api-requests";
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "../store";
import getPages from "api-requests/src/dashboard/pages/getPages";
import getPage from "api-requests/src/dashboard/pages/getPage";
import updatePage from "api-requests/src/dashboard/pages/updatePage";
import createNewPage from "api-requests/src/dashboard/pages/createNewPage";
import deletePage from "api-requests/src/dashboard/pages/deletePage";


const initialState = {
    pages: [],
    page: {}
}

// export const pagesReducer = (state: AdminPanelPagesTypes = initialState, action: { type: string, payload: any }) =>{
//     switch (action.type) {
//         case ADMIN_GET_PAGES:
//             return {
//                 ...state,
//                 pages: action.payload
//             };
//         case ADMIN_GET_PAGE:
//             return {
//                 ...state,
//                 page: action.payload
//             };
//         case ADMIN_EDIT_PAGE_FIELD:
//             return {
//                 ...state,
//                 page: {
//                     ...state.page,
//                     ...action.payload
//                 }
//             };
//         default:
//             return state
//     }
// }


export const getPagesAction = createAsyncThunk(
    'adminPanelPages/getPagesAction',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await getPages(data).then((response: AxiosResponse) => {
            return response.data?.pages
        }).catch((err: AxiosError) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchAdminPanelPage = createAsyncThunk(
    'adminPanelPages/fetchAdminPanelPage',
    async (id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            _id: id,
            token: localStorage.wt
        };

        return await getPage(id).then((response: AxiosResponse) => {
            return response.data?.pageData
        }).catch((err: AxiosError) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const fetchAdminUpdatePage = createAsyncThunk(
    'adminPanelPages/fetchAdminPanelPage',
    async (pageData: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            pageData,
            token: localStorage.wt
        };

        return await updatePage(pageData).then((response: AxiosResponse) => {

        }).catch((err: AxiosError) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const fetchAdminSaveNewPage = createAsyncThunk(
    'adminPanelPages/fetchAdminPanelPage',
    async ({pageData, push}: { pageData: {}, push: any }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await createNewPage(pageData).then((response: AxiosResponse) => {
            const pageId = response.data.savedPageData._id
            push(`/admin/page?id=${pageId}`)
        }).catch((err: AxiosError) => {


        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const fetchAdminDeleteCustomPage = createAsyncThunk(
    'adminPanelPages/fetchAdminPanelPage',
    async (id:string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return  await deletePage(id).then(res=>{

        }).catch(err=>{

        }).finally(()=>thunkAPI.dispatch(loading(false)))
    }
)


export const pagesSlice = createSlice({
    name: 'adminPanelPages',
    initialState,
    reducers: {
        adminEditPageField:(state, action: PayloadAction<any>) =>{
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
                    pages: action.payload
                };
            })
            .addCase(fetchAdminPanelPage.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    page: action.payload
                };
            })

    }
})

//adminEditPageField

export const {adminEditPageField} = pagesSlice.actions

export const pagesReducer = (state: RootState) => state?.pages || null

export default pagesSlice.reducer