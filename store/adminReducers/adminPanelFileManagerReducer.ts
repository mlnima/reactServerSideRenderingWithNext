//adminPanelFileManagerReducer
import {AdminPanelFileManagerTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {
    ADMIN_PANEL_EDIT_TRANSLATIONS_FILE,
    ADMIN_PANEL_FILE_MANAGER_CLOSE_POPUP,
    ADMIN_PANEL_FILE_MANAGER_DELETE_FILE,
    ADMIN_PANEL_FILE_MANAGER_EDIT_STATE,
    ADMIN_PANEL_FILE_MANAGER_READ_PATH,
    ADMIN_PANEL_READ_TRANSLATIONS_FILE
} from "@store/adminTypes";

const initialState = {
    path: '.',
    prevPath: '.',
    files: [],
    clickedItem: '',
    clickedItemName: '',
    file: '',
    editFile: false,
    action: '',
    _do: '',
    // AlertBox:false,
    DeleteAlertBox: false,
    confirm: Date.now(),
    message: '',
    report: '',
    inputBox: false,
    newItemName: '',
    lastUpdate:Date.now(),
    createNewFileFolderPop:false,
    createNewFileFolderPopType:'file',
    translationsData:''
}

//@ts-ignore
export const adminPanelFileManagerReducer = (state: AdminPanelFileManagerTypes = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case ADMIN_PANEL_FILE_MANAGER_READ_PATH:
            return {
                ...state,
                ...action.payload
            };
        case ADMIN_PANEL_FILE_MANAGER_EDIT_STATE:
            return {
                ...state,
                ...action.payload
            };
        case ADMIN_PANEL_FILE_MANAGER_DELETE_FILE:
            return {
                ...state,
                ...action.payload
            };
        case ADMIN_PANEL_FILE_MANAGER_CLOSE_POPUP:
            return {
                ...state,
                ...action.payload
            };
        case ADMIN_PANEL_READ_TRANSLATIONS_FILE:
            return {
                ...state,
                translationsData:action.payload
            };
        case ADMIN_PANEL_EDIT_TRANSLATIONS_FILE:
            return {
                ...state,
                translationsData:action.payload
            };
        default:
            return state
    }
}