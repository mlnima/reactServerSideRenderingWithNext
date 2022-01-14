import React, {useState} from 'react';
import dynamic from "next/dynamic";
import {useSelector} from 'react-redux';
import styled from "styled-components";
const AuthenticationSlideItems = dynamic(() => import('././AuthenticationSlideItems/AuthenticationSlideItems'), {ssr: false});


const AuthenticationStyledDiv = styled.div`

  .logged-in-items-profile-image {
    width: 30px;
    height: 30px;

    svg, img {
      width: 30px;
      height: 30px;
      color: var(--navigation-text-color, #ccc);
    }

    img {
      border-radius: 50%;
    }
  }

  .auth-buttons-content {
    position: fixed;
    right: 0;
    top: 0;
    transition: all 0.5s ease 0s;
    display: ${props => props?.open ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    padding: 10px;
    height: 100vh;
    z-index: 1000;
    background-color: var(--navigation-background-color, #18181b);
    width: 90%;

    ${props => props.open ? `animation: userMenuSlide .3s linear alternate;` : `animation: none;`}
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
        margin: 5px;
        width: 100%;
        padding: 6px 12px;
        font-size: 14px;
        text-align: left;
        display: flex;
        align-items: center;

        svg {
          width: 20px;
          height: 20px;
          padding: 6px 12px;
        }
      }
    }

    .btn-transparent-light {
      padding: 6px 12px;
      width: 100%;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    .logged-in-items-profile-image {
      cursor: pointer;
    }

    .auth-buttons-content {
      width: 200px;
    }
  }
`

const Authentication = () => {

    const profileImage = useSelector(store => store?.user?.userData?.profileImage)
    const [open, setOpen] = useState(false)

    const onOpenCloseHandler = () => {
        open ? setOpen(false) : setOpen(true)
    }

    return (
        <AuthenticationStyledDiv className='auth-buttons' open={open}>
            {profileImage ?
                <div className='logged-in-items-profile-image'>
                    <img src={profileImage} alt={'profile image'} onClick={onOpenCloseHandler}/>
                </div>
                :
                <div className='logged-in-items-profile-image'>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         onClick={onOpenCloseHandler}
                         width="20"
                         height="20"
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke="#ddd"
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </div>

            }
            {open ? <AuthenticationSlideItems onOpenCloseHandler={onOpenCloseHandler}/> : null}
        </AuthenticationStyledDiv>
    );
};

export default Authentication;
