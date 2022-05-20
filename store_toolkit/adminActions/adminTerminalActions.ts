// import axios, {AxiosError, AxiosResponse} from "axios";
// import {AxiosErrorTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
// import {LOADING} from "../../ZlegacyCodesAndComponents/store/types";
// import {EXECUTE_COMMAND} from "../adminTypes";
// import {AnyAction} from "redux";
// //@ts-ignore
// export const terminalCommandExecutor = (command):AnyAction => async dispatch => {
//     dispatch({type: LOADING, payload: true})
//     try{
//         const body = {
//             command,
//             token: localStorage.wt
//         };
//         await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/terminal/commandExecutor', body)
//             .then((res: AxiosResponse<any>)=>{
//                 dispatch({
//                     type: LOADING,
//                     payload: false
//                 })
//                 dispatch({
//                     type: EXECUTE_COMMAND,
//                     payload: {
//                         result:res.data.response,
//                         command,
//                     }
//                 })
//             }).catch((err: AxiosError<AxiosErrorTypes>)=>{
//                 dispatch({
//                     type: EXECUTE_COMMAND,
//                     payload: {
//                         result:err.stack,
//                         command,
//                     }
//                 })
//             }).finally(()=>dispatch({type: LOADING, payload: false}))
//
//     }catch (err){
//         dispatch({
//             type: LOADING,
//             payload: false
//         })
//     }
//
// }