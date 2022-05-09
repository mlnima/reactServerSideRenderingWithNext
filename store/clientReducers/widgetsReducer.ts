import {HYDRATE} from 'next-redux-wrapper';
import _reduceWidgetsToGroups from "../../_variables/_reduceWidgetsToGroups/_reduceWidgetsToGroups";
import {CLEAR_REQUESTED_WIDGETS, SET_REQUESTED_WIDGETS, SET_WIDGETS, SET_WIDGETS_IN_GROUPS} from "@store/types";

const initialState = {
    widgetInGroups:{},
    requestedWidgets:[]
}

export const widgetsReducer = (state = initialState, action) => {

    switch (action.type) {
        case HYDRATE:
            // console.log(action?.payload)
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
        case CLEAR_REQUESTED_WIDGETS :
            return {
                ...state,
                requestedWidgets: [ ]
            }
        default:
            return state
    }
}