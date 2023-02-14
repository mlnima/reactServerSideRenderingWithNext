import React, {FC} from "react";
import styled from "styled-components";
import Link from "next/link";
import useTranslation from 'next-translate/useTranslation'
import {useRouter} from "next/router";
import {userLogout} from "@store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import UserProfileImage from "../../UserProfileImage/UserProfileImage";
import AuthenticationAdminItems from "@components/includes/widgets/Authentication/AuthenticationAdminItems";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOut} from "@fortawesome/free-solid-svg-icons/faSignOut";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";

const AuthenticationLoggedInItemsStyledDiv = styled.div`
  .user-info {
    a {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: var(--main-text-color, #fff);
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
    profileImage: string,
    membership: boolean,
    allowUserToPost: boolean,
    username: string,
    role: string,
    allowedPostTypeUserCanCreate: string[],
}

const AuthenticationLoggedInItems: FC<AuthenticationLoggedInItemsPropTypes> =
    ({
         onOpenCloseHandler,
         membership,
         allowUserToPost,
         username,
         role,
         allowedPostTypeUserCanCreate
     }) => {
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
                    {membership && <Link href={`/messenger`}
                                         className='logged-item logged-in'
                                         onClick={onOpenCloseHandler}>
                            <div className={'icon-wrapper'}>
                                <FontAwesomeIcon icon={faEnvelope} style={{width:20,height:20}}/>
                            </div>
                            <p className={'text-data'}>{t<string>(`Messages`)}</p>
                        </Link>}


                    {role === 'administrator' && <AuthenticationAdminItems/>}


                    <span className='logged-item logged-in sign-out' onClick={(e) => {
                        dispatch(userLogout(null))
                        dispatch(loginRegisterForm(false))
                        onOpenCloseHandler(e)
                    }}>
                        <div className={'icon-wrapper'}>
                             <FontAwesomeIcon icon={faSignOut} style={{width:20,height:20}}/>
                        </div>
                        <p className={'text-data'}>{t<string>(`Logout`)}</p>
                    </span>

                </div>

            </AuthenticationLoggedInItemsStyledDiv>
        )
    };
export default AuthenticationLoggedInItems
