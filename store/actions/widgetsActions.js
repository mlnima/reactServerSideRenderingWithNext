import * as types from "../types";
import {HYDRATE} from "next-redux-wrapper";

export const setWidgets = (widgets) => async dispatch => {

    dispatch({
        type:types.SET_WIDGETS,
        payload:widgets
    })
}

export const hydrateWidgets = (data) => dispatch => {

    dispatch({
        type:HYDRATE,
        payload:data
    })
}
