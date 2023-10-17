'use client';
import React, {FC, useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes as faXmark} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import './Authentication.scss'
import Csr from "@components/global/Csr";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import UserProfileImage from "@components/UserProfileImage/UserProfileImage";
import {userLogout} from "@store/reducers/userReducers/userReducer";

const AuthenticationLoggedInItems = dynamic(() => import('./AuthenticationLoggedInItems'))

interface IProps {
    locale: string,
    dictionary: {
        [key: string]: string
    }
}

const Authentication: FC<IProps> = ({locale, dictionary}) => {

    const [open, setOpen] = useState(false);
    const authenticationMenuRef = useRef<HTMLDivElement | null>(null)
    const dispatch = useAppDispatch()
    const loggedIn = useAppSelector(({user}) => user?.loggedIn);
    const profileImage = useAppSelector(({user}) => user?.userData?.profileImage?.filePath);
    const {membership} = useAppSelector(({settings}) => settings?.initialSettings?.membershipSettings);
    const {anyoneCanRegister} = useAppSelector(({settings}) => settings?.initialSettings?.membershipSettings);
    const [renderRegisterButton, setRenderRegisterButton] = useState(true)
    const [renderLoginButton, setRenderLoginButton] = useState(true)
    const [renderUserProfileButton, setRenderUserProfileButton] = useState(false)
    const [renderUserProfileImage, setRenderUserProfileImage] = useState(false)

    useEffect(() => {
        if (open) {
            if (authenticationMenuRef.current) {
                const rect = authenticationMenuRef.current.getBoundingClientRect();
                if (rect.right > window.innerWidth / 2) {
                    authenticationMenuRef.current.style.right = '0'
                } else {
                    authenticationMenuRef.current.style.left = '0'
                }
            }
        }
    }, [open]);

    useEffect(() => {
        const handleKeyPress = (e: any) => {
            if (e.altKey && e.code === 'KeyL') {
                if (!loggedIn) {
                    dispatch(loginRegisterForm('login'))
                } else {
                    setOpen((prevOpen) => !prevOpen);
                }
            }
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', handleKeyPress);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
        if ((!membership || !anyoneCanRegister || loggedIn) && renderRegisterButton) {
            setRenderRegisterButton(false)
        }
        if ((!membership || loggedIn) && renderLoginButton) {
            setRenderLoginButton(false)
        }

        if ((membership && loggedIn) && !renderUserProfileButton) {
            setRenderUserProfileButton(true)
        }
    }, [loggedIn, anyoneCanRegister, membership]);

    useEffect(() => {
        if (renderUserProfileButton && !!profileImage) {
            setRenderUserProfileImage(true)
        }
    }, [renderUserProfileButton]);

    useEffect(() => {
        console.log('loggedIn=> ', loggedIn)
        console.log('renderRegisterButton=> ', renderRegisterButton)
        console.log('renderLoginButton=> ', renderLoginButton)
        console.log('renderUserProfileButton=> ', renderUserProfileButton)
        console.log('renderUserProfileImage=> ', renderUserProfileImage)
    }, [loggedIn, renderRegisterButton, renderLoginButton, renderUserProfileButton, renderUserProfileImage]);

    const onOpenCloseHandler = () => {
        setOpen(!open);
    }

    const onSignOutHandler = () => {
        dispatch(userLogout())
        dispatch(loginRegisterForm(false))
        setRenderRegisterButton(true)
        setRenderLoginButton(true)
        setRenderUserProfileButton(false)
        setRenderUserProfileImage(false)
        setOpen(false)
    }


    return (
        <div className={'authWidget'}>
            <div className={'authWidgetPreview'}>

                {renderUserProfileButton &&
                    <button className={'profileButton btn btn-transparent'}
                            onClick={() => onOpenCloseHandler()}
                            aria-label={'user Menu'}>
                        {renderUserProfileImage ? <UserProfileImage size={27}/> :
                            <FontAwesomeIcon icon={faUser}/>
                        }
                    </button>
                }

                {renderLoginButton &&
                    <button className={'loginButton btn btn-transparent'}
                            onClick={() => dispatch(loginRegisterForm('login'))}
                            aria-label={dictionary?.['Login'] || 'Login'}>
                        <span className={'desktopOnly'}>{dictionary?.['Login'] || 'Login'}</span>
                        <FontAwesomeIcon icon={faUser} className={'mobileOnly'}/>
                    </button>
                }

                {renderRegisterButton &&
                    <button className={'desktopOnly registerButton btn btn-primary'}
                            onClick={() => dispatch(loginRegisterForm('register'))}
                            aria-label={dictionary?.['Register'] || 'Register'}>
                        {dictionary?.['Register'] || 'Register'}
                    </button>
                }
            </div>
            {open &&
                <div ref={authenticationMenuRef} className={`authWidgetSlideWrapper`}>
                    <div className={`darkenBackground authWidgetDarkenBackground`} onClick={onOpenCloseHandler}/>

                    <div className={`authWidgetSlide ${open ? 'authWidgetSlideOpened' : 'authWidgetSlideClosed'}`}>
                        <button className="authWidgetCloseBtn" onClick={onOpenCloseHandler}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                        <Csr>
                            {loggedIn && <AuthenticationLoggedInItems onOpenCloseHandler={onOpenCloseHandler}
                                                                      onSignOutHandler={onSignOutHandler}
                                                                      locale={locale}
                                                                      dictionary={dictionary}/>}
                        </Csr>
                    </div>
                </div>
            }
        </div>
    );
};

export default Authentication;
