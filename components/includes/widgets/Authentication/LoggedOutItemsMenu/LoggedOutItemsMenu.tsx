import React, {FC} from 'react';
import {useTranslation} from 'next-i18next';
import {useDispatch} from "react-redux";
import {setLoginRegisterFormStatus} from "../../../../../store/clientActions/globalStateActions";

const LoggedOutItemsMenu: FC = () => {
    const {t} = useTranslation('common');
    const dispatch = useDispatch()
    return (
        <>
            <span onClick={() => dispatch(setLoginRegisterFormStatus('login'))}
                  className='logged-item btn btn-transparent-light'
                  aria-label='logged-out-items'
            >
                <span className={'sign-in icon'}/>
                {t(`Login`)}
            </span>
            <span onClick={() => dispatch(setLoginRegisterFormStatus('register'))}
                  className='logged-item btn btn-transparent-light'
                  aria-label='logged-out-items'
            >
                <span className={'sign-out icon'}/>
                {t(`Register`)}
            </span>
        </>
    )
};

export default LoggedOutItemsMenu;
