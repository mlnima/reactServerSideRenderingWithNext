import axios, {AxiosError, AxiosResponse} from "axios";
import {AxiosErrorTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {LOADING} from "@store/types";
import {ADMIN_GET_USERS} from "../adminTypes";

export const adminGetUsers = (data) => async dispatch => {
    dispatch({
        type: LOADING,
        payload: true
    })
    try{
        const body = {
            data,
            token: localStorage.wt
        };
        await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/users/getUsersList', body)
            .then((res: AxiosResponse<any>)=>{

            dispatch({
                type: ADMIN_GET_USERS,
                payload: {
                    users:res.data.users,
                    totalCount:res.data.totalCount || 0
                }
            })

        }).catch((err: AxiosError<AxiosErrorTypes>)=>{

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