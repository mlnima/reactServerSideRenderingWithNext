import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loading,
  setAlert,
  setBackgroundFilter,
} from '@store/reducers/globalStateReducer';
import memberLogin from '@lib/actions/database/users/memberLogin';
import { ServerActionResponse } from '@lib/actions/response';

interface ILoginAction {
  username: string,
  password: string
}

export const loginAction = createAsyncThunk('user/loginAction', async (
  {
    username,
    password,
  }: ILoginAction, thunkAPI) => {
  thunkAPI.dispatch(loading(true));
  try {
    const { data, success, message } = await memberLogin({
      username,
      password,
    }) as ServerActionResponse<{ userData: object, token: string }>;

    if (!success || !data?.userData) {
      thunkAPI.dispatch(setAlert({ message: message || 'Something went wrong', type: success ? 'success' : 'error' }));
      return;
    }

    thunkAPI.dispatch(setBackgroundFilter(false));
    return {
      userData: data.userData,
      loggedIn: true
    };
  } catch (error) {
    thunkAPI.dispatch(
      setAlert({
        message: 'Something went wrong please try again later',
        type: 'error',
      }),
    );
    return;
  } finally {
    thunkAPI.dispatch(loading(false));
  }
});
