import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading} from "../clientReducers/globalStateReducer";
import Axios from "@_variables/Axios";
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "../store";


const initialState = {
    pages: [],
    page: {}
}

// export const adminPanelPagesReducer = (state: AdminPanelPagesTypes = initialState, action: { type: string, payload: any }) =>{
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


export const fetchAdminPanelPages = createAsyncThunk(
    'adminPanelPages/fetchAdminPanelPages',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            ...data,
            token: localStorage.wt
        };

        return await Axios.post('/api/admin/pages/getPagesData', body).then((response: AxiosResponse) => {
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

        return await Axios.post('/api/admin/pages/getPageData', body).then((response: AxiosResponse) => {
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

        return await Axios.post('/api/admin/pages/updatePage', body).then((response: AxiosResponse) => {

        }).catch((err: AxiosError) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)
export const fetchAdminSaveNewPage = createAsyncThunk(
    'adminPanelPages/fetchAdminPanelPage',
    async ({pageData, push}: { pageData: {}, push: any }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            pageData,
            token: localStorage.wt
        };

        return await Axios.post('/api/admin/pages/createNewPage', body).then((response: AxiosResponse) => {
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
        const body = {
            id,
            token: localStorage.wt
        }

        return  await Axios.post('/api/admin/pages/deleteCustomPage', body).then(res=>{

        }).catch(err=>{

        }).finally(()=>thunkAPI.dispatch(loading(false)))
    }
)


export const adminPanelPagesSlice = createSlice({
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
            .addCase(fetchAdminPanelPages.fulfilled, (state, action: PayloadAction<any>) => {
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

export const {adminEditPageField} = adminPanelPagesSlice.actions

export const adminPanelPagesReducer = (state: RootState) => state?.adminPanelPages || null

export default adminPanelPagesSlice.reducer