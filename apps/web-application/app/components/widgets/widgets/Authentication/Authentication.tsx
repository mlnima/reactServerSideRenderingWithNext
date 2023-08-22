'use client';
import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import { faTimes as faXmark } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import AuthenticationNotLoggedInItems from "./AuthenticationNotLoggedInItems";
import {useAppSelector} from "@store/hooks";
const AuthenticationLoggedInItems = dynamic(() => import('./AuthenticationLoggedInItems'))
import './Authentication.styles.scss'

interface IProps{
    locale: string,
    dictionary: {
        [key: string]: string
    }
}

const Authentication: FC<IProps>= ({locale,dictionary}) => {
    const [open, setOpen] = useState(false);
    const loggedIn = useAppSelector(({ user }) => user?.loggedIn);

    const onOpenCloseHandler = () => {
        setOpen(!open);
    };

    return (
        <div className="auth-widget">
            <button className={'profile-icon cursor-pointer'} onClick={onOpenCloseHandler} aria-label={'authentication'}>
                <FontAwesomeIcon icon={faUserGear}/>
            </button>
            <div className={`auth-widget-wrapper ${open ? "auth-widget-wrapper-open" : "auth-widget-wrapper-closed"}`}>
                <button className="auth-widget-close-btn" onClick={onOpenCloseHandler}>
                    <FontAwesomeIcon className="w-6 h-6" icon={faXmark} />
                </button>
                {!loggedIn && <AuthenticationNotLoggedInItems onOpenCloseHandler={onOpenCloseHandler}
                                                               locale={locale}
                                                              dictionary={dictionary}/>}
                {loggedIn && <AuthenticationLoggedInItems onOpenCloseHandler={onOpenCloseHandler}
                                                           locale={locale}
                                                           dictionary={dictionary} />}
            </div>
        </div>
    );
};

export default Authentication;



