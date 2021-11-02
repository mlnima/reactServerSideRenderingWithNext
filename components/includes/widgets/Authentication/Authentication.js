import React, {useState} from 'react';
import LoggedOutItemsMenu from "./LoggedOutItemsMenu/LoggedOutItemsMenu";
import LoggedInItemsForMenu from "./LoggedInItemsForMenu/LoggedInItemsForMenu";
import {useSelector} from 'react-redux';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {faHome, faTimes, faUser, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import {withTranslation} from "next-i18next";

const AuthenticationStyledDiv = styled.div`

  .logged-in-items-profile-image {
    width: 30px;
    height: 30px;
 
    svg,img {
      width: 30px;
      height: 30px;
      color: var(--navigation-text-color,#ccc);
    }
    img{
      border-radius: 50%;
    }
  }

  .auth-buttons-content{
    position: fixed;
    right: 0;
    top:0;
    transition: all 0.5s ease 0s;
    display: ${props=>props?.open ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    padding: 10px;
    height: 100vh;
    z-index: 1000;
    background-color: var(--navigation-background-color,#18181b);
    width: 90%;
    ${props=> props.open ?`animation: userMenuSlide .3s linear alternate;`: `animation: none;` }
    .close-btn{
      display: flex;
      &:active{
        filter: invert(70%);
      }
      svg{
        justify-self: flex-start;
      }
    }

    .auth-buttons-content-items{
      position: relative;
      background-color: var(--navigation-background-color,#18181b);
      width: 100%;
      .btn-transparent-light {
        background: linear-gradient( 180deg,rgba(41,41,41,.5) .12%,rgba(30,30,30,.5) 100%);
        margin:  5px;
        width: 100%;
        padding: 6px 12px;
        font-size: 14px;
        text-align: left;
        display: flex;
        align-items: center;
        svg{
          width: 20px;
          height: 20px;
          padding: 6px 12px;
        }
      }
    }
    
    .btn-transparent-light {
      padding: 6px 12px;
      width: 100%;
      svg{
        width: 24px;
        height: 24px;
      }
    }
  }
  @media only screen and (min-width: 768px) {
    .logged-in-items-profile-image {
      cursor: pointer;
    }
    .auth-buttons-content{
      width: 200px;
    }
  }
`

const Authentication = props => {
    const user = useSelector(store => store?.user)
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const onOpenCloseHandler = ()=>{
        open ? setOpen(false) : setOpen(true)
    }
    return (

        <AuthenticationStyledDiv className='auth-buttons' open={open}>
            {user?.userData?.profileImage ?
                <div className='logged-in-items-profile-image'>
                    <img  src={user?.userData.profileImage} alt={'profile image'} onClick={onOpenCloseHandler}/>
                </div>
                :
                <div className='logged-in-items-profile-image'>
                    <FontAwesomeIcon icon={faUserCircle}   onClick={onOpenCloseHandler}/>
                </div>

            }
            <div className='auth-buttons-content'>
                <button className={'btn btn-transparent-light close-btn'} onClick={onOpenCloseHandler}>
                    <FontAwesomeIcon  icon={faTimes} />
                </button>
                <div className='auth-buttons-content-items'>
                {router.pathname.includes('/messenger') || router.pathname.includes('/chatroom')?

                        <Link href={`/`}>
                            <a rel='next' className='logged-in-item btn btn-transparent-light'>
                                <FontAwesomeIcon  icon={faHome} />
                                {props.t(`common:Home`)}
                            </a>
                        </Link>

                  :null
                }
                    {user.loggedIn ? <LoggedInItemsForMenu open={open} position='topBar'/> : <LoggedOutItemsMenu open={open}  position='topBar'/>}
                </div>

            </div>
        </AuthenticationStyledDiv>
    );
};

export default withTranslation(['common'])(Authentication);
