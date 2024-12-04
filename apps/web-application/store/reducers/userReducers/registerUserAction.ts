import {createAsyncThunk} from "@reduxjs/toolkit";
import {clientAPIRequestRegisterUser} from "@repo/api-requests";
import {loading, loginRegisterForm, setAlert} from "@store/reducers/globalStateReducer";
import {AxiosError, AxiosResponse} from "axios";

export const registerUserAction = createAsyncThunk(
    'user/registerUserAction',
    async ({data}: { data: {} }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await clientAPIRequestRegisterUser(data).then((res:AxiosResponse) => {
            thunkAPI.dispatch(setAlert({message: res.data.message, type: 'success'}))

            setTimeout(() => {
                thunkAPI.dispatch(loginRegisterForm('login'))
            }, 2000)

        }).catch((err:AxiosError) => {
            // @ts-expect-error: need fix
            thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error'}))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)