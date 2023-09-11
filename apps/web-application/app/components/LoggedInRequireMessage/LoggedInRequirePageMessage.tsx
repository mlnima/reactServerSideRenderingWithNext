'use client';
import React, {FC} from "react";
import './LoggedInRequirePageMessage.styles.scss';
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import {useAppDispatch} from "@store/hooks";

interface IProps {
    dictionary: {
        [key: string]: string
    },
}

const LoggedInRequirePageMessage: FC<IProps> = ({dictionary}) => {
    const dispatch = useAppDispatch()
    return (
        <div className={'notLoggedInMessage'}>
            <h1>{dictionary?.['You Need To Log In'] || 'You Need To Log In'}</h1>
            <div className={'notLoggedInMessageActionButtons'}>
                <button className={'btn btn-primary'} onClick={() => dispatch(loginRegisterForm('login'))}>
                    {dictionary?.['Login'] || 'Login'}
                </button>
                <button className={'btn btn-primary'} onClick={() => dispatch(loginRegisterForm('register'))}>
                    {dictionary?.['Register'] || 'Register'}
                </button>
            </div>

        </div>
    )
};
export default LoggedInRequirePageMessage
