import React, {FC} from "react";
import styled from "styled-components";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {userLogout} from "@store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

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
          margin: 5px 10px;
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
        const dispatch = useAppDispatch()
//    <span className={'user-info-profile-button-icon'}/>
        return (
            <AuthenticationLoggedInItemsStyledDiv className={'authentication-logged-in'}>

                <div className={'user-info'}>
                    <Link href={`/profile`}>
                        <a onClick={onOpenCloseHandler}>
                            <div className='user-info-profile-icon'>
                                {profileImage ?
                                    <img className={'user-info-profile-button-image'} src={profileImage}
                                         alt={'profile image'}/> :
                                    <SvgRenderer svgUrl={'/public/asset/images/icons/user-solid.svg'}
                                                 size={48}
                                                 customClassName={'user-info-profile-button-icon'}
                                                 color={' var(--auth-widget-text-color, #fff)'}
                                    />
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
                                              <SvgRenderer svgUrl={'/public/asset/images/icons/envelope-solid.svg'}
                                                           size={48}
                                                           customClassName={'messages-button'}
                                                           color={' var(--auth-widget-text-color, #fff)'}
                                              />
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
                                            {/*<span className={'plus-button icon'}/>*/}
                                            <SvgRenderer svgUrl={'/public/asset/images/icons/plus-solid.svg'}
                                                         size={48}
                                                         customClassName={'plus-button'}
                                                         color={' var(--auth-widget-text-color, #fff)'}
                                            />
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
                                    <SvgRenderer svgUrl={'/public/asset/images/icons/home-solid.svg'}
                                                 size={20}
                                                 customClassName={'home-button'}
                                                 color={' var(--auth-widget-text-color, #fff)'}
                                    />
                                </div>
                                <p className={'text-data'}>{t<string>(`Home`)}</p>
                            </a>
                        </Link>
                        : null
                    }

                    <span className='logged-item logged-in' onClick={(e) => {
                        dispatch(userLogout(null))
                        dispatch(loginRegisterForm(false))
                        onOpenCloseHandler(e)
                    }}>
                        <div className={'icon-wrapper'}>
                                    <SvgRenderer svgUrl={'/public/asset/images/icons/sign-out-alt-solid.svg'}
                                                 size={20}
                                                 customClassName={'sign-out-button'}
                                                 color={' var(--auth-widget-text-color, #fff)'}
                                    />
                        </div>
                        <p className={'text-data'}>{t<string>(`Logout`)}</p>
                    </span>

                </div>

            </AuthenticationLoggedInItemsStyledDiv>
        )
    };
export default AuthenticationLoggedInItems
