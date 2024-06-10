import { createAsyncThunk } from '@reduxjs/toolkit';
import { commonAPIRequestGetSignedInUserData } from '@repo/api-requests';
import { loading } from '@store/reducers/globalStateReducer';

interface AutoLoginActionArgs {
    fields: string[];
}

interface AutoLoginActionResponse {
    loggedIn: boolean;
    userData?: any;
}

export const autoLoginAction = createAsyncThunk<
    AutoLoginActionResponse,
    AutoLoginActionArgs
>('user/autoLoginAction', async ({ fields }, thunkAPI) => {
    if (localStorage.wt) {
        try {
            thunkAPI.dispatch(loading(true));
            const response = await commonAPIRequestGetSignedInUserData(fields);
            thunkAPI.dispatch(loading(false));
            return response.data?.userData;
        } catch (error) {
            //@ts-ignore
            const status = error?.response?.status;
            if (status >= 500 && status <= 599) {
                console.log(`server 5** error on login`);
            } else {
                localStorage.removeItem('wt');
            }

            return { loggedIn: false };
        }
    } else {
        return { loggedIn: false };
    }
});
