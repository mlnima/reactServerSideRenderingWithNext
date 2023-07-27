import Link from "next/link";
import {commonAPIRequestClearCaches} from "api-requests";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";
import {setAdminMode} from "@store_toolkit/clientReducers/globalStateReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {faUserShield} from "@fortawesome/free-solid-svg-icons/faUserShield";
import {faEraser} from "@fortawesome/free-solid-svg-icons/faEraser";
import {faShield} from "@fortawesome/free-solid-svg-icons/faShield";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";

const AuthenticationAdminItems = ({}) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const adminMode = useAppSelector(({globalState}) => globalState.adminMode)

    const onSetAdminModeHandler = () => {
        dispatch(setAdminMode(!adminMode))
        localStorage.setItem('adminMode', localStorage?.adminMode === 'true' ? 'false': 'true')
    }



    return (
        <>
            <Link href={'/dashboard'} target={'_blank'} className={'logged-item'}>
                <div className={'icon-wrapper'}>
                    <FontAwesomeIcon icon={faUserShield} style={{width: 25, height: 25}}/>
                </div>

                Dashboard
            </Link>
            <span className={'logged-item'} onClick={() => commonAPIRequestClearCaches().then(() => router.reload())}>
                   <div className={'icon-wrapper'}>
                       <FontAwesomeIcon icon={faEraser} style={{width: 25, height: 25}}/>
                  </div>

                Clear Cache
            </span>
            <span className={'logged-item'} onClick={() => onSetAdminModeHandler()}>
                   <div className={'icon-wrapper'}>
                       <FontAwesomeIcon icon={adminMode ? faCheck : faShield} style={{width: 25, height: 25}}/>
                  </div>

                Admin Mode
            </span>
        </>
    )
};
export default AuthenticationAdminItems;