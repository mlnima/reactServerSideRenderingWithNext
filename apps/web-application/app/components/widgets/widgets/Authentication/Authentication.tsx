'use client';
import React, {FC, useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes as faXmark} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import AuthenticationNotLoggedInItems from "./AuthenticationNotLoggedInItems";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import './Authentication.scss'
import Csr from "@components/global/Csr";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import Link from "next/link";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import UserProfileImage from "@components/UserProfileImage/UserProfileImage";

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

    const {usersCanMessageEachOther} = useAppSelector(
        ({settings}) => settings?.initialSettings?.membershipSettings
    );

    const onOpenCloseHandler = () => {
        setOpen(!open);
    };

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

    return (
        <div className={'authWidget'}>
            <div className={'authWidgetPreview'}>

                <button className={'loginButton btn btn-transparent'}
                        onClick={() => {
                            loggedIn ? onOpenCloseHandler() : dispatch(loginRegisterForm('login'))
                        }}
                        aria-label={'Login'}>
                    {!loggedIn && <span className={'desktopOnly'}>{dictionary?.['Login'] || 'Login'}</span>}

                    {!!profileImage ? <UserProfileImage size={26}/> :
                        <FontAwesomeIcon className={!loggedIn ? 'mobileOnly' : ''} icon={faUser}/>
                    }
                </button>

                {(!loggedIn && anyoneCanRegister) &&
                    <button className={'desktopOnly registerButton btn btn-primary'}
                            onClick={() => dispatch(loginRegisterForm('register'))}
                            aria-label={'register'}>
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


//
// {!loggedIn && <AuthenticationNotLoggedInItems onOpenCloseHandler={onOpenCloseHandler}
//                                               locale={locale}
//                                               dictionary={dictionary}/>}

// <Csr>
//     {(loggedIn && membership && usersCanMessageEachOther) &&
//         <Link href={`/messenger`}
//               className='messagesIcon'>
//             <FontAwesomeIcon icon={faEnvelope}/>
//         </Link>
//     }
// </Csr>
//
//
// <button className={'mobileOnly profileIcon'}
//         onClick={onOpenCloseHandler}
//         aria-label={'authentication'}>
//     <FontAwesomeIcon icon={faUser}/>
// </button>