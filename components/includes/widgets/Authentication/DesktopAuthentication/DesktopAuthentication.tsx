import React, {FC} from "react";
import {useTranslation} from "next-i18next";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../../../../_variables/TypeScriptTypes/GlobalTypes";
import {useRouter} from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
const LoggedOutItemsMenu = dynamic(() => import('../LoggedOutItemsMenu/LoggedOutItemsMenu'), {ssr: false});
const LoggedInItemsForMenu = dynamic(() => import('../LoggedInItemsForMenu/LoggedInItemsForMenu'), {ssr: false});
import styled from "styled-components";
const DesktopAuthenticationItemsStyledDiv = styled.div`

`

interface DesktopAuthenticationItemsPropTypes {
}

const DesktopAuthentication: FC<DesktopAuthenticationItemsPropTypes> = (props) => {
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
