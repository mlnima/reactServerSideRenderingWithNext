import { createAsyncThunk } from '@reduxjs/toolkit';
import { loading, loginRegisterForm, setAlert } from '@store/reducers/globalStateReducer';
import registerNewUser from '@lib/actions/database/operations/users/registerNewUser';
import { IRegisterNewUser } from '@repo/typescript-types';

export const registerUserAction = createAsyncThunk(
  'user/registerUserAction',
  async (registrationData: IRegisterNewUser, thunkAPI) => {

    thunkAPI.dispatch(loading(true));
    const response = await registerNewUser(registrationData);
    console.log(`response=> `, response);
    if (response) {
      thunkAPI.dispatch(setAlert(response));
      setTimeout(() => {
        thunkAPI.dispatch(loginRegisterForm('login'));
      }, 2000);
    }
    thunkAPI.dispatch(loading(false));

  },
);
