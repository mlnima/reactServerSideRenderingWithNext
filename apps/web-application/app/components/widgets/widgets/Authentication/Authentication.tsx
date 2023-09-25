'use client';
import React, { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes as faXmark } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import AuthenticationNotLoggedInItems from "./AuthenticationNotLoggedInItems";
import {useAppSelector} from "@store/hooks";
import './Authentication.styles.scss'
import Csr from "@components/global/Csr";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import Link from "next/link";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";

const AuthenticationLoggedInItems = dynamic(() => import('./AuthenticationLoggedInItems'))

interface IProps{
    locale: string,
    dictionary: {
        [key: string]: string
    }
}

const Authentication: FC<IProps>= ({locale,dictionary}) => {
    const [open, setOpen] = useState(false);

    const loggedIn = useAppSelector(({ user }) => user?.loggedIn);
    const {membership} = useAppSelector(({settings}) =>  settings?.initialSettings?.membershipSettings);

    const {usersCanMessageEachOther} = useAppSelector(
        ({settings}) =>  settings?.initialSettings?.membershipSettings
    );

    const onOpenCloseHandler = () => {
        setOpen(!open);
    };

    return (
        <div className={'authWidget'}>
            <div className={'authWidgetPreview'}>
                <button className={'profileIcon'}
                        onClick={onOpenCloseHandler}
                        aria-label={'authentication'}>
                    <FontAwesomeIcon icon={faUser}/>
                </button>
                <Csr>
                    {(loggedIn && membership && usersCanMessageEachOther) &&
                        <Link href={`/messenger`}
                              className='messagesIcon'>
                            <FontAwesomeIcon icon={faEnvelope}/>
                        </Link>
                    }
                </Csr>
            </div>

            <div className={`authWidgetSlideWrapper ${
                open ? 
                    "auth-widget-wrapper-open" :
                    "auth-widget-wrapper-closed"}`}>
                <button className="authWidgetCloseBtn" onClick={onOpenCloseHandler}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <Csr>


                {!loggedIn && <AuthenticationNotLoggedInItems onOpenCloseHandler={onOpenCloseHandler}
                                                               locale={locale}
                                                              dictionary={dictionary}/>}
                {loggedIn && <AuthenticationLoggedInItems onOpenCloseHandler={onOpenCloseHandler}
                                                           locale={locale}
                                                           dictionary={dictionary} />}
                </Csr>
            </div>
        </div>
    );
};

export default Authentication;



