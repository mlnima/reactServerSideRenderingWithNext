//AuthenticationSlideItems
import React from "react";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faTimes} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import {StoreTypes} from "../../../../../_variables/TypeScriptTypes/GlobalTypes";
import {withTranslation} from "next-i18next";
const LoggedOutItemsMenu = dynamic(() => import('../LoggedOutItemsMenu/LoggedOutItemsMenu'), {ssr: false});
const LoggedInItemsForMenu = dynamic(() => import('../LoggedInItemsForMenu/LoggedInItemsForMenu'), {ssr: false});

interface ComponentPropTypes {
    onOpenCloseHandler:any,
    t:any
}

const AuthenticationSlideItems = ({onOpenCloseHandler,t}: ComponentPropTypes) => {
    const user = useSelector((store : StoreTypes) => store?.user)
    const router = useRouter()
    return (
        <div className='auth-buttons-content'>
            <button className={'btn btn-transparent-light close-btn'} onClick={onOpenCloseHandler}>
                <FontAwesomeIcon  icon={faTimes} />
            </button>
            <div className='auth-buttons-content-items'>
                {router.pathname.includes('/messenger') || router.pathname.includes('/chatroom')?

                    <Link href={`/`}>
                        <a rel='next' className='logged-in-item btn btn-transparent-light'>
                            <FontAwesomeIcon  icon={faHome} />
                            {t(`common:Home`)}
                        </a>
                    </Link>

                    :null
                }
                {user.loggedIn && open ? <LoggedInItemsForMenu open={open} position='topBar'/> :
                    !user.loggedIn && open ?  <LoggedOutItemsMenu open={open}  position='topBar'/>:
                        null
                }
            </div>

        </div>
    )
};
export default withTranslation(['common'])(AuthenticationSlideItems)
