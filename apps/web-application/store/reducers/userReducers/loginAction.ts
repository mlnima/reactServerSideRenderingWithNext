import {createAsyncThunk} from "@reduxjs/toolkit";
import {commonAPIRequestLoginUser} from "api-requests";
import {loading, setAlert, setBackgroundFilter} from "@store/reducers/globalStateReducer";

interface LoginActionArgs {
    username: string;
    password: string;
}

interface LoginActionResponse {
    loggedIn: boolean;
    userData?: any; // Replace "any" with actual type of userData
}

export const loginAction = createAsyncThunk<LoginActionResponse, LoginActionArgs>(
    'user/loginAction',
    async ({username, password}, thunkAPI) => {
        thunkAPI.dispatch(loading(true));
        try {
            const response = await commonAPIRequestLoginUser(username, password);
            if (response?.data?.token) {
                localStorage.setItem('wt', response.data.token);
                thunkAPI.dispatch(setBackgroundFilter(false));
                return {
                    userData: response.data.userData,
                    loggedIn: true,
                };
            } else {
                return {
                    loggedIn: false,
                };
            }
        } catch (error) {
            thunkAPI.dispatch(
                //@ts-ignore
                setAlert({message: error?.response?.data?.message, type: 'error'})
            );
            return {
                userData: {},
                loggedIn: false,
            };
        } finally {
            thunkAPI.dispatch(loading(false));
        }
    }
);

