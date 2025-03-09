import { createAsyncThunk } from '@reduxjs/toolkit';
import memberAutoLogin from '@lib/actions/database/operations/users/memberAutoLogin';
import { ServerActionResponse } from '@lib/actions/response';

const dev = process.env.NODE_ENV !== 'production';

export const autoLoginAction = createAsyncThunk('user/autoLoginAction', async (userData:object) => {
  try {
    const { data, success } = await memberAutoLogin() as ServerActionResponse<{userData:object}>;

    if (!success) {
      return;
    }

    return data?.userData;

  } catch (error) {
    if (dev) {
      console.log(`autoLoginAction error => `,error)
    }
  }
});
