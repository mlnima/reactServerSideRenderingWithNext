import React from 'react';
import Link from "next/link";
import {withTranslation} from "next-i18next";
import {useDispatch, useSelector} from "react-redux";
import {userLogOut} from "../../../../../store/actions/userActions";
import {setLoginRegisterFormStatus} from "../../../../../store/actions/globalStateActions";

const LoggedInItemsForMenu = props => {
    const identity = useSelector(state => state.settings.identity)
    const dispatch = useDispatch()
        return (
            <div className='logged-in-items'>
                {identity.membership ?
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
