import React, {FC} from "react";
import styled from "styled-components";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {setLoginRegisterFormStatus} from "../../../../ZlegacyCodesAndComponents/store/clientActions/globalStateActions";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {userLogout} from "@store_toolkit/clientReducers/userReducer";

const AuthenticationLoggedInItemsStyledDiv = styled.div`
  .user-info {
    a {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: var(--auth-widget-text-color, #fff);
      width: 100%;

      .user-info-profile-icon {
        display: flex;
        justify-content: center;
        align-items: center;

        .user-info-profile-button-image {
          border-radius: 50%;
          margin: 5px 10px;
          width: 48px;
          height: 48px;
        }

        .user-info-profile-button-icon {
          width: 48px;
          height: 48px;
          margin: 5px 10px;
          background-color: var(--navigation-text-color, #ccc);
          mask: url('/public/asset/images/icons/user-solid.svg') no-repeat center;
          -webkit-mask: url('/public/asset/images/icons/user-solid.svg') no-repeat center;
          cursor: pointer;
        }
      }

      .username-info {
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
}

const AuthenticationLoggedInItems: FC<AuthenticationLoggedInItemsPropTypes> =
    ({
         onOpenCloseHandler,
         profileImage,
         membership,
         allowUserToPost,
         username
     }) => {
        const {t} = useTranslation('common');
        const {pathname} = useRouter()
        const dispatch = useDispatch()

        return (
            <AuthenticationLoggedInItemsStyledDiv className={'authentication-logged-in'}>

                <div className={'user-info'}>
                    <Link href={`/profile`}>
                        <a onClick={onOpenCloseHandler}>
                            <div className='user-info-profile-icon'>
                                {profileImage ?
                                    <img className={'user-info-profile-button-image'} src={profileImage}
                                         alt={'profile image'}/> :
                                    <span className={'user-info-profile-button-icon'}/>
                                }
                                {/*<span className={'user-info-profile-button-icon'}/>*/}
                            </div>
                            <div className={'username-info'}>
                                <span className={'username'}>{username}</span>
                                <span className={'view-profile'}>View Profile</span>
                            </div>
                        </a>
                    </Link>
                </div>

                <div className={'logged-items-auth-actions'}>
                    {membership &&
                    <>
                       <span className='logged-item logged-item-action' aria-label='logged-in-items'>
                            <Link href={`/messenger`}>
                                <a onClick={onOpenCloseHandler}>

                                        <div className={'icon-wrapper'}>
                                              <span className={'messages-button icon'}/>
                                        </div>
                                        <p className={'text-data'}>{t<string>(`Messages`)}</p>

                                </a>
                            </Link>
                        </span>


                        {allowUserToPost &&
                            <span className='logged-item logged-item-action' aria-label='logged-in-items'>
                                <Link href={`/profile/posts/newPost?postType=article`}>
                                    <a onClick={onOpenCloseHandler}>

                                        <div className={'icon-wrapper'}>
                                            <span className={'plus-button icon'}/>
                                        </div>

                                        <p className={'text-data'}>{t<string>(`New Post`)}</p>

                                    </a>
                                </Link>
                            </span>
                        }

                    </>
                    }
                </div>

                <div className={'logged-items'}>
                    {pathname.includes('/messenger') || pathname.includes('/chatroom') ?
                        <Link href={`/`}>
                            <a className='logged-item logged-in' onClick={onOpenCloseHandler}>
                                <div className={'icon-wrapper'}>
                                    <span className={'home-button icon'}/>
                                </div>
                                <p className={'text-data'}>{t<string>(`Home`)}</p>
                            </a>
                        </Link>
                        : null
                    }

                    <span className='logged-item logged-in' onClick={(e) => {
                        dispatch(userLogout(null))
                        dispatch(setLoginRegisterFormStatus(false))
                        onOpenCloseHandler(e)
                    }}>
                        <div className={'icon-wrapper'}>
                           <span className={'sign-out-button icon'}/>
                        </div>
                        <p className={'text-data'}>{t<string>(`Logout`)}</p>
                    </span>

                </div>

            </AuthenticationLoggedInItemsStyledDiv>
        )
    };
export default AuthenticationLoggedInItems
