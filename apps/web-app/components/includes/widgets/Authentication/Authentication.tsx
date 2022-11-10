import React, {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import styled from "styled-components";
import dynamic from "next/dynamic";
import AuthenticationNotLoggedInItems from "./AuthenticationNotLoggedInItems";
import SvgRenderer from "../../../global/commonComponents/SvgRenderer/SvgRenderer";
import {Store} from "typescript-types";
import UserProfileImage from "../../UserProfileImage/UserProfileImage";

const AuthenticationLoggedInItems = dynamic(() =>
        import('./AuthenticationLoggedInItems'),
    {loading: () => <p>Signing in...</p>}
)

const AuthenticationStyledDiv = styled.div`

  .icon {
    background-color: var(--auth-widget-text-color, #fff);
  }
  
  .authentication-widget-wrapper {
    border-left: var(--default-border);
    padding: 10px;
    box-sizing: border-box;
    position: fixed;
    right: 0;
    top: 0;
    background: var(--auth-widget-background, #000);
    width: 85%;
    z-index: 12;
    height: 100vh;
    display: ${({open}: { open: boolean }) => open ? 'flex' : 'none'};
    flex-direction: column;
    animation: ${({open}: { open: boolean }) => open ? 'userMenuSlide .3s linear alternate' : 'none'};

    .close-btn {
      padding: 6px 0;
      margin-bottom: 20px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .logged-items-auth-actions {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .logged-item {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;

        a {
          color: var(--auth-widget-text-color, #fff);
        }

        .icon-wrapper {
          background-color: var(--auth-widget-mobile-items-background-color, #222);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          .icon {
            position: relative;
            width: 50%;
            height: 50%;
            margin: 0;
          }
        }

        .text-data {
          width: 100%;
          text-align: center;
        }
      }
    }

    .logged-items {
      .logged-item {
        position: relative;
        width: 100%;
        height: auto;
        min-height: 52px;
        //padding: 13px 0 13px 17px;
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
        }
      }
    }

  }

  @media only screen and (min-width: 768px) {
    .authentication-widget-wrapper {
      width: 300px;
    }
  }
`

const Authentication: FC = () => {

    const {
        profileImage,
        loggedIn,
        username,
        allowUserToPost,
        membership,
        allowedPostTypeUserCanCreate,
    } = useSelector(({user, settings}: Store) => {
        return {
            profileImage: user?.userData?.profileImage,
            loggedIn: user?.loggedIn,
            username: user?.userData?.username,
            allowUserToPost: settings?.membershipSettings?.allowUserToPost,
            membership: settings?.membershipSettings?.membership,
            allowedPostTypeUserCanCreate:settings?.membershipSettings?.allowedPostTypeUserCanCreate
        }
    })

    const [open, setOpen] = useState(null)

    const onOpenCloseHandler = () => {
        setOpen(!open)
    }

    return (
        <AuthenticationStyledDiv open={open}>
            <div className='profile-icon' onClick={onOpenCloseHandler}>
                <UserProfileImage size={30}/>
            </div>
            <div className={'authentication-widget-wrapper'}>
                <button className={'logged-item btn btn-transparent-light close-btn'} onClick={onOpenCloseHandler}>
                    <SvgRenderer svgUrl={'/asset/images/icons/times-solid.svg'}
                                 size={24}
                                 customClassName={'close icon'}
                                 color={' var(--auth-widget-text-color, #fff)'}
                    />
                </button>
                {!loggedIn && <AuthenticationNotLoggedInItems onOpenCloseHandler={onOpenCloseHandler}/>}
                {loggedIn && <AuthenticationLoggedInItems onOpenCloseHandler={onOpenCloseHandler}
                                                          allowedPostTypeUserCanCreate={allowedPostTypeUserCanCreate}
                                                          profileImage={profileImage}
                                                          username={username}
                                                          allowUserToPost={allowUserToPost}
                                                          membership={membership}/>}
            </div>


        </AuthenticationStyledDiv>
    )
};

export default Authentication;
