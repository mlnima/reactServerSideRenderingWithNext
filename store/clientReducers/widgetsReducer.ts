import {HYDRATE} from 'next-redux-wrapper';
import _reduceWidgetsToGroups from "../../_variables/_reduceWidgetsToGroups/_reduceWidgetsToGroups";
import {SET_REQUESTED_WIDGETS, SET_WIDGETS, SET_WIDGETS_IN_GROUPS} from "@store/types";
// import {findIndex} from 'lodash'
import {
    DELETE_WIDGET,
    UPDATE_WIDGET
} from "@store/adminTypes";
import {object} from "prop-types";

const initialState = {
    widgetInGroups:{},
    requestedWidgets:[]
}

// ...action?.payload?.widgets || [],
// widgetInGroups:{
//     ...state.widgetInGroups,
//     // ...action?.payload?.widgetInGroups
// }
export const widgetsReducer = (state = initialState, action) => {

    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                widgetInGroups:{
                    ...state.widgetInGroups,
                    ...action?.payload?.widgets?.widgetInGroups || {},
                }
            };
        case  SET_WIDGETS:
            return {
                ...state,
                widgets: action?.payload
            }
        case  SET_WIDGETS_IN_GROUPS:
            return {
                ...state,
                widgetInGroups: {
                    ...state.widgetInGroups,
                    ..._reduceWidgetsToGroups(action?.payload)
                }
            }
        case SET_REQUESTED_WIDGETS:
            return {
                ...state,
                requestedWidgets: [...new Set([...state.requestedWidgets,...action.payload])]
            }

        // case  SET_WIDGETS_FOR_ADMIN:
        //     return{
        //        ...state,
        //         widgets : action?.payload
        //     }
        // case SAVE_NEW_WIDGET:
        //
        //     return {
        //         ...state,
        //         widgets: [...state.widgets, action.payload]
        //     };

        default:
            return state
    }
}