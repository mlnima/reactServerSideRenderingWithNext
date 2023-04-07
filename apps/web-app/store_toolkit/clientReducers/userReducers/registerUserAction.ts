import {createAsyncThunk} from "@reduxjs/toolkit";
import registerUser from "api-requests/src/client/users/registerUser";
import {loading, loginRegisterForm, setAlert} from "@store_toolkit/clientReducers/globalStateReducer";

export const registerUserAction = createAsyncThunk(
    'user/registerUserAction',
    async ({data}: { data: {} }, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await registerUser(data).then(res => {
            thunkAPI.dispatch(setAlert({message: res.data.message, type: 'success'}))

            setTimeout(() => {
                thunkAPI.dispatch(loginRegisterForm('login'))
            }, 2000)

        }).catch(err => {
            thunkAPI.dispatch(setAlert({message: err.response.data.message, type: 'error'}))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)