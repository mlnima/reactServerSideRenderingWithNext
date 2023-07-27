import React, {FC} from "react";
import styled from "styled-components";
import Link from "next/link";
import useTranslation from 'next-translate/useTranslation'
import {userLogout} from "@store/reducers/userReducers/userReducer";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import UserProfileImage from "@components/UserProfileImage/UserProfileImage";
import AuthenticationAdminItems from "./AuthenticationAdminItems";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOut} from "@fortawesome/free-solid-svg-icons/faSignOut";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";

const AuthenticationLoggedInItemsStyledDiv = styled.div`
  .user-info {
    a {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: var(--primary-text-color,#fff);
      width: 100%;

      .user-profile-image {
        margin: 10px 0;
      }

      .username-info {
        padding: 0 20px;
        display: flex;
        flex-direction: column;

        .username {
          font-size: 18px;
          font-weight: bold;
        }

        .view-profile {
          font-size: 0.75em;
        }
      }
    }

  }
`

interface AuthenticationLoggedInItemsPropTypes {
    onOpenCloseHandler: any,
}

interface UserData {
    username: string;
    role: string;
}

const AuthenticationLoggedInItems: FC<AuthenticationLoggedInItemsPropTypes> = ({onOpenCloseHandler}) => {

    const {membership, usersCanMessageEachOther} = useSelector(
        ({settings}: Store) => settings?.initialSettings?.membershipSettings || {}
    );

    const {username, role} = useAppSelector(({user}) => user?.userData || {} as UserData);
    const {t} = useTranslation('common');
    const dispatch = useAppDispatch()

    return (
        <AuthenticationLoggedInItemsStyledDiv className={'authentication-logged-in'}>

            <div className={'user-info'}>
                <Link href={`/profile`} onClick={onOpenCloseHandler}>
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
                        <p className={'text-data'}>{t<string>(`Messages`)}</p>
                    </Link>
                }
                {role === 'administrator' && <AuthenticationAdminItems/>}
                <span className='logged-item logged-in sign-out' onClick={(e) => {
                    //@ts-ignore
                    dispatch(userLogout(null))
                    dispatch(loginRegisterForm(false))
                    onOpenCloseHandler(e)
                }}>
                        <div className={'icon-wrapper'}>
                             <FontAwesomeIcon icon={faSignOut} style={{width: 20, height: 20}}/>
                        </div>
                        <p className={'text-data'}>{t<string>(`Logout`)}</p>
                    </span>

            </div>

        </AuthenticationLoggedInItemsStyledDiv>
    )
};
export default AuthenticationLoggedInItems