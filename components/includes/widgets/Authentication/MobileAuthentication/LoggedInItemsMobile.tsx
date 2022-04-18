import React, {FC} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
// import {setLoginRegisterFormStatus} from "@store/clientActions/globalStateActions";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {userLogOut} from "@store/clientActions/userActions";
import {setLoginRegisterFormStatus} from "@store/clientActions/globalStateActions";

const LoggedInItemsMobileStyledDiv = styled.div`

  .icon {
    position: relative;
    width: 50%;
    height: 50%;
    background-color: var(--auth-widget-text-color, #fff);
    margin: 0;
  }


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

  .logged-items-auth-actions {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .logged-item {
      margin: 30px 0;
      width: 60px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;
      font-size: 1em;
      color: var(--auth-widget-text-color, #fff);

      .icon-wrapper {
        background-color: var(--auth-widget-mobile-items-background-color, #222);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .messages-button {
          mask: url('/public/asset/images/icons/envelope-solid.svg') no-repeat center;
          -webkit-mask: url('/public/asset/images/icons/envelope-solid.svg') no-repeat center;
        }


        .plus-button {
          mask: url('/public/asset/images/icons/plus-solid.svg') no-repeat center;
          -webkit-mask: url('/public/asset/images/icons/plus-solid.svg') no-repeat center;
        }
      }
    }
  }

  .logged-items {
    .logged-item {
      position: relative;
      width: 100%;
      height: auto;
      min-height: 52px;
      padding: 13px 0 13px 17px;
      font-size: .75rem;
      color: var(--auth-widget-text-color, #fff);
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .icon-wrapper {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .home-button {
          mask: url('/public/asset/images/icons/home-solid.svg') no-repeat center;
          -webkit-mask: url('/public/asset/images/icons/home-solid.svg') no-repeat center;
        }

        .sign-out-button {
          mask: url('/public/asset/images/icons/user-solid.svg') no-repeat center;
          -webkit-mask: url('/public/asset/images/icons/user-solid.svg') no-repeat center;
        }
      }
    }
  }


`

interface LoggedInItemsMobilePropTypes {
    onOpenCloseHandler: React.MouseEventHandler<any>
}

const LoggedInItemsMobile: FC<LoggedInItemsMobilePropTypes> = ({onOpenCloseHandler}) => {
    const {t} = useTranslation('common');
    const {pathname} = useRouter()
    const dispatch = useDispatch()
    const {profileImage, username, allowUserToPost, membership} = useSelector(({user, settings}: StoreTypes) => {
        return {
            profileImage: user?.userData?.profileImage,
            username: user?.userData?.username,
            allowUserToPost: settings?.identity?.allowUserToPost,
            membership: settings?.identity?.membership,
        }
    })

    return (
        <LoggedInItemsMobileStyledDiv>
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
                {membership ?
                    <>
                        <Link href={`/messenger`}>
                            <a onClick={onOpenCloseHandler}>
                                <span className='logged-item logged-item-action' aria-label='logged-in-items'>
                                    <div className={'icon-wrapper'}>
                                <span className={'messages-button icon'}/>
                                </div>
                                    <p className={'text-data'}>{t<string>(`Messages`)}</p>
                                </span>
                            </a>
                        </Link>
                        {allowUserToPost ?
                            <Link href={`/profile/posts/newPost?postType=article`}>
                                <a onClick={onOpenCloseHandler}>
                                    <span className='logged-item logged-item-action' aria-label='logged-in-items'>
                                        <div className={'icon-wrapper'}>
                                    <span className={'plus-button icon'}/>
                                    </div>
                                        <p className={'text-data'}>{t<string>(`New Post`)}</p>
                                    </span>
                                </a>
                            </Link>

                            : null
                        }
                    </>

                    : null

                }


            </div>

            <div className={'logged-items'}>
                {pathname.includes('/messenger') || pathname.includes('/chatroom') ?
                    <Link href={`/`}>
                        <a rel='next' className='logged-item logged-in' onClick={onOpenCloseHandler}>
                            <div className={'icon-wrapper'}>
                                <span className={'home-button icon'}/>
                            </div>
                            <p className={'text-data'}>{t<string>(`Home`)}</p>
                        </a>
                    </Link>
                    : null
                }

                <span className='logged-item logged-in' onClick={(e) => {
                    dispatch(userLogOut())
                    dispatch(setLoginRegisterFormStatus(false))
                    onOpenCloseHandler(e)
                }}>
                        <div className={'icon-wrapper'}>
                           <span className={'sign-out-button icon'}/>
                        </div>
                        <p className={'text-data'}>{t<string>(`Logout`)}</p>
                    </span>

            </div>


        </LoggedInItemsMobileStyledDiv>
    )
};
export default LoggedInItemsMobile


//LoggedOutItemsMobile