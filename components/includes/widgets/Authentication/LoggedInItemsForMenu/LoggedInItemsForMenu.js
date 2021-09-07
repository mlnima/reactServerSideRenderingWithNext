import React, {useContext} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import Link from "next/link";
import {withTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

const LoggedInItemsForMenu = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    if (contextData.userData.username && contextData.userData.username !== 'guest') {
        return (
            <div className='logged-in-items'>
                {
                    router.asPath.includes('/chatroom/') || router.asPath.includes('/messenger') ?
                        <Link href={`/`}>
                            <a rel='next' className='logged-in-item'>
                                <FontAwesomeIcon style={{width: '20px', height: '20px', color: 'var(--navigation-text-color)'}} icon={faHome}/>
                            </a>
                        </Link>
                        : null
                }

                {contextData.siteIdentity.membership ?
                    <>
                        <Link href={`/profile`}>
                            <a rel='next' className='logged-in-item'>

                                {props.t(`common:Profile`)}
                            </a>
                        </Link>

                        <Link href={`/messenger`}>
                            <a rel='next' className='logged-in-item'>
                                {props.t(`common:Messages`)}
                            </a>
                        </Link>
                    </>
                    : null
                }

                <p className='logged-in-item' onClick={() => contextData.functions.logOutUser()}>

                    {props.t(`common:Logout`)}
                </p>
            </div>
        )
    } else return null
};
export default withTranslation(['common'])(LoggedInItemsForMenu);
