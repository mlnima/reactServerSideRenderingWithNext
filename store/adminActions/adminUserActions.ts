//adminUserActions
import * as adminTypes from "../adminTypes";
import axios, {AxiosError, AxiosResponse} from "axios";
import {AxiosErrorTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";

export const adminGetUsers = (data) => async dispatch => {
    try{
        const body = {
            data,
            token: localStorage.wt
        };
        await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/users/getUsersList', body)
            .then((res: AxiosResponse<any>)=>{

            dispatch({
                type: adminTypes.ADMIN_GET_USERS,
                payload: {
                    users:res.data.users,
                    totalCount:res.data.totalCount || 0
                }
            })
        }).catch((err: AxiosError<AxiosErrorTypes>)=>{

        })
    }catch (err){

    }

}