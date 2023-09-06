'use client';
import {FC} from "react";
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
        <main id={'primary'} className={'main loggedInRequireMessage'}>
            <span className={'messageTitle'}>
                {dictionary?.['Please Log In To Access This Page'] || 'Please Log In to Access This Page'}
            </span>
            <div className={'loggedInRequireMessageButtons'}>
                <button onClick={()=>dispatch(loginRegisterForm('login'))}>
                    {dictionary?.['Login'] || 'Login'}
                </button>
                <button onClick={()=>dispatch(loginRegisterForm('register'))}>
                    {dictionary?.['Register'] || 'Register'}
                </button>
            </div>

        </main>
    )
};
export default LoggedInRequirePageMessage
