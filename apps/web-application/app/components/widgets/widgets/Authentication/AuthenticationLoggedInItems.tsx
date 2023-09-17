'use client';
import React, {FC} from "react";
import Link from "next/link";
import {userLogout} from "@store/reducers/userReducers/userReducer";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import UserProfileImage from "@components/UserProfileImage/UserProfileImage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOut} from "@fortawesome/free-solid-svg-icons/faSignOut";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import dynamic from "next/dynamic";
const AuthenticationAdminItems = dynamic(() => import('./AuthenticationAdminItems'))
import './AuthenticationLoggedInItems.styles.scss';
import {useSelector} from "react-redux";
import {Store} from "typescript-types/dist/src/storeTypes/Store";

interface IProps {
    onOpenCloseHandler: () => void,
    locale: string,
    dictionary: {
        [key: string]: string
    }
}

interface UserData {
    username: string;
    role: string;
}

const AuthenticationLoggedInItems: FC<IProps> = ({onOpenCloseHandler, locale, dictionary}) => {


    const {membership} = useAppSelector(({settings}) =>  settings?.initialSettings?.membershipSettings);

    const {usersCanMessageEachOther} = useAppSelector(
        ({settings}) =>  settings?.initialSettings?.membershipSettings
    );

    const {username, role} = useAppSelector(({user}) => user?.userData || {} as UserData);
    const dispatch = useAppDispatch()

    const onSignOutHandler = () => {
        dispatch(userLogout())
        dispatch(loginRegisterForm(false))
        onOpenCloseHandler()
    }

    return (
        <div className={'authenticationLoggedIn'}>

            <div className={'user-info'}>
                <Link href={`/user/${username}`} onClick={onOpenCloseHandler}>
                    <div className='user-info-profile-icon'>
                        <UserProfileImage size={40} profileRedirect={false}/>
                    </div>
                    <div className={'username-info'}>
                        <span className={'username'}>{username}</span>
                        <span className={'view-profile'}>View Profile</span>
                    </div>
                </Link>
            </div>


            <div className={'logged-items'}>

                {(membership && usersCanMessageEachOther) &&
                    <Link href={`/messenger`}
                          className='logged-item logged-in'
                          onClick={onOpenCloseHandler}>
                        <div className={'icon-wrapper'}>
                            <FontAwesomeIcon icon={faEnvelope} style={{width: 20, height: 20}}/>
                        </div>
                        <p className={'text-data'}>{dictionary?.['Messages'] || 'Messages'}</p>
                    </Link>
                }

                {(role === 'administrator') && <AuthenticationAdminItems/>}

                <span className='logged-item logged-in sign-out' onClick={onSignOutHandler}>
                    <div className={'icon-wrapper'}>
                         <FontAwesomeIcon icon={faSignOut} style={{width: 20, height: 20}}/>
                    </div>
                    <p className={'text-data'}>{dictionary?.['Logout'] || 'Logout'}</p>
                </span>

            </div>

        </div>
    )
};
export default AuthenticationLoggedInItems
