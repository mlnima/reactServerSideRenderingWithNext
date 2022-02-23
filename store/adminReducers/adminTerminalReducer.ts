import {EXECUTE_COMMAND, TERMINA_LOG} from "../adminTypes";
import {AdminPanelTerminalState} from "@_variables/TypeScriptTypes/GlobalTypes";

const initialState = {
    command: 'dir',
    logs:[],
    lastCommandResult:'',
    commandsHistory:[]
}

export const adminTerminalReducer = (state: AdminPanelTerminalState = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case TERMINA_LOG:
            return {
                ...state,
                lastCommandResult: action.payload.users,
            };
        case EXECUTE_COMMAND:
            return {
                ...state,
                commandsHistory: [
                    ...state.commandsHistory,
                    action.payload.command
                ],
                logs:[
                    ...state.logs,
                    action.payload.result
                ]
            };
        default:
            return state
    }
}