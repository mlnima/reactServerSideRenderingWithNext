import React, {FC} from "react";
import {useTranslation} from "next-i18next";
import {useDispatch} from "react-redux";
import {setLoginRegisterFormStatus} from "@store/clientActions/globalStateActions";

import styled from "styled-components";
import {useRouter} from "next/router";
import Link from "next/link";

const LoggedOutItemsMobileStyledDiv = styled.div`
  padding: 30px 0;
  position: relative;
  width: 100%;
  height: 100px;
  font-size: 1em;

  .icon {
    position: relative;
    width: 50%;
    height: 50%;
    background-color: var(--auth-widget-text-color, #fff);
    margin: 0;
  }


  .logged-items-auth-actions {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .logged-item {
      width: 60px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;
      font-size: 1em;

      .icon-wrapper {
        background-color: var(--auth-widget-mobile-items-background-color, #222);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .register-button {
          mask: url('/public/asset/images/icons/pen-solid.svg') no-repeat center;
          -webkit-mask: url('/public/asset/images/icons/pen-solid.svg') no-repeat center;
        }

        .sign-in-button {
          mask: url('/public/asset/images/icons/user-solid.svg') no-repeat center;
          -webkit-mask: url('/public/asset/images/icons/user-solid.svg') no-repeat center;
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
      }
    }
  }

`

interface LoggedOutItemsMobilePropTypes {
    onOpenCloseHandler: React.MouseEventHandler<any>
}

const LoggedOutItemsMobile: FC<LoggedOutItemsMobilePropTypes> = ({onOpenCloseHandler}) => {
    const {t} = useTranslation('common');
    const {pathname} = useRouter()
    const dispatch = useDispatch()

    return (
        <LoggedOutItemsMobileStyledDiv>
            <div className={'logged-items-auth-actions'}>
               <span onClick={(e) => {
                   dispatch(setLoginRegisterFormStatus('login'))
                   onOpenCloseHandler(e)
               }}
                     className='logged-item logged-item-action'
                     aria-label='logged-out-items'>
                    <div className={'icon-wrapper'}>
                           <span className={'sign-in-button icon'}/>
                    </div>
                    <p className={'text-data'}>{t(`Login`)}</p>
                </span>
                <span className='logged-item logged-item-action'
                      onClick={(e) => {
                          dispatch(setLoginRegisterFormStatus('register'))
                          onOpenCloseHandler(e)

                      }}
                      aria-label='logged-out-items'
                >
                    <div className={'icon-wrapper'}>
                        <span className={'register-button icon'}/>
                    </div>
                    <p className={'text-data'}>{t(`Register`)}</p>
                </span>
            </div>

            <div className={'logged-items'}>
                {pathname.includes('/messenger') || pathname.includes('/chatroom') ?
                    <Link href={`/`}>
                        <a className='logged-item logged-out' onClick={onOpenCloseHandler}>
                            <div className={'icon-wrapper'}>
                                <span className={'home-button icon'}/>
                            </div>
                            <p className={'text-data'}>{t(`Home`)}</p>
                        </a>
                    </Link>
                    : null
                }
            </div>

        </LoggedOutItemsMobileStyledDiv>
    )
};
export default LoggedOutItemsMobile
