import {ADMIN_EDIT_DESIGN, ADMIN_EDIT_IDENTITY, ADMIN_EDIT_SETTING, ADMIN_GET_SETTINGS} from "@store/adminTypes";
import {LOADING, SET_SETTINGS} from "@store/types";
import Axios from "@_variables/util/Axios";
import _getMultipleSettingsQueryGenerator from "@_variables/clientVariables/_getMultipleSettingsQueryGenerator";
import {AnyAction} from "redux";

//@ts-ignore
export const editSettings = (changes):AnyAction => async (dispatch: any) => {
    dispatch({
        type: ADMIN_EDIT_SETTING,
        payload: changes
    })
}
//@ts-ignore
export const adminPanelEditIdentity = (changes):AnyAction => async (dispatch: any) => {
    dispatch({
        type: ADMIN_EDIT_IDENTITY,
        payload: changes
    })
}
//@ts-ignore
export const adminPanelEditDesign = (changes):AnyAction => async (dispatch: any) => {
    dispatch({
        type: ADMIN_EDIT_DESIGN,
        payload: changes
    })
}
//@ts-ignore
export const adminPanelGetSettings = ():AnyAction => async (dispatch: any) => {
    dispatch({type: LOADING, payload: true})
    await Axios.get(`/api/admin/settings/getMultipleSetting${_getMultipleSettingsQueryGenerator(['identity', 'design', 'adminSettings'], false)}&token=${localStorage.wt}`)
        .then(res => {

            const designSettings = res.data?.settings?.find((setting: any) => setting.type === 'design') || {};
            const identitySettings = res.data?.settings?.find((setting: any) => setting.type === 'identity') || {};

            const settings = {
                design: designSettings?.data,
                identity: identitySettings?.data,
            }

            dispatch({
                type: SET_SETTINGS,
                payload: settings
            })

            dispatch({
                type: ADMIN_GET_SETTINGS,
                payload: settings
            })

        }).catch(() => {

        }).finally(() => {
            dispatch({
                type: LOADING,
                payload: true
            })
        })
}