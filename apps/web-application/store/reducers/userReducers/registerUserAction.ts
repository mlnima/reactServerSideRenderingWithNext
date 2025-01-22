import {createAsyncThunk} from "@reduxjs/toolkit";
//import {clientAPIRequestRegisterUser} from "@repo/api-requests";
import {loading, loginRegisterForm, setAlert} from "@store/reducers/globalStateReducer";
//import {AxiosError, AxiosResponse} from "axios";
import { register } from '@lib/database/operations/auth';

export const registerUserAction = createAsyncThunk(
    'user/registerUserAction',
    async ({data}: { data: {} }, thunkAPI) => {

      try {

      }catch (error){}
        thunkAPI.dispatch(loading(true))

        const response = await register(data);
        console.log(`response=> `,response)
        if (response){
          thunkAPI.dispatch(setAlert(response))
          setTimeout(() => {
            thunkAPI.dispatch(loginRegisterForm('login'))
          }, 2000)
        }
        thunkAPI.dispatch(loading(false))

    }
)




// return await clientAPIRequestRegisterUser(data).then((res:AxiosResponse) => {
//     thunkAPI.dispatch(setAlert({message: res.data.message, type: 'success'}))
//
//     setTimeout(() => {
//         thunkAPI.dispatch(loginRegisterForm('login'))
//     }, 2000)
//
// }).catch(() => {
//     // @ts-expect-error: need fix
//     thunkAPI.dispatch(setAlert({message: 'Something Went Wrong', type: 'error'}))
// }).finally(() => thunkAPI.dispatch(loading(false)))