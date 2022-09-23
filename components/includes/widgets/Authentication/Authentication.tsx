import React, {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import styled from "styled-components";
import dynamic from "next/dynamic";
import AuthenticationNotLoggedInItems from "@components/includes/widgets/Authentication/AuthenticationNotLoggedInItems";
import {useAppDispatch} from "@store_toolkit/hooks";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const AuthenticationLoggedInItems = dynamic(() =>
        import('@components/includes/widgets/Authentication/AuthenticationLoggedInItems'),
    {loading: () => <p>Signing in...</p>}
)


const AuthenticationStyledDiv = styled.div`

  .icon {
    background-color: var(--auth-widget-text-color, #fff);
  }

  .profile {
    mask: url('/public/asset/images/icons/user-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/user-solid.svg') no-repeat center;
  }


  .profile-icon {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2px;
    margin: auto;
    cursor: pointer;

    .profile-button-icon {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    .profile-button-image {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }

  .authentication-widget-wrapper {
  
    padding: 5px 0;
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
      padding: 6px 12px;
      margin-bottom: 20px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .logged-items-auth-actions {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
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

          .icon {
            position: relative;
            width: 50%;
            height: 50%;
            margin: 0;
          }
        }

        .text-data {
          width: 100%;
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
`

const Authentication: FC = () => {
    const dispatch = useAppDispatch()
    const {profileImage, loggedIn, username, allowUserToPost, membership} = useSelector(({
                                                                                             user,
                                                                                             settings
                                                                                         }: Store) => {
        return {
            profileImage: user?.userData?.profileImage,
            loggedIn: user?.loggedIn,
            username: user?.userData?.username,
            allowUserToPost: settings?.identity?.allowUserToPost,
            membership: settings?.identity?.membership,
        }
    })

    const [open, setOpen] = useState(null)

    const onOpenCloseHandler = () => {
        // dispatch(setAlert({message: 'you can not use this username', type: 'error', active: true}))
        setOpen(!open)
    }

    return (
        <AuthenticationStyledDiv open={open}>
            <div className='profile-icon' onClick={onOpenCloseHandler}>
                {profileImage ?
                    <img className={'profile-button-image'} src={profileImage} alt={'profile image'}/> :
                    <span className={'profile-button-icon profile icon'}/>
                }
            </div>
            <div className={'authentication-widget-wrapper'}>
                <button className={'logged-item btn btn-transparent-light close-btn'} onClick={onOpenCloseHandler}>
                    <SvgRenderer svgUrl={'/public/asset/images/icons/times-solid.svg'}
                                 size={24}
                                 customClassName={'close icon'}
                                 color={' var(--auth-widget-text-color, #fff)'}
                    />
                </button>
                {!loggedIn && <AuthenticationNotLoggedInItems onOpenCloseHandler={onOpenCloseHandler}/>}
                {loggedIn && <AuthenticationLoggedInItems onOpenCloseHandler={onOpenCloseHandler}
                                                          profileImage={profileImage}
                                                          username={username}
                                                          allowUserToPost={allowUserToPost}
                                                          membership={membership}/>}
            </div>


        </AuthenticationStyledDiv>
    )
};

export default Authentication;
