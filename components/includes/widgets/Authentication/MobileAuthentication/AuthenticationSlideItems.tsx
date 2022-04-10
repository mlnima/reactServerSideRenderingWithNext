import React from "react";
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import styled from "styled-components";

const LoggedOutItemsMobile = dynamic(
    () => import('@components/includes/widgets/Authentication/MobileAuthentication/LoggedOutItemsMobile'));
const LoggedInItemsMobile = dynamic(
    () => import('@components/includes/widgets/Authentication/MobileAuthentication/LoggedInItemsMobile'), {ssr: false});

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
  background-color: var(--auth-widget-mobile-background-color, #000);
  width: 85%;
  ${({open}: { open: boolean }) => open ? `animation: userMenuSlide .3s linear alternate;` : `animation: none;`}
  
    .icon {
      width: 24px;
      height: 24px;
      background-color: var(--auth-widget-text-color, #fff);
      margin-right: 5px;
    }

    .close {
      mask: url('/public/asset/images/icons/times-solid.svg') no-repeat center;
      -webkit-mask: url('/public/asset/images/icons/times-solid.svg') no-repeat center;
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
     width: 100%;
  }

  .close-btn {
    padding: 6px 12px;
    margin-bottom: 20px;
    width: 100%;
  }
  
`

interface ComponentPropTypes {
    onOpenCloseHandler: any,
    open: boolean,
}

const AuthenticationSlideItems = ({onOpenCloseHandler, open}: ComponentPropTypes) => {

    const user = useSelector((store: StoreTypes) => store?.user)

    return (
        <AuthenticationSlideItemsStyledDiv open={open} className='auth-buttons-content'>
            <button className={'logged-item btn btn-transparent-light close-btn'} onClick={onOpenCloseHandler}>
                <span className={'close icon'}/>
            </button>
            <div className='auth-buttons-content-items'>
                {
                    user.loggedIn && open ? <LoggedInItemsMobile onOpenCloseHandler={onOpenCloseHandler}/> :
                    !user.loggedIn && open ? <LoggedOutItemsMobile onOpenCloseHandler={onOpenCloseHandler}/> :
                    null
                }
            </div>

        </AuthenticationSlideItemsStyledDiv>
    )
};
export default AuthenticationSlideItems;

