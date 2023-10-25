'use client';
import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {loginRegisterForm} from "@store/reducers/globalStateReducer";

const KeysListener: FC = () => {
    const loggedIn = useAppSelector(({user}) => user?.loggedIn);
    const dispatch = useAppDispatch()

    useEffect(() => {
        window.addEventListener('keydown', openLoginFormHandler);
        return () => {
            window.removeEventListener('keydown', openLoginFormHandler);
        };
    }, []);

    const openLoginFormHandler = (e: any) => {
        if (e.altKey && e.code === 'KeyL') {
            if (!loggedIn) {
                dispatch(loginRegisterForm('login'))
            }
        }
    };


    return null
};
export default KeysListener
