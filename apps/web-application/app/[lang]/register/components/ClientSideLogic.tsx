'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useRouter } from 'next/navigation';
import { loginRegisterForm } from '@store/reducers/globalStateReducer';

const ClientSideLogic = () => {
    const dispatch = useAppDispatch();
    const loggedIn = useAppSelector(store => store?.user?.loggedIn);
    const router = useRouter();

    useEffect(() => {
        if (loggedIn) {
            router.push('/');
        } else {
            dispatch(loginRegisterForm('register'));
        }
    }, [loggedIn]);

    return null;
};
export default ClientSideLogic;
