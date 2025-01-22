'use client';
import { useEffect } from 'react';
import { autoLoginAction } from '@store/reducers/userReducers/autoLoginAction';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setAdminMode } from '@store/reducers/globalStateReducer';


interface IAutoLogin {
  fields: string[],
  token: string
}

const UserAutoLogin = () => {
  const dispatch = useAppDispatch();
  const { loggedIn, userData } = useAppSelector(({ user }) => user);

  useEffect(() => {
    if (!loggedIn) {
      const token = localStorage.getItem('wt');
      if (token) {
        const fields = [
          'username',
          'role',
          'keyMaster',
          'profileImage',
        ];
        dispatch(
          autoLoginAction({
            fields,
            token
          }),
        );
      }
    }
  }, []);


  useEffect(() => {
    const adminMode = localStorage.getItem('adminMode');
    if (userData?.role === 'administrator' && adminMode === 'true') {
      dispatch(setAdminMode(true));
    }
  }, [loggedIn]);

  return null;
};

export default UserAutoLogin;
