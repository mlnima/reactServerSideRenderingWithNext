import React from 'react';
import Link from "next/link";
import {withTranslation} from "next-i18next";
import {useDispatch, useSelector} from "react-redux";
import {userLogOut} from "../../../../../store/actions/userActions";
import {setLoginRegisterFormStatus} from "../../../../../store/actions/globalStateActions";
import {faEnvelope, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const LoggedInItemsForMenu = props => {
    const identity = useSelector(store => store?.settings?.identity)
    const dispatch = useDispatch()

    return (
    <>
            {identity.membership ?
                <>
                    <Link href={`/profile`}>
                        <a rel='next' className='logged-in-item btn btn-transparent-light'>
                            <FontAwesomeIcon  icon={faUser} />
                            {props.t(`common:Profile`)}
                        </a>
                    </Link>

                    <Link href={`/messenger`}>
                        <a rel='next' className='logged-in-item btn btn-transparent-light'>
                            <FontAwesomeIcon  icon={faEnvelope} />
                            {props.t(`common:Messages`)}
                        </a>
                    </Link>
                </>
                : null
            }
            <p className='logged-in-item btn btn-transparent-light' onClick={() => {
                dispatch(userLogOut())
                dispatch(setLoginRegisterFormStatus(false))
            }}>
                <FontAwesomeIcon  icon={faSignOutAlt} />
                {props.t(`common:Logout`)}
            </p>
    </>
    )

};
export default withTranslation(['common'])(LoggedInItemsForMenu);
