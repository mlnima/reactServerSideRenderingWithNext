//adminPanelPagesActions


import {LOADING} from "@store/types";
import Axios from "@_variables/util/Axios";
import axios, {AxiosError, AxiosResponse} from "axios";
import {ADMIN_GET_PAGES, ADMIN_GET_PAGE, ADMIN_EDIT_PAGE_FIELD} from "@store/adminTypes";

export const adminGetPages = (data) => async (dispatch: any) =>{
    dispatch({
        type: LOADING,
        payload: true
    })
    const body = {
        ...data,
        token: localStorage.wt
    };
    await Axios.post('/api/admin/pages/getPagesData',body).then((response:AxiosResponse)=>{

        dispatch({
            type: ADMIN_GET_PAGES,
            payload: response.data?.pages
        })
    }).catch((err:AxiosError)=>{

    }).finally(()=>{
        dispatch({
            type: LOADING,
            payload: false
        })
    })
}
export const adminGetPage = (id) => async (dispatch: any) =>{
    dispatch({
        type: LOADING,
        payload: true
    })
    const body = {
        id,
        token: localStorage.wt
    };
    await Axios.post('/api/v1/pages/getPageData',body).then((response:AxiosResponse)=>{
        dispatch({
            type: ADMIN_GET_PAGE,
            payload: response.data?.pageData
        })
    }).catch((err:AxiosError)=>{

    }).finally(()=>{
        dispatch({
            type: LOADING,
            payload: false
        })
    })
}
export const adminUpdatePage = (pageData) => async (dispatch: any) =>{
    dispatch({
        type: LOADING,
        payload: true
    })
    const body = {
        pageData,
        token: localStorage.wt
    };
    await Axios.post('/api/admin/pages/updatePage',body).then((response:AxiosResponse)=>{

    }).catch((err:AxiosError)=>{

    }).finally(()=>{
        dispatch({
            type: LOADING,
            payload: false
        })
    })
}
export const adminSaveNewPage = (pageData,push) => async (dispatch: any) =>{
    dispatch({
        type: LOADING,
        payload: true
    })
    const body = {
        pageData,
        token: localStorage.wt
    };

    await Axios.post('/api/admin/pages/createNewPage',body).then((response:AxiosResponse)=>{
            const pageId = response.data.savedPageData._id
            push(`/admin/page?id=${pageId}`)
    }).catch((err:AxiosError)=>{


    }).finally(()=>{
        dispatch({
            type: LOADING,
            payload: false
        })
    })
}

export const adminEditPageField  = (changes) => async (dispatch: any) =>{
    dispatch({
        type: ADMIN_EDIT_PAGE_FIELD,
        payload: changes
    })
}

export const adminDeleteCustomPage  = (id) => async (dispatch: any) =>{
    dispatch({
        type: LOADING,
        payload: true
    })
    const body = {
        id,
        token: localStorage.wt
    }
    await Axios.post('/api/admin/pages/deleteCustomPage', body).then(res=>{

    }).catch(err=>{

    }).finally(()=>{
        dispatch({
            type: LOADING,
            payload: false
        })
    })
}
