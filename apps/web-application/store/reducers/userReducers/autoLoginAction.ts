import { createAsyncThunk } from '@reduxjs/toolkit';
import { commonAPIRequestGetSignedInUserData } from '@repo/api-requests';
import { loading } from '@store/reducers/globalStateReducer';
const dev = process.env.NODE_ENV !== 'production';

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
    if (localStorage.getItem('wt')) {
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
                if (!dev)  localStorage.removeItem('wt');

            }

            return { loggedIn: false };
        }
    } else {
        return { loggedIn: false };
    }
});
