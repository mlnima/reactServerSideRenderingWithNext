import * as types from "../types";


export const setWidgets = (widgets) => async dispatch => {
    dispatch({
        type:types.SET_WIDGETS,
        payload:widgets
    })
}