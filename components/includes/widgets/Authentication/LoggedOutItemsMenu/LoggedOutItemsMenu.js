import React, {useContext} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import {withTranslation} from "next-i18next";
import {useRouter} from "next/router";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";


const LoggedOutItemsMenu = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const onLoginRegisterHandler  = type =>{
        contextData.dispatchState({
            ...contextData.state,
            loginRegisterFormPopup:true,
            loginRegisterFormPopupType:type
        })
    }



    if (!contextData.userData.username || contextData.userData.username === 'guest' ) {
        return (
            <div className='logged-out-items'>
                {
                    router.asPath.includes('/chatroom/') || router.asPath.includes('/messenger') ?
                        <Link href={`/`}>
                            <a rel='next' className='logged-out-item'>
                                <FontAwesomeIcon style={{width: '20px', height: '20px', color: 'var(--navigation-text-color)'}} icon={faHome}/>
                            </a>
                        </Link>
                        : null
                }

                <button onClick={()=>onLoginRegisterHandler('login')} className='logged-out-item ' aria-label='logged-out-items' >
                    {props.t(`common:Login`)}
                </button>
                <button onClick={()=>onLoginRegisterHandler('register')} className='logged-out-item ' aria-label='logged-out-items' >
                    {props.t(`common:Register`)}
                </button>
            </div>
        )
    } else return null

};
export default withTranslation(['common'])(LoggedOutItemsMenu);
