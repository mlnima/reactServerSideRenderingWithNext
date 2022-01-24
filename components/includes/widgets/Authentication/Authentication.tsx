import React, {FC, useState} from 'react';
import dynamic from "next/dynamic";
import {useSelector} from 'react-redux';
import styled from "styled-components";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";
const AuthenticationSlideItems = dynamic(() => import('././AuthenticationSlideItems/AuthenticationSlideItems'), {ssr: false});

const AuthenticationStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .profile-button-icon {
    width: 24px;
    height: 24px;
    background-color: var(--navigation-text-color, #ccc);
    mask: url('/public/asset/images/icons/user-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/user-solid.svg') no-repeat center;
    cursor: pointer;
  }

  .profile-button-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  
  @media only screen and (min-width: 768px) {
    .logged-in-items-profile-image {
      cursor: pointer;
    }
  }
`

const Authentication: FC = () => {

    const profileImage = useSelector((store: StoreTypes) => store?.user?.userData?.profileImage)
    const [open, setOpen] = useState(false)

    const onOpenCloseHandler = () => {
        open ? setOpen(false) : setOpen(true)
    }

    return (
        <AuthenticationStyledDiv className='auth-buttons'>
            {profileImage ?
                <img className={'profile-button-image'}
                     src={profileImage} alt={'profile image'}
                     onClick={onOpenCloseHandler}
                /> :
                <span className={'profile-button-icon'}
                      onClick={onOpenCloseHandler}
                />
            }
            {open ?
                <AuthenticationSlideItems open={open}
                                          onOpenCloseHandler={onOpenCloseHandler}
                />
                : null
            }
        </AuthenticationStyledDiv>
    );
};

export default Authentication;
