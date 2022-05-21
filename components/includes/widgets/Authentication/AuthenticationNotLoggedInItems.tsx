import React, {FC} from "react";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import Link from "next/link";
import styled from "styled-components";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";

const AuthenticationNotLoggedInItemsStyledDiv = styled.div`
    
`

interface AuthenticationNotLoggedInItemsPropTypes {
    onOpenCloseHandler:any,
}

const AuthenticationNotLoggedInItems: FC<AuthenticationNotLoggedInItemsPropTypes> = ({onOpenCloseHandler}) => {
    const {t} = useTranslation('common');
    const {pathname} = useRouter()
    const dispatch = useAppDispatch()

    const onLoginButtonClickHandler = ()=>{
        dispatch(loginRegisterForm('login'))
        onOpenCloseHandler()
    }
    const onRegisterButtonClickHandler = ()=>{
        dispatch(loginRegisterForm('register'))
        onOpenCloseHandler()
    }



    return (
        <AuthenticationNotLoggedInItemsStyledDiv className={'authentication-not-logged-in'}>
            <div className={'logged-items-auth-actions'}>

               <span onClick={onLoginButtonClickHandler}
                     className='logged-item logged-item-action'
                     aria-label='logged-out-items'>

                    <div className={'icon-wrapper'}>
                           <span className={'sign-in-button icon'}/>
                    </div>

                    <p className={'text-data'}>{t<string>(`Login`)}</p>

                </span>

                <span className='logged-item logged-item-action'
                      onClick={onRegisterButtonClickHandler}
                      aria-label='logged-out-items'>

                    <div className={'icon-wrapper'}>
                        <span className={'register-button icon'}/>
                    </div>

                    <p className={'text-data'}>{t<string>(`Register`)}</p>

                </span>
            </div>

            <div className={'logged-items'}>
                {pathname.includes('/messenger') || pathname.includes('/chatroom') ?
                    <Link href={`/`}>
                        <a className='logged-item logged-out' onClick={onOpenCloseHandler}>
                            <div className={'icon-wrapper'}>
                                <span className={'home-button icon'}/>
                            </div>
                            <p className={'text-data'}>{t<string>(`Home`)}</p>
                        </a>
                    </Link>
                    : null
                }
            </div>


        </AuthenticationNotLoggedInItemsStyledDiv>
    )
};
export default AuthenticationNotLoggedInItems
