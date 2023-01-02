import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading} from "./globalStateReducer";
import {AxiosError, AxiosResponse} from "axios";
import {AxiosInstance} from "api-requests";
import {RootState} from "../store";

const initialState = {
    command: 'dir',
    logs:[],
    lastCommandResult:'',
    commandsHistory:[]
}

export const terminalCommandExecutor = createAsyncThunk(
    'adminPanelTerminalState/terminalCommandExecutor',
    async (command: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            command,
            token: localStorage.wt
        };
        return await AxiosInstance.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/terminal/command', body)
            .then((res: AxiosResponse<any>)=>{
                return   {
                    result:res.data.response,
                    command,
                }
            }).catch((error:AxiosError)=>{
                return  {
                    result:error.stack,
                    command,
                }
            }).finally(()=>thunkAPI.dispatch(loading(false)))
    }
)

export const terminalSlice = createSlice({
   name : 'adminPanelTerminalState',
    initialState,
    reducers:{},
    //@ts-ignore
    extraReducers:(builder) => builder
        .addCase(terminalCommandExecutor.fulfilled,(state, action: PayloadAction<any>) =>{
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
        })
})


export const terminalReducer = (state: RootState) => state?.terminal || null
export default terminalSlice.reducer