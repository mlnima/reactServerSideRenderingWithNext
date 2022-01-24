import React, {FC} from 'react';
import {withTranslation} from "next-i18next";
import {useDispatch} from "react-redux";
import {setLoginRegisterFormStatus} from "../../../../../store/actions/globalStateActions";

interface LoggedOutItemsMenuPropTypes {
    t: any
}

const LoggedOutItemsMenu: FC<LoggedOutItemsMenuPropTypes> = ({t}) => {
    const dispatch = useDispatch()
    return (
        <>
            <span onClick={() => dispatch(setLoginRegisterFormStatus('login'))}
                    className='logged-item btn btn-transparent-light'
                    aria-label='logged-out-items'
            >
                <span className={'sign-in icon'}/>
                {t(`common:Login`)}
            </span>
            <span onClick={() => dispatch(setLoginRegisterFormStatus('register'))}
                    className='logged-item btn btn-transparent-light'
                    aria-label='logged-out-items'
            >
                <span className={'sign-out icon'}/>
                {t(`common:Register`)}
            </span>
        </>
    )
};

export default withTranslation(['common'])(LoggedOutItemsMenu);
