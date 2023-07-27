'use client';
//@ts-ignore
import { FC, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import { faTimes as faXmark } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import AuthenticationNotLoggedInItems from "./AuthenticationNotLoggedInItems";
import {useAppSelector} from "@store/hooks";
const AuthenticationLoggedInItems = dynamic(() => import('./AuthenticationLoggedInItems'))

const Authentication: FC = () => {
    const [open, setOpen] = useState(false);
    const loggedIn = useAppSelector(({ user }) => user?.loggedIn);

    const onOpenCloseHandler = () => {
        setOpen(!open);
    };

    useEffect(() => {
        //@ts-ignore
        function handleKeyDown(event) {
            if (event.ctrlKey && event.shiftKey) {
                setOpen(!open);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    return (
        <div className="flex justify-center items-center">
            <button
                className="flex justify-center items-center bg-transparent p-0 m-0 border-none outline-none cursor-pointer"
                onClick={onOpenCloseHandler}
                aria-label="authentication panel"
            >
                <FontAwesomeIcon
                    icon={faUserGear}
                    className="w-6 h-6 text-[var(--primary-text-color,#fff)]"
                />
            </button>
            <div
                className={`fixed z-1 right-0 top-0 bg-[var(--primary-background-color,#000)] w-4/5 h-screen z-12 flex flex-col ${
                    open ? "flex" : "hidden"
                } transition-all duration-300`}
                style={{
                    borderLeft: "var(--default-border)",
                    animation: open ? "userMenuSlide .3s linear alternate" : "none",
                }}
            >
                <button
                    className="flex items-center text-[var(--primary-text-color,#fff)] p-2 mb-4 w-full"
                    onClick={onOpenCloseHandler}
                >
                    <FontAwesomeIcon className="w-6 h-6" icon={faXmark} />
                </button>
                {!loggedIn && (
                    <AuthenticationNotLoggedInItems
                        onOpenCloseHandler={onOpenCloseHandler}
                    />
                )}
                {loggedIn && (
                    <AuthenticationLoggedInItems onOpenCloseHandler={onOpenCloseHandler} />
                )}
            </div>
        </div>
    );
};

export default Authentication;




// import React, {FC, useState, memo, useEffect, SetStateAction} from 'react';
// import {useSelector} from 'react-redux';
// import dynamic from "next/dynamic";

// import {Store} from "typescript-types";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
// import {faUserGear} from "@fortawesome/free-solid-svg-icons/faUserGear";
// import Styles from "./Authentication.styles";
// import AuthenticationNotLoggedInItems from "./AuthenticationNotLoggedInItems";
// const AuthenticationLoggedInItems = dynamic(() => import('./AuthenticationLoggedInItems'))
//
// const Authentication: FC = () => {
//     const [open, setOpen] = useState<SetStateAction<boolean>>(false)
//     const loggedIn = useSelector(({user}: Store) => user?.loggedIn)
//
//     const onOpenCloseHandler = () => {
//         setOpen(!open)
//     }
//
//     useEffect(() => {
//         //@ts-ignore
//         function handleKeyDown(event) {
//             if (event.ctrlKey && event.shiftKey) {
//                 setOpen(!open)
//             }
//         }
//
//         document.addEventListener("keydown", handleKeyDown); // Add event listener for keydown
//
//         return () => {
//             document.removeEventListener("keydown", handleKeyDown); // Remove event listener on component unmount
//         };
//     }, []);
//
//     return (
//         <Styles open={open as boolean}>
//             <button className={'profile-icon'} onClick={onOpenCloseHandler} aria-label={'authentication panel'}>
//                 <FontAwesomeIcon icon={faUserGear}
//                                  style={{width: 24, height: 24, color: ' var(--primary-text-color, #fff)'}}/>
//             </button>
//             <div className={'authentication-widget-wrapper'}>
//                 <button className={'logged-item btn btn-transparent-light close-btn'} onClick={onOpenCloseHandler}>
//                     <FontAwesomeIcon className={'close icon'} icon={faXmark} style={{width: 25, height: 25}}/>
//                 </button>
//                 {!loggedIn && <AuthenticationNotLoggedInItems onOpenCloseHandler={onOpenCloseHandler}/>}
//                 {loggedIn && <AuthenticationLoggedInItems onOpenCloseHandler={onOpenCloseHandler}/>}
//             </div>
//         </Styles>
//     )
// };
//
// export default memo(Authentication);
