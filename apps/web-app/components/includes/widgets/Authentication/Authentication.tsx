import React, {FC, useState, memo, useEffect, SetStateAction} from 'react';
import dynamic from "next/dynamic";
import AuthenticationNotLoggedInItems from "./AuthenticationNotLoggedInItems";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {faUserGear} from "@fortawesome/free-solid-svg-icons/faUserGear";
import Styles from "./Authentication.styles";
import {useAppSelector} from "@store_toolkit/hooks";

const AuthenticationLoggedInItems = dynamic(() => import('./AuthenticationLoggedInItems'))

const Authentication: FC = () => {
    const [open, setOpen] = useState<SetStateAction<boolean>>(false)
    const loggedIn = useAppSelector(({user}) => user?.loggedIn)

    const onOpenCloseHandler = () => {
        setOpen(!open)
    }

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.ctrlKey && event.shiftKey) {
                setOpen(!open)
            }
        }

        document.addEventListener("keydown", handleKeyDown); // Add event listener for keydown

        return () => {
            document.removeEventListener("keydown", handleKeyDown); // Remove event listener on component unmount
        };
    }, []);

    return (
        <Styles open={open as boolean}>
            <button className={'profile-icon'} onClick={onOpenCloseHandler} aria-label={'authentication panel'}>
                <FontAwesomeIcon icon={faUserGear}
                                 style={{width: 24, height: 24, color: 'var(--primary-text-color,#fff)'}}/>
            </button>
            <div className={'authentication-widget-wrapper'}>
                <button className={'logged-item btn btn-transparent-light close-btn'} onClick={onOpenCloseHandler}>
                    <FontAwesomeIcon className={'close icon'} icon={faXmark} style={{width: 25, height: 25}}/>
                </button>
                {!loggedIn && <AuthenticationNotLoggedInItems onOpenCloseHandler={onOpenCloseHandler}/>}
                {loggedIn && <AuthenticationLoggedInItems onOpenCloseHandler={onOpenCloseHandler}/>}
            </div>
        </Styles>
    )
};

export default memo(Authentication);
