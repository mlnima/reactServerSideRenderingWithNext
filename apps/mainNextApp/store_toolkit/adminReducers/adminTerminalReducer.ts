import {AxiosErrorTypes} from "@_typeScriptTypes/axiosTypes/AxiosErrorTypes";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading} from "../clientReducers/globalStateReducer";
import axios, {AxiosError, AxiosResponse} from "axios";
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
        return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/terminal/command', body)
            .then((res: AxiosResponse<any>)=>{
                return   {
                    result:res.data.response,
                    command,
                }
            }).catch((err: AxiosError<AxiosErrorTypes>)=>{
                return  {
                    result:err.stack,
                    command,
                }
            }).finally(()=>thunkAPI.dispatch(loading(false)))
    }
)

export const adminPanelTerminalSlice = createSlice({
   name : 'adminPanelTerminalState',
    initialState,
    reducers:{},
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


export const adminTerminalReducer = (state: RootState) => state?.adminPanelTerminalState || null
export default adminPanelTerminalSlice.reducer