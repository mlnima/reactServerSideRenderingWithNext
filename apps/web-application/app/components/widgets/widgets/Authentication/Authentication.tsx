'use client';
import React, {FC, Suspense, useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes as faXmark} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import './Authentication.scss'
import Csr from "@components/global/Csr";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import UserProfileImage from "@components/UserProfileImage/UserProfileImage";
import SkeletonRenderer from "@components/Skeletons/SkeletonRenderer";

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
    const [renderLoggedInButtons, setRenderLoggedInButtons] = useState(false)
    const [renderLoginButton, setRenderLoginButton] = useState(true)
    const [renderUserProfileButton, setRenderUserProfileButton] = useState(false)
    const [renderUserProfileImage, setRenderUserProfileImage] = useState(false)
    //
    // const {usersCanMessageEachOther} = useAppSelector(
    //     ({settings}) => settings?.initialSettings?.membershipSettings
    // );

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

    useEffect(() => {
        console.log('open=> ', open)
    }, [open]);
    useEffect(() => {
        const handleKeyPress = (e) => {
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
        // console.log('_____________________________')
        // console.log('membership=> ',membership)
        // console.log('anyoneCanRegister=> ',anyoneCanRegister)
        // console.log('loggedIn=> ',loggedIn)
        // console.log('renderRegisterButton=> ',renderRegisterButton)
        // console.log('_____________________________')
        if ((!membership || !anyoneCanRegister || loggedIn) && renderRegisterButton) {
            console.log('removing the register button=> ',)
            setRenderRegisterButton(false)
        }
        if ((!membership || loggedIn) && renderLoginButton) {
            console.log('removing the login button=> ',)
            setRenderLoginButton(false)
        }

        if ((membership && loggedIn) && !renderUserProfileButton) {
            console.log('removing the login button=> ',)
            setRenderUserProfileButton(true)
        }

        // if (loggedIn && !!profileImage && renderUserProfileImage) {
        //     setRenderUserProfileImage(true)
        // }

    }, [loggedIn, anyoneCanRegister, membership]);

    useEffect(() => {
        if (renderUserProfileButton && !!profileImage) {
            setRenderUserProfileImage(true)
        }
    }, [renderUserProfileButton]);

    return (
        <div className={'authWidget'}>
            <div className={'authWidgetPreview'}>


                {/*<button className={'loginButton btn btn-transparent'}*/}
                {/*        onClick={() => {*/}
                {/*            loggedIn ? onOpenCloseHandler() : dispatch(loginRegisterForm('login'))*/}
                {/*        }}*/}
                {/*        aria-label={'Login'}>*/}
                {/*    {!loggedIn &&*/}
                {/*        <>*/}
                {/*            <span className={'desktopOnly'}>{dictionary?.['Login'] || 'Login'}</span>*/}
                {/*            <FontAwesomeIcon icon={faUser} className={'mobileOnly'}/>*/}
                {/*        </>*/}

                {/*    }*/}


                {/*    /!*{renderUserProfileImage ? <UserProfileImage size={26}/> :*!/*/}
                {/*    /!*    <FontAwesomeIcon icon={faUser} className={!loggedIn ? 'mobileOnly' : ''}/>*!/*/}
                {/*    /!*}*!/*/}
                {/*    /!*<FontAwesomeIcon icon={faUser} className={!loggedIn ? 'mobileOnly' : ''}/>*!/*/}
                {/*</button>*/}

                {renderUserProfileButton &&
                    <button className={'loginButton btn btn-transparent'}
                            onClick={() => onOpenCloseHandler()}
                            aria-label={'user Menu'}>
                        {renderUserProfileImage ? <UserProfileImage size={26}/> :
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

                {/*<Suspense fallback={ <SkeletonRenderer height={50} width={50} count={1}/>}>*/}

                {/*</Suspense>*/}
                {/*className={!loggedIn ? 'mobileOnly' : ''}*/}
                {/*{(anyoneCanRegister && !loggedIn) &&*/}
                {/*    <button className={'desktopOnly registerButton btn btn-primary'}*/}
                {/*            style={{*/}
                {/*                display: anyoneCanRegister && !loggedIn ? 'none' : 'initial'*/}
                {/*            }}*/}
                {/*            onClick={() => dispatch(loginRegisterForm('register'))}*/}
                {/*            aria-label={'register'}>*/}
                {/*        {dictionary?.['Register'] || 'Register'}*/}
                {/*    </button>*/}
                {/*}*/}
                {/*<Suspense fallback={ <SkeletonRenderer height={50} width={100} count={1}/>}>*/}
                {/*<button className={'desktopOnly registerButton btn btn-primary'}*/}
                {/*        // style={{*/}
                {/*        //     display: (!anyoneCanRegister || loggedIn) ? 'none' : 'initial'*/}
                {/*        // }}*/}
                {/*        onClick={() => dispatch(loginRegisterForm('register'))}*/}
                {/*        aria-label={'register'}>*/}
                {/*    {dictionary?.['Register'] || 'Register'}*/}
                {/*</button>*/}

                {/*</Suspense>*/}

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