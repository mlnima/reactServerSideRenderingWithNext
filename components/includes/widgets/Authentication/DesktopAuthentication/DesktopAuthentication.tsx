import React, {FC} from "react";
import {useTranslation} from "next-i18next";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {useRouter} from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
const LoggedOutItemsMenu = dynamic(() => import('../LoggedOutItemsMenu/LoggedOutItemsMenu'), {ssr: false});
const LoggedInItemsForMenu = dynamic(() => import('../LoggedInItemsForMenu/LoggedInItemsForMenu'), {ssr: false});
import styled from "styled-components";
const DesktopAuthenticationItemsStyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  a,span{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    width: 24px !important;
    height: 24px !important;
    background-color: var(--navigation-text-color, #ccc);
    margin-right: 5px;
  }

  .my-profile {
    mask: url('/public/asset/images/icons/user-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/user-solid.svg') no-repeat center;
  }

  .add-new-Post {
    mask: url('/public/asset/images/icons/plus-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/plus-solid.svg') no-repeat center;
  }

  .messages {
    mask: url('/public/asset/images/icons/envelope-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/envelope-solid.svg') no-repeat center;
  }

  .sign-out {
    mask: url('/public/asset/images/icons/sign-out-alt-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/sign-out-alt-solid.svg') no-repeat center;
  }

  .sign-in {
    mask: url('/public/asset/images/icons/sign-in-alt-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/sign-in-alt-solid.svg') no-repeat center;
  }

  .close {
    mask: url('/public/asset/images/icons/times-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/times-solid.svg') no-repeat center;
  }

  .home {
    mask: url('/public/asset/images/icons/home-solid.svg') no-repeat center;
    -webkit-mask: url('/public/asset/images/icons/home-solid.svg') no-repeat center;
  }
`

const DesktopAuthentication: FC = () => {
    const {t} = useTranslation('common');
    const user = useSelector((store : StoreTypes) => store?.user)
    const router = useRouter()
    return (
        <DesktopAuthenticationItemsStyledDiv>
            {router.pathname.includes('/messenger') || router.pathname.includes('/chatroom')?
                <Link href={`/`}>
                    <a rel='next' className='logged-item btn btn-transparent-light'>
                        <span className={'home icon'}/>
                        {t(`Home`)}
                    </a>
                </Link>
                :null
            }

            {user.loggedIn && open ? <LoggedInItemsForMenu  /> :
                !user.loggedIn && open ?  <LoggedOutItemsMenu  />:
                    null
            }
        </DesktopAuthenticationItemsStyledDiv>
    )
};
export default DesktopAuthentication
