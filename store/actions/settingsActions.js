import * as types from "../types";


export const setSettings = (setting) => dispatch=>{
    dispatch({
        type:types.SET_SETTINGS,
        payload: setting
    })
}