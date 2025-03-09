'use client';
import { FC, useEffect } from 'react';
import { ServerActionResponse } from '@lib/actions/response';
import { useAppDispatch } from '@store/hooks';
import { setUserData } from '@store/reducers/userReducers/userReducer';
import { setAdminMode } from '@store/reducers/globalStateReducer';
import { cookieChecker } from '@lib/actions/cookieTools';

interface IProps {
  autoLoginData: ServerActionResponse<{ userData: { role: string } }>;
}

const MemberInitializerClient: FC<IProps> = ({ autoLoginData }) => {
  const dispatch = useAppDispatch();

  const checkAdminMode = async () =>{

    try {
      const adminModeCookie = await cookieChecker('adminMode')
      if (adminModeCookie){
        dispatch(setAdminMode(true));
      }
    }catch (error){
      console.log(`error=> `,error)
    }

  }

  useEffect(() => {
    if (autoLoginData?.success && autoLoginData?.data?.userData) {
      dispatch(setUserData(autoLoginData?.data?.userData));
    }

    if (autoLoginData?.data?.userData?.role === 'administrator') {
      checkAdminMode()
    }
  }, []);

  return null;
};

export default MemberInitializerClient;

