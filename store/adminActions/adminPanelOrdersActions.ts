import {ADMIN_GET_ORDERS, ADMIN_GET_ORDER} from "@store/adminTypes";
import {LOADING} from "@store/types";
import Axios from "@_variables/util/Axios";
import {AxiosError, AxiosResponse} from "axios";

export const adminGetOrders = (data) => async (dispatch: any) =>{
    dispatch({type: LOADING, payload: true})
    const body = {
        ...data,
        token: localStorage.wt
    };
    await Axios.post('/api/admin/orders/getOrders',body).then((response:AxiosResponse)=>{

        dispatch({
            type: ADMIN_GET_ORDERS,
            payload: response.data?.orders
        })
    }).catch((err:AxiosError)=>{

    }).finally(()=>dispatch({type: LOADING, payload: false}))
}