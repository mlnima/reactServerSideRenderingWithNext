'use client';
import { FC, useEffect, KeyboardEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loginRegisterForm } from '@store/reducers/globalStateReducer';

const KeysListener: FC = () => {
    const loggedIn = useAppSelector(({ user }) => user?.loggedIn);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const openLoginFormHandler = (ev: KeyboardEvent) => {
            if (ev.altKey && ev.code === 'KeyL') {
                if (!loggedIn) {
                    dispatch(loginRegisterForm('login'));
                }
            }
        };
        //@ts-expect-error: type need to be fixed
        window.addEventListener('keydown', openLoginFormHandler);

        return () => {
            //@ts-expect-error: type need to be fixed
            window.removeEventListener('keydown', openLoginFormHandler);
        };
    }, []);

    return null;
};
export default KeysListener;
