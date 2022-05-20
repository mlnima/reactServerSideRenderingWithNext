// import {ADMIN_GET_ORDERS, ADMIN_GET_ORDER} from "../../ZlegacyCodesAndComponents/store/adminTypes";
// import {LOADING} from "../../ZlegacyCodesAndComponents/store/types";
// import Axios from "@_variables/util/Axios";
// import {AxiosError, AxiosResponse} from "axios";
// import {AnyAction} from "redux";
//
// //@ts-ignore
// export const adminGetOrders = (data):AnyAction => async dispatch =>{
//     dispatch({type: LOADING, payload: true})
//     const body = {
//         ...data,
//         token: localStorage.wt
//     };
//     await Axios.post('/api/admin/orders/getOrders',body).then((response:AxiosResponse)=>{
//
//         dispatch({
//             type: ADMIN_GET_ORDERS,
//             payload: response.data?.orders
//         })
//     }).catch((err:AxiosError)=>{
//
//     }).finally(()=>dispatch({type: LOADING, payload: false}))
// }