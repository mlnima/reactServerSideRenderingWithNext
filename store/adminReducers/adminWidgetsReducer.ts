import {AdminPanelWidgetsTypes} from "@_variables/TypeScriptTypes/Widgets";
import {ADMIN_PANEL_GET_WIDGETS, DELETE_WIDGET, UPDATE_WIDGET} from "@store/adminTypes";
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
        // case UPDATE_WIDGET:
        //     // const index =  findIndex(state.widgets, {_id: action.payload._id});
        //     const index = state.widgets.findIndex(widget=>widget._id === action.payload._id);
        //     const currentWidgets = state.widgets;
        //     currentWidgets.splice(index, 1, action.payload);
        //     return {
        //         ...state,
        //         widgets: currentWidgets
        //     };
        // case DELETE_WIDGET:
        //     return {
        //         ...state,
        //         widgets: state.widgets.filter(widget => widget._id !== action.payload)
        //     };
        default:
            return state
    }
}