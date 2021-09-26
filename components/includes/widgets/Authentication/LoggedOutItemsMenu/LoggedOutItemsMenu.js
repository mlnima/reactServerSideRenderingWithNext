import React from 'react';
import {withTranslation} from "next-i18next";
import {useRouter} from "next/router";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {setLoginRegisterFormStatus} from "../../../../../store/actions/globalStateActions";

const LoggedOutItemsMenu = props => {

    const router = useRouter()
    const dispatch = useDispatch()

        return (
            <div className='logged-out-items'>
                {
                    router.asPath.includes('/chatroom/') || router.asPath.includes('/messenger') ?
                        <Link href={`/`}>
                            <a rel='next' className='logged-out-item'>
                                <FontAwesomeIcon style={{width: '20px', height: '20px', color: 'var(--navigation-text-color, #ccc)'}} icon={faHome}/>
                            </a>
                        </Link>
                        : null
                }

                <button onClick={()=> dispatch(setLoginRegisterFormStatus('login'))} className='logged-out-item ' aria-label='logged-out-items' >
                    {props.t(`common:Login`)}
                </button>
                <button onClick={()=> dispatch(setLoginRegisterFormStatus('register'))} className='logged-out-item ' aria-label='logged-out-items' >
                    {props.t(`common:Register`)}
                </button>
            </div>
        )

};
export default withTranslation(['common'])(LoggedOutItemsMenu);
