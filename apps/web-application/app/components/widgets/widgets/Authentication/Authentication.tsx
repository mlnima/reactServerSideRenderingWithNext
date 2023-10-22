'use client';
import React, {FC, useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEarthAmerica, faGear, faTimes as faXmark} from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import './Authentication.scss'
import Csr from "@components/global/Csr";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {loginRegisterForm, setBackgroundFilter} from "@store/reducers/globalStateReducer";
import UserProfileImage from "@components/UserProfileImage/UserProfileImage";
import {userLogout} from "@store/reducers/userReducers/userReducer";
import {UniqueDataTypes} from "typescript-types/dist/src/widgets/Widget";
import LanguagesSwitcher from "@components/widgets/widgets/LanguagesSwitcher/LanguagesSwitcher";
import UserPreferenceConfigWidget
    from "@components/widgets/widgets/UserPreferenceConfigWidget/UserPreferenceConfigWidget";
import DayModeNightMode from "@components/widgets/widgets/DayModeNightMode/DayModeNightMode";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import Logo from "../Logo/Logo";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons/faCircleUser";
import {faPen} from "@fortawesome/free-solid-svg-icons/faPen";
import Link from "next/link";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faSignOut} from "@fortawesome/free-solid-svg-icons/faSignOut";
import AuthenticationAdminItems from "@components/widgets/widgets/Authentication/AuthenticationAdminItems";

// const AuthenticationLoggedInItems = dynamic(() => import('./AuthenticationLoggedInItems'))

interface IProps {
    locale: string,
    uniqueData: UniqueDataTypes
    dictionary: {
        [key: string]: string
    }
}

const Authentication: FC<IProps> = ({locale, dictionary, uniqueData}) => {

    const [open, setOpen] = useState(false);
    const authenticationMenuRef = useRef<HTMLDivElement | null>(null)
    const dispatch = useAppDispatch()
    const {backgroundFilter} = useAppSelector(({globalState}) => globalState);
    const loggedIn = useAppSelector(({user}) => user?.loggedIn);
    const profileImage = useAppSelector(({user}) => user?.userData?.profileImage?.filePath);
    const {membership} = useAppSelector(({settings}) => settings?.initialSettings?.membershipSettings);
    const {username, role} = useAppSelector(({user}) => user?.userData || {});

    const {usersCanMessageEachOther} = useAppSelector(
        ({settings}) => settings?.initialSettings?.membershipSettings
    );
    const {anyoneCanRegister} = useAppSelector(({settings}) => settings?.initialSettings?.membershipSettings);
    const [renderRegisterButton, setRenderRegisterButton] = useState(true)
    const [renderLoginButton, setRenderLoginButton] = useState(true)
    const [renderUserProfileButton, setRenderUserProfileButton] = useState(false)
    const [renderUserProfileImage, setRenderUserProfileImage] = useState(false)


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

        if (membership && !renderUserProfileButton) {
            setRenderUserProfileButton(true)
        }

    }, [loggedIn, anyoneCanRegister, membership]);


    useEffect(() => {
        if (!backgroundFilter && open) {
            setOpen(false)
        }
    }, [backgroundFilter]);

    useEffect(() => {
        if (renderUserProfileButton && !!profileImage) {
            setRenderUserProfileImage(true)
        }
    }, [renderUserProfileButton]);

    const onOpenCloseHandler = (status: boolean) => {
        setOpen(status);
        dispatch(setBackgroundFilter(status))
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

            <button className={'authMenuOpenButton  btn btn-transparent'}
                    onClick={() => onOpenCloseHandler(true)}
                    aria-label={'user Menu'}>
                {renderUserProfileImage ? <UserProfileImage size={27}/> :
                    <FontAwesomeIcon icon={faCircleUser} className={'userIcon'}/>
                }
                {renderUserProfileImage &&
                    <FontAwesomeIcon icon={faGear} className={'gearIcon'}/>
                }

            </button>


            <div className={`authWidgetMenuWrapper${open ? 'Open' : 'Closed'} custom-scroll`}>

                <div className="authWidgetMenuHeader">
                    <button className="authWidgetCloseBtn" onClick={() => onOpenCloseHandler(false)}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                    {uniqueData?.logoUrl && <Logo uniqueData={uniqueData} locale={locale}/>}
                </div>

                {/*<Csr>*/}
                {/*    {loggedIn && <AuthenticationLoggedInItems onOpenCloseHandler={onOpenCloseHandler}*/}
                {/*                                              onSignOutHandler={onSignOutHandler}*/}
                {/*                                              locale={locale}*/}
                {/*                                              dictionary={dictionary}/>}*/}
                {/*</Csr>*/}

                    {loggedIn && <>
                        <div className="menuItemWrapper">
                            <div className={'userInfo menuItem'}>
                                <Link
                                    href={`${locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '' : `/${locale}`}/user/${username}`}
                                    onClick={() => onOpenCloseHandler(false)}>
                                    <div className='userInfoProfileIcon'>
                                        <UserProfileImage size={40} profileRedirect={false}/>
                                        <span className={'username'}>{username}</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        {(membership && usersCanMessageEachOther) &&
                            <div className="menuItemWrapper">
                                <Link href={`/messenger`}
                                      className={'menuItem logged-in'}
                                      onClick={() => onOpenCloseHandler(false)}>
                                    <div className={'icon-wrapper'}>
                                        <FontAwesomeIcon icon={faEnvelope} style={{width: 20, height: 20}}/>
                                    </div>
                                    <p className={'text-data'}>{dictionary?.['Messages'] || 'Messages'}</p>
                                </Link>
                            </div>
                        }

                        {(role === 'administrator') && <AuthenticationAdminItems/>}


                    </>}




                {(!loggedIn && (renderLoginButton|| renderRegisterButton)) &&
                    <div className="menuItemWrapper">
                        <div className="guestAuthOptions">
                            {renderLoginButton &&
                                <button className={'loginButton'}
                                        onClick={() => dispatch(loginRegisterForm('login'))}
                                        aria-label={dictionary?.['Login'] || 'Login'}>
                                    <FontAwesomeIcon icon={faCircleUser}/>
                                    <span>{dictionary?.['Login'] || 'Login'}</span>

                                </button>
                            }

                            {renderRegisterButton &&
                                <button className={'registerButton'}
                                        onClick={() => dispatch(loginRegisterForm('register'))}
                                        aria-label={dictionary?.['Register'] || 'Register'}>
                                    <FontAwesomeIcon icon={faPen}/>
                                    {dictionary?.['Register'] || 'Register'}
                                </button>
                            }
                        </div>
                    </div>
                }

                {uniqueData?.languagesSwitcher &&
                    <div className="menuItemWrapper">
                        <div className={`menuItem languagesSwitcher${
                            uniqueData?.burgerMenuOnDesktop ? '' : ' menuItemDynamic'}`}>
                                      <span className={'preferenceMenuItemTitle'}>
                                            <FontAwesomeIcon icon={faEarthAmerica}/>
                                          {/*{dictionary?.['Language'] || 'Language'}:*/}
                                      </span>
                            <LanguagesSwitcher locale={locale}/>
                        </div>
                    </div>
                }

                {uniqueData?.themeColorsSwitcher &&
                    <div className="menuItemWrapper">
                        <div className={`menuItem themeColorsSwitcher${
                            uniqueData?.burgerMenuOnDesktop ? '' : ' menuItemDynamic'}`}>
                                        <span className={'preferenceMenuItemTitle'}>
                                              <FontAwesomeIcon icon={faSun}/>
                                            {/*{dictionary?.['Theme'] || 'Theme'}:*/}
                                        </span>
                            <DayModeNightMode uniqueData={uniqueData}/>
                        </div>
                    </div>
                }


                {loggedIn &&
                    <div className="menuItemWrapper">
                        <span className='menuItem sign-out' onClick={onSignOutHandler}>
                            <div className={'icon-wrapper'}>
                                 <FontAwesomeIcon icon={faSignOut} style={{width: 20, height: 20}}/>
                            </div>
                            <p className={'text-data'}>{dictionary?.['Logout'] || 'Logout'}</p>
                        </span>
                    </div>
                }
            </div>


        </div>
    );
};

export default Authentication;


// useEffect(() => {
//     if (open) {
//         if (authenticationMenuRef.current) {
//             const rect = authenticationMenuRef.current.getBoundingClientRect();
//             if (rect.right > window.innerWidth / 2) {
//                 authenticationMenuRef.current.style.right = '0'
//             } else {
//                 authenticationMenuRef.current.style.left = '0'
//             }
//         }
//     }
// }, [open]);