import {AdminPanelWidgetsTypes} from "@_variables/TypeScriptTypes/Widgets";
import {ADMIN_PANEL_GET_WIDGETS, ADMIN_PANEL_DELETE_WIDGET, SAVE_NEW_WIDGET, UPDATE_WIDGET} from "@store/adminTypes";
import _reduceWidgetsToGroups from "@_variables/_reduceWidgetsToGroups/_reduceWidgetsToGroups";

const initialState = {
    adminPanelWidgets: {}
}

export const adminPanelWidgetsReducer = (state: AdminPanelWidgetsTypes = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case ADMIN_PANEL_GET_WIDGETS:
            return {
                ...state,
                adminPanelWidgets: {..._reduceWidgetsToGroups(action?.payload)}
            };
        case SAVE_NEW_WIDGET:
            return {
                ...state,
                adminPanelWidgets:{
                   ...state.adminPanelWidgets,
                    [action.payload?.data?.position] : [
                        ...state.adminPanelWidgets?.[action.payload?.data?.position],
                        action.payload
                    ]
                }
            };
            //[...state.widgets, action.payload]
        case UPDATE_WIDGET:


            return {
                ...state,

            };
        case ADMIN_PANEL_DELETE_WIDGET:
            return {
                ...state,
                adminPanelWidgets: {
                    ...state.adminPanelWidgets,
                    [action.payload?.position]: state.adminPanelWidgets?.[action.payload?.position]
                        ?.filter(widget=> widget._id !== action.payload._id),
                }
            };
        default:
            return state
    }
}

//state.widgets.filter(widget => widget._id !== action.payload._id && )