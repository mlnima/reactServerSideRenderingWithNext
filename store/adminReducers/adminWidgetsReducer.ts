import {AdminPanelWidgetsTypes} from "@_variables/TypeScriptTypes/Widgets";
import {ADMIN_PANEL_GET_WIDGETS} from "@store/adminTypes";
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
        default:
            return state
    }
}