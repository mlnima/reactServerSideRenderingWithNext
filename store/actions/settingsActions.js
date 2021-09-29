import * as types from "../types";


export const setSettings = (setting,type) => dispatch=>{
    dispatch({
        type:types.SET_SETTINGS,
        payload: {setting,type}
    })
}