'use client';
import React, {FC, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEarthAmerica, faTimes} from "@fortawesome/free-solid-svg-icons";
import Logo from "@components/widgets/widgets/Logo/Logo";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import Link from "next/link";
import UserProfileImage from "@components/UserProfileImage/UserProfileImage";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import AuthenticationAdminItems from "@components/widgets/widgets/Authentication/AuthenticationAdminItems";
import {loginRegisterForm, setUserConfigMenu} from "@store/reducers/globalStateReducer";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons/faCircleUser";
import {faPen} from "@fortawesome/free-solid-svg-icons/faPen";
import LanguagesSwitcher from "@components/widgets/widgets/LanguagesSwitcher/LanguagesSwitcher";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import DayModeNightMode from "@components/widgets/widgets/DayModeNightMode/DayModeNightMode";
import {faSignOut} from "@fortawesome/free-solid-svg-icons/faSignOut";
import './UserConfigMenu.scss'
import {userLogout} from "@store/reducers/userReducers/userReducer";

interface IProps {
    locale: string,
    dictionary: {
        [key: string]: string
    }
}

const UserConfigMenu: FC<IProps> =
    ({
         locale,
         dictionary,
     }) => {
        const user = useAppSelector(({user}) => user);
        const {userConfigMenu} = useAppSelector(({globalState}) => globalState);
        const {
            languagesSwitcherInUserConfigMenu,
            themeColorsSwitcherInUserConfigMenu,
            logoUrl,
            logoWidth,
            logoHeight
        } = useAppSelector(({settings}) => settings?.initialSettings?.layoutSettings);
        const membershipSettings = useAppSelector(({settings}) => settings?.initialSettings?.membershipSettings);
        const dispatch = useAppDispatch()
        const {backgroundFilter} = useAppSelector(({globalState}) => globalState);

        useEffect(() => {
            if (!backgroundFilter && userConfigMenu) {
                dispatch(setUserConfigMenu(false))
            }
        }, [backgroundFilter]);

        const onSignOutHandler = () => {
            dispatch(userLogout())
            dispatch(setUserConfigMenu(false))
        }

        if (userConfigMenu) {
            return (
                <div className={`userConfigMenuOpen custom-scroll`}>

                    <div className="menuHeader">
                        <button className="authWidgetCloseBtn" onClick={() => dispatch(setUserConfigMenu(false))}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                        {logoUrl && <Logo uniqueData={{
                            logoUrl,
                            width:(logoWidth || 150)/2,
                            height:(logoHeight || 150)/2
                        }} locale={locale}/>}
                    </div>
                    <div className="menuItems">
                        {(languagesSwitcherInUserConfigMenu ||themeColorsSwitcherInUserConfigMenu) &&
                            <div className={'menuItem'}>
                                <div className={'menuItemMultiContent'}>
                                    {languagesSwitcherInUserConfigMenu &&
                                        <div className={`languagesSwitcher`}>
                                              <span className={'preferenceMenuItemTitle'}>
                                                    <FontAwesomeIcon icon={faEarthAmerica}/>
                                              </span>
                                            <LanguagesSwitcher locale={locale}/>
                                        </div>
                                    }

                                    {themeColorsSwitcherInUserConfigMenu &&
                                        <div className={`themeColorsSwitcher`}>
                                        <span className={'preferenceMenuItemTitle'}>
                                              <FontAwesomeIcon icon={faSun}/>
                                             {/*{dictionary?.['Theme'] || 'Theme'}:*/}
                                        </span>
                                            <DayModeNightMode/>
                                        </div>
                                    }
                                </div>
                            </div>

                        }
                        {user?.loggedIn &&
                            <>
                                <div className="menuItem">
                                    <div className={'userInfo menuItemContent'}>
                                        <Link
                                            href={`${
                                                locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '' : `/${locale}`}/user/${
                                                user?.userData?.username
                                            }`}
                                            onClick={() => dispatch(setUserConfigMenu(false))}>
                                            <div className='userInfoProfileIcon'>
                                                <UserProfileImage size={40} profileRedirect={false}/>
                                                <span className={'username'}>
                                            {user?.userData?.username}
                                        </span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                {(membershipSettings?.membership && membershipSettings?.usersCanMessageEachOther) &&
                                    <div className="menuItem">
                                        <Link href={`/messenger`}
                                              className={'menuItemContent logged-in'}
                                              onClick={() => dispatch(setUserConfigMenu(false))}>
                                            <div className={'icon-wrapper'}>
                                                <FontAwesomeIcon icon={faEnvelope} style={{width: 20, height: 20}}/>
                                            </div>
                                            <p className={'text-data'}>{dictionary?.['Messages'] || 'Messages'}</p>
                                        </Link>
                                    </div>
                                }
                                {(user?.userData?.role === 'administrator') && <AuthenticationAdminItems/>}
                            </>
                        }

                        {!user?.loggedIn &&
                            <div className="menuItem">
                                <div className="guestAuthOptions">
                                    <button className={'loginButton'}
                                            onClick={() => dispatch(loginRegisterForm('login'))}
                                            aria-label={dictionary?.['Login'] || 'Login'}>
                                        <FontAwesomeIcon icon={faCircleUser}/>
                                        <span>{dictionary?.['Login'] || 'Login'}</span>

                                    </button>

                                    {membershipSettings?.anyoneCanRegister &&
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

                        {user?.loggedIn &&
                            <div className="menuItem">
                                <span className='menuItemContent sign-out' onClick={onSignOutHandler}>
                                    <div className={'icon-wrapper'}>
                                         <FontAwesomeIcon icon={faSignOut} style={{width: 20, height: 20}}/>
                                    </div>
                                    <p className={'text-data'}>{dictionary?.['Logout'] || 'Logout'}</p>
                                </span>
                            </div>
                        }
                    </div>
                </div>
            )
        } else return null

    };
export default UserConfigMenu;

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
