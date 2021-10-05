import * as types from "../types";
import axios from "axios";
import {SAVE_NEW_WIDGET} from "../types";

export const getCustomPages = ( ) => async dispatch => {
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/pages/getPagesData', {token: localStorage.wt}).then(res => {
        if (res.data?.pages) {
            dispatch({
                type: types.GET_CUSTOM_PAGES,
                payload: res.data.pages.map(page => page.pageName)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
}

