'use client';
import React, {FC} from "react";
import Link from "next/link";
import {useAppSelector} from "@store/hooks";
import UserProfileImage from "@components/UserProfileImage/UserProfileImage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOut} from "@fortawesome/free-solid-svg-icons/faSignOut";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import dynamic from "next/dynamic";

const AuthenticationAdminItems = dynamic(() => import('./AuthenticationAdminItems'))
import './AuthenticationLoggedInItems.styles.scss';

interface IProps {
    onOpenCloseHandler: (status: boolean) => void,
    onSignOutHandler: () => void,
    locale: string,
    dictionary: {
        [key: string]: string
    }
}

interface UserData {
    username: string;
    role: string;
}

const AuthenticationLoggedInItems: FC<IProps> = ({onOpenCloseHandler, locale, dictionary, onSignOutHandler}) => {


    const {membership} = useAppSelector(({settings}) => settings?.initialSettings?.membershipSettings);

    const {usersCanMessageEachOther} = useAppSelector(
        ({settings}) => settings?.initialSettings?.membershipSettings
    );

    const {username, role} = useAppSelector(({user}) => user?.userData || {} as UserData);

    return (
        <>

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


            <div className="menuItemWrapper">
                <span className='menuItem sign-out' onClick={onSignOutHandler}>
                    <div className={'icon-wrapper'}>
                         <FontAwesomeIcon icon={faSignOut} style={{width: 20, height: 20}}/>
                    </div>
                    <p className={'text-data'}>{dictionary?.['Logout'] || 'Logout'}</p>
                </span>
            </div>


        </>
    )
};
export default AuthenticationLoggedInItems
