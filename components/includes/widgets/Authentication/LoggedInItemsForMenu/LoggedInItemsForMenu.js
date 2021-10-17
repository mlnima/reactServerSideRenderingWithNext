import React, {useContext} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import Link from "next/link";
import {withTranslation} from "next-i18next";
import {useDispatch} from "react-redux";
import {userLogOut} from "../../../../../store/actions/userActions";
import {setLoginRegisterFormStatus} from "../../../../../store/actions/globalStateActions";

const LoggedInItemsForMenu = props => {

    const contextData = useContext(AppContext);
    const dispatch = useDispatch()
        return (
            <div className='logged-in-items'>
                {contextData.siteIdentity.membership ?
                    <>
                        <Link href={`/profile`}>
                            <a rel='next' className='logged-in-item btn btn-transparent-light'>
                                {props.t(`common:Profile`)}
                            </a>
                        </Link>

                        <Link href={`/messenger`}>
                            <a rel='next' className='logged-in-item btn btn-transparent-light'>
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
                    {props.t(`common:Logout`)}
                </p>
            </div>
        )

};
export default withTranslation(['common'])(LoggedInItemsForMenu);
