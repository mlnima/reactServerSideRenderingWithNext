//AuthenticationSlideItems
import React from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import {StoreTypes} from "../../../../../_variables/TypeScriptTypes/GlobalTypes";
import {withTranslation} from "next-i18next";
const LoggedOutItemsMenu = dynamic(() => import('../LoggedOutItemsMenu/LoggedOutItemsMenu'), {ssr: false});
const LoggedInItemsForMenu = dynamic(() => import('../LoggedInItemsForMenu/LoggedInItemsForMenu'), {ssr: false});

import styled from "styled-components";
const AuthenticationSlideItemsStyledDiv = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  transition: all 0.5s ease 0s;
  display: ${({open}: { open: boolean }) => open ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  padding: 10px;
  height: 100vh;
  z-index: 1000;
  background-color: var(--navigation-background-color, #18181b);
  width: 90%;
  ${({open}: { open: boolean }) => open ? `animation: userMenuSlide .3s linear alternate;` : `animation: none;`}

  .logged-item {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    .icon{
      width: 24px;
      height: 24px;
      background-color: var(--navigation-text-color, #ccc);
      margin-right: 5px;
    }
    .my-profile{
      mask: url('/public/asset/images/icons/user-solid.svg') no-repeat center;
      -webkit-mask: url('/public/asset/images/icons/user-solid.svg') no-repeat center;
    }
    .add-new-Post{
      mask: url('/public/asset/images/icons/plus-solid.svg') no-repeat center;
      -webkit-mask: url('/public/asset/images/icons/plus-solid.svg') no-repeat center;
    }
    .messages{
      mask: url('/public/asset/images/icons/envelope-solid.svg') no-repeat center;
      -webkit-mask: url('/public/asset/images/icons/envelope-solid.svg') no-repeat center;
    }
    .sign-out{
      mask: url('/public/asset/images/icons/sign-out-alt-solid.svg') no-repeat center;
      -webkit-mask: url('/public/asset/images/icons/sign-out-alt-solid.svg') no-repeat center;
    }
    .sign-in{
      mask: url('/public/asset/images/icons/sign-in-alt-solid.svg') no-repeat center;
      -webkit-mask: url('/public/asset/images/icons/sign-in-alt-solid.svg') no-repeat center;
    }
    .close{
      mask: url('/public/asset/images/icons/times-solid.svg') no-repeat center;
      -webkit-mask: url('/public/asset/images/icons/times-solid.svg') no-repeat center;
    }
    .home{
      mask: url('/public/asset/images/icons/home-solid.svg') no-repeat center;
      -webkit-mask: url('/public/asset/images/icons/home-solid.svg') no-repeat center;
    }
    
  }

  .close-btn {
    display: flex;

    &:active {
      filter: invert(70%);
    }

    svg {
      justify-self: flex-start;
    }
  }

  .auth-buttons-content-items {
    position: relative;
    background-color: var(--navigation-background-color, #18181b);
    width: 100%;

    .btn-transparent-light {
      background: linear-gradient(180deg, rgba(41, 41, 41, .5) .12%, rgba(30, 30, 30, .5) 100%);
      font-size: 14px;
      width: 100%;
    }
  }

  .close-btn {
    padding: 6px 12px;
    margin-bottom: 20px;
    width: 100%;
  }

  @media only screen and (min-width: 768px){
    width: 200px;
  }
`
interface ComponentPropTypes {
    onOpenCloseHandler:any,
    open:boolean,
    t:any
}

const AuthenticationSlideItems = ({onOpenCloseHandler,t,open}: ComponentPropTypes) => {
    const user = useSelector((store : StoreTypes) => store?.user)
    const router = useRouter()
    return (
        <AuthenticationSlideItemsStyledDiv open={open} className='auth-buttons-content'>
            <button className={'logged-item btn btn-transparent-light close-btn'} onClick={onOpenCloseHandler}>
                <span className={'close icon'}/>
            </button>
            <div className='auth-buttons-content-items'>

                {router.pathname.includes('/messenger') || router.pathname.includes('/chatroom')?
                    <Link href={`/`}>
                        <a rel='next' className='logged-item btn btn-transparent-light'>
                            <span className={'home icon'}/>
                            {t(`common:Home`)}
                        </a>
                    </Link>
                    :null
                }

                {user.loggedIn && open ? <LoggedInItemsForMenu  /> :
                    !user.loggedIn && open ?  <LoggedOutItemsMenu  />:
                        null
                }
            </div>

        </AuthenticationSlideItemsStyledDiv>
    )
};
export default withTranslation(['common'])(AuthenticationSlideItems)
