import { createAsyncThunk } from '@reduxjs/toolkit';
import { commonAPIRequestLoginUser } from '@repo/api-requests';
import {
  loading,
  setAlert,
  setBackgroundFilter,
} from '@store/reducers/globalStateReducer';
import { login } from '@lib/database/actions/auth';

interface LoginActionArgs {
  username: string;
  password: string;
}

interface LoginActionResponse {
  loggedIn: boolean;
  userData?: any; // Replace "any" with actual type of userData
}

export const loginAction = createAsyncThunk<
  LoginActionResponse,
  LoginActionArgs
>('user/loginAction', async ({ username, password }, thunkAPI) => {
  thunkAPI.dispatch(loading(true));
  try {
    const { token, userData, success, message } = await login({
      username,
      password,
    });

    if (message){
      thunkAPI.dispatch(
          setAlert({ message, type: success ? 'success' : 'error' })
      );
    }

    if (success && token) {
      localStorage.setItem('wt', token);
      thunkAPI.dispatch(setBackgroundFilter(false));
      return {
        userData,
        loggedIn: true,
      };
    } else {
      return {
        loggedIn: false,
      };
    }
  } catch (error) {
    thunkAPI.dispatch(
      setAlert({
        message: 'Something went wrong please try again later',
        type: 'error',
      })
    );
    return {
      userData: {},
      loggedIn: false,
    };
  } finally {
    thunkAPI.dispatch(loading(false));
  }
});
