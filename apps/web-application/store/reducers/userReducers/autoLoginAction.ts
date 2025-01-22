import { createAsyncThunk } from '@reduxjs/toolkit';
import { autoLogin } from '@lib/database/operations/auth';

const dev = process.env.NODE_ENV !== 'production';

interface AutoLoginActionArgs {
  fields: string[];
  token: string;
}

interface AutoLoginActionResponse {
  loggedIn: boolean;
  userData?: any;
}

export const autoLoginAction = createAsyncThunk<
  AutoLoginActionResponse,
  AutoLoginActionArgs
>('user/autoLoginAction', async ({ fields, token }, thunkAPI) => {
  if (token) {
    try {
      const userData = await autoLogin({ token, fields });
      if (!userData) {
        localStorage.removeItem('wt');
      }
      return userData;
    } catch (error) {
      if (!dev) localStorage.removeItem('wt');

      return { loggedIn: false };
    }
  } else {
    return { loggedIn: false };
  }
});


//thunkAPI.dispatch(loading(true));
// const response = await commonAPIRequestGetSignedInUserData(fields);

// thunkAPI.dispatch(loading(false));
//return response.data?.userData;