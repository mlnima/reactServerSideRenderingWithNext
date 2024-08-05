'use client';
import React, {FC} from "react";
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {faPen} from "@fortawesome/free-solid-svg-icons/faPen";
import './AuthenticationNotLoggedInItems.styles.scss';
import {useSelector} from "react-redux";
import {Store} from "@repo/typescript-types";

interface IProps{
    onOpenCloseHandler: () => void,
    locale: string,
    dictionary: {
        [key: string]: string
    }
}
const AuthenticationNotLoggedInItems: FC<IProps> = ({onOpenCloseHandler,locale,dictionary}) => {

    const dispatch = useAppDispatch()

    const {membership, anyoneCanRegister} = useSelector(({settings}: Store) => {
        return {
            membership: settings?.initialSettings?.membershipSettings?.membership || false,
            anyoneCanRegister: settings?.initialSettings?.membershipSettings?.anyoneCanRegister || false,
        }
    });

    const onLoginButtonClickHandler = () => {
        dispatch(loginRegisterForm('login'))
        onOpenCloseHandler()
    }
    const onRegisterButtonClickHandler = () => {
        dispatch(loginRegisterForm('register'))
        onOpenCloseHandler()
    }


    return (
        <div className={'authenticationNotLoggedIn'}>
            <div className={'logged-items-auth-actions'}>

               <span onClick={onLoginButtonClickHandler}
                     className='logged-item logged-item-action'
                     aria-label='logged-out-items'>

                    <div className={'icon-wrapper'}>
                          <FontAwesomeIcon className={'sign-in-button'} icon={faUser} style={{width: 45, height: 45}}/>
                    </div>

                    <p className={'text-data'}>{dictionary?.['Login'] || 'Login'}</p>

                </span>

                {(membership && anyoneCanRegister) && <span className='logged-item logged-item-action'
                                                            onClick={onRegisterButtonClickHandler}
                                                            aria-label='logged-out-items'>

                    <div className={'icon-wrapper'}>
                         <FontAwesomeIcon className={'register-button'} icon={faPen} style={{width: 45, height: 45}}/>
                    </div>

                    <p className={'text-data'}>{dictionary?.['Register'] || 'Register'}</p>

                </span>}

            </div>

            {/*<div className={'logged-items'}>*/}
            {/*    {pathname.includes('/messenger') || pathname.includes('/chatroom') ?*/}
            {/*        <a href={`/`} className='logged-item logged-out' onClick={onOpenCloseHandler}>*/}
            {/*            <div className={'icon-wrapper'}>*/}
            {/*                <FontAwesomeIcon className={'home-button'} icon={faHome} style={{width: 20, height: 20}}/>*/}
            {/*            </div>*/}
            {/*            <p className={'text-data'}>{t<string>(`Home`)}</p>*/}
            {/*        </a>*/}
            {/*        : null*/}
            {/*    }*/}
            {/*</div>*/}


        </div>
    )
};
export default AuthenticationNotLoggedInItems
