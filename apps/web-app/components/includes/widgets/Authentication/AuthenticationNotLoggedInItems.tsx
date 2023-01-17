import React, {FC} from "react";
import useTranslation from 'next-translate/useTranslation'
import {useRouter} from "next/router";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import SvgRenderer from "../../../global/commonComponents/SvgRenderer/SvgRenderer";

interface AuthenticationNotLoggedInItemsPropTypes {
    onOpenCloseHandler: any,
}

const AuthenticationNotLoggedInItems: FC<AuthenticationNotLoggedInItemsPropTypes> = ({onOpenCloseHandler}) => {
    const {t} = useTranslation('common');
    const {pathname} = useRouter()
    const dispatch = useAppDispatch()

    const onLoginButtonClickHandler = () => {
        dispatch(loginRegisterForm('login'))
        onOpenCloseHandler()
    }
    const onRegisterButtonClickHandler = () => {
        dispatch(loginRegisterForm('register'))
        onOpenCloseHandler()
    }


    return (
        <div className={'authentication-not-logged-in'}>
            <div className={'logged-items-auth-actions'}>

               <span onClick={onLoginButtonClickHandler}
                     className='logged-item logged-item-action'
                     aria-label='logged-out-items'>

                    <div className={'icon-wrapper'}>
                                <SvgRenderer svgUrl={'/asset/images/icons/user-solid.svg'}
                                             size={48}
                                             customClassName={'sign-in-button '}
                                             color={' var(--main-text-color, #fff)'}
                                />
                    </div>

                    <p className={'text-data'}>{t<string>(`Login`)}</p>

                </span>

                <span className='logged-item logged-item-action'
                      onClick={onRegisterButtonClickHandler}
                      aria-label='logged-out-items'>

                    <div className={'icon-wrapper'}>
                               <SvgRenderer svgUrl={'/asset/images/icons/pen-solid.svg'}
                                            size={48}
                                            customClassName={'register-button'}
                                            color={' var(--main-text-color, #fff)'}
                               />
                    </div>

                    <p className={'text-data'}>{t<string>(`Register`)}</p>

                </span>
            </div>

            <div className={'logged-items'}>
                {pathname.includes('/messenger') || pathname.includes('/chatroom') ?
                    <a href={`/`} className='logged-item logged-out' onClick={onOpenCloseHandler}>
                            <div className={'icon-wrapper'}>
                                <SvgRenderer svgUrl={'/asset/images/icons/home-solid.svg'}
                                             size={20}
                                             customClassName={'home-button'}
                                             color={' var(--main-text-color, #fff)'}
                                />
                            </div>
                            <p className={'text-data'}>{t<string>(`Home`)}</p>
                    </a>
                    : null
                }
            </div>


        </div>
    )
};
export default AuthenticationNotLoggedInItems
