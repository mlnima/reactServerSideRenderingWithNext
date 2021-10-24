import React, {useState} from 'react';
import LoggedOutItemsMenu from "./LoggedOutItemsMenu/LoggedOutItemsMenu";
import LoggedInItemsForMenu from "./LoggedInItemsForMenu/LoggedInItemsForMenu";
import {useSelector} from 'react-redux';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faUserCircle} from "@fortawesome/free-solid-svg-icons";

const AuthenticationStyledDiv = styled.div`

  .logged-in-items-profile-image {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    svg {
      width: 24px;
      height: 24px;
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

const Authentication = () => {
    const user = useSelector(state => state?.user)
    const [open, setOpen] = useState(false)

    const onOpenCloseHandler = ()=>{
        open ? setOpen(false) : setOpen(true)
    }
    return (

        <AuthenticationStyledDiv className='auth-buttons' open={open}>
            {user?.userData?.profileImage ?
                <img className='logged-in-items-profile-image' src={user?.userData.profileImage} alt={'profile image'} onClick={onOpenCloseHandler}/> :
                <FontAwesomeIcon icon={faUserCircle} className='logged-in-items-profile-image'  onClick={onOpenCloseHandler}/>
            }
            <div className='auth-buttons-content'>
                <button className={'btn btn-transparent-light close-btn'} onClick={onOpenCloseHandler}>
                    <FontAwesomeIcon  icon={faTimes} />
                </button>
                {user.loggedIn ? <LoggedInItemsForMenu open={open} position='topBar'/> : <LoggedOutItemsMenu open={open}  position='topBar'/>}
            </div>


        </AuthenticationStyledDiv>

    );
};

export default Authentication;
