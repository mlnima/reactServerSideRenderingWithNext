import React from 'react';
import {withTranslation} from "next-i18next";
import {useDispatch} from "react-redux";
import {setLoginRegisterFormStatus} from "../../../../../store/actions/globalStateActions";
import {faEnvelope, faSignInAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const LoggedOutItemsMenu = props => {
    const dispatch = useDispatch()
        return (
                <div className='logged-in-items-content'>
                    <button onClick={()=> dispatch(setLoginRegisterFormStatus('login'))} className='logged-out-item btn btn-transparent-light' aria-label='logged-out-items' >
                        <FontAwesomeIcon  icon={faSignInAlt} />
                        {props.t(`common:Login`)}
                    </button>
                    <button onClick={()=> dispatch(setLoginRegisterFormStatus('register'))} className='logged-out-item btn btn-transparent-light' aria-label='logged-out-items' >
                        <FontAwesomeIcon  icon={faSignOutAlt} />
                        {props.t(`common:Register`)}
                    </button>
                </div>
        )
};

export default withTranslation(['common'])(LoggedOutItemsMenu);
