import React, {FC} from "react";
import styled from "styled-components";
import Link from "next/link";
import useTranslation from 'next-translate/useTranslation'
import {useRouter} from "next/router";
import {userLogout} from "../../../../store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "../../../../store_toolkit/hooks";
import {loginRegisterForm} from "../../../../store_toolkit/clientReducers/globalStateReducer";
import SvgRenderer from "../../../global/commonComponents/SvgRenderer/SvgRenderer";
import UserProfileImage from "../../UserProfileImage/UserProfileImage";

const AuthenticationLoggedInItemsStyledDiv = styled.div`
  .user-info {
    a {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: var(--auth-widget-text-color, #fff);
      width: 100%;
      .user-profile-image{
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
    allowedPostTypeUserCanCreate: string[],
}

const AuthenticationLoggedInItems: FC<AuthenticationLoggedInItemsPropTypes> =
    ({
         onOpenCloseHandler,
         membership,
         allowUserToPost,
         username,
         allowedPostTypeUserCanCreate
     }) => {
        const {t} = useTranslation('common');
        const {pathname} = useRouter()
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

                <div className={'logged-items-auth-actions'}>
                    {membership &&
                    <>
                       <span className='logged-item logged-item-action' aria-label='logged-in-items'>
                            <Link href={`/messenger`} onClick={onOpenCloseHandler}>

                                        <div className={'icon-wrapper'}>
                                              <SvgRenderer svgUrl={'/public/asset/images/icons/envelope-solid.svg'}
                                                           size={48}
                                                           customClassName={'messages-button'}
                                                           color={' var(--auth-widget-text-color, #fff)'}
                                              />
                                        </div>
                                        <p className={'text-data'}>{t<string>(`Messages`)}</p>


                            </Link>
                        </span>


                        {allowUserToPost &&
                        <span className='logged-item logged-item-action' aria-label='logged-in-items'>
                                <Link href={`/profile/post?new=1&postType=article`}  onClick={onOpenCloseHandler}>

                                        <div className={'icon-wrapper'}>
                                            {/*<span className={'plus-button icon'}/>*/}
                                            <SvgRenderer svgUrl={'/public/asset/images/icons/plus-solid.svg'}
                                                         size={48}
                                                         customClassName={'plus-button'}
                                                         color={' var(--auth-widget-text-color, #fff)'}
                                            />
                                        </div>

                                        <p className={'text-data'}>{t<string>(`New Post`)}</p>

                                </Link>
                            </span>
                        }

                    </>
                    }
                </div>

                <div className={'logged-items'}>
                    {pathname.includes('/messenger') || pathname.includes('/chatroom') ?
                        <Link href={`/`} className='logged-item logged-in' onClick={onOpenCloseHandler}>

                                <div className={'icon-wrapper'}>
                                    <SvgRenderer svgUrl={'/public/asset/images/icons/home-solid.svg'}
                                                 size={20}
                                                 customClassName={'home-button'}
                                                 color={' var(--auth-widget-text-color, #fff)'}
                                    />
                                </div>
                                <p className={'text-data'}>{t<string>(`Home`)}</p>

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
