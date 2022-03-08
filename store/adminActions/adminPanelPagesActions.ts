//adminPanelPagesActions


import {LOADING} from "@store/types";
import Axios from "@_variables/util/Axios";
import {AxiosError, AxiosResponse} from "axios";
import {ADMIN_GET_PAGES, ADMIN_GET_PAGE} from "@store/adminTypes";

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