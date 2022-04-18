import React, {FC} from 'react';
import {useTranslation} from 'next-i18next';
import {useDispatch} from "react-redux";
import {setLoginRegisterFormStatus} from "@store/clientActions/globalStateActions";

const LoggedOutItemsMenu: FC = () => {
    const {t} = useTranslation('common');
    const dispatch = useDispatch()
    return (
        <>
            <span onClick={() => dispatch(setLoginRegisterFormStatus('login'))}
                  className='logged-item btn logged-out btn-transparent-light'
                  aria-label='logged-out-items'
            >
                <span className={'sign-in-button icon'}/>
                <p className={'text-data'}>{t<string>(`Login`)}</p>
            </span>
            <span onClick={() => dispatch(setLoginRegisterFormStatus('register'))}
                  className='logged-item btn logged-out btn-transparent-light'
                  aria-label='logged-out-items'
            >
                <span className={'register-button icon'}/>
                <p className={'text-data'}>{t<string>(`Register`)}</p>
            </span>
        </>
    )
};

export default LoggedOutItemsMenu;
