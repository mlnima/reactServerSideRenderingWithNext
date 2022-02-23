import axios, {AxiosError, AxiosResponse} from "axios";
import {AxiosErrorTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {LOADING} from "@store/types";
import {EXECUTE_COMMAND} from "../adminTypes";

export const terminalCommandExecutor = (command) => async dispatch => {
    dispatch({
        type: LOADING,
        payload: true
    })
    try{
        const body = {
            command,
            token: localStorage.wt
        };
        await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/terminal/commandExecutor', body)
            .then((res: AxiosResponse<any>)=>{
                dispatch({
                    type: LOADING,
                    payload: false
                })
                dispatch({
                    type: EXECUTE_COMMAND,
                    payload: {
                        result:res.data.response,
                        command,
                    }
                })
            }).catch((err: AxiosError<AxiosErrorTypes>)=>{
                dispatch({
                    type: EXECUTE_COMMAND,
                    payload: {
                        result:err.stack,
                        command,
                    }
                })
            })
        dispatch({
            type: LOADING,
            payload: false
        })
    }catch (err){
        dispatch({
            type: LOADING,
            payload: false
        })
    }

}