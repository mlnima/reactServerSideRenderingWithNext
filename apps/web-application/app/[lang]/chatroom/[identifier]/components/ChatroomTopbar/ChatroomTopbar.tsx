import React, {FC} from "react";
import {capitalizeFirstLetters} from "@repo/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";
import {useRouter} from "next/navigation";
import {faArrowDownWideShort} from "@fortawesome/free-solid-svg-icons/faArrowDownWideShort";
import './ChatroomTopbar.scss'
import {IPreference} from "../interfaces";
import Link from "next/link";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {IChatroom} from "@repo/typescript-types";

interface IProp {
    chatrooms: IChatroom[],
    chatroomId: string,
    autoScroll: boolean,
    setAutoScroll: React.Dispatch<React.SetStateAction<boolean>>,
    preference: IPreference,
    updatePreference: (key: string, value: string | boolean)=> void,
    locale: string,
}

const ChatroomTopbar: FC<IProp> = (
    {
        chatrooms,
        chatroomId,
        autoScroll,
        setAutoScroll,
        preference,
        updatePreference,
        locale
    }) => {
    const {push} = useRouter()

    const onChatroomChangeHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
        updatePreference('onlineUserListVisibility',false)
        push(`/chatroom/${e.target.value}`)
    }

    return (
        <div className={'chatroomTopbar'}>
            <Link href={locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '/' : `/${locale}`} className={'backToHomePageButton'}>
                <FontAwesomeIcon icon={faHome}/>
            </Link>
            <select className={'primarySelect chatroom-selector'} onChange={e => onChatroomChangeHandler(e)}
                    value={chatroomId}>
                {(chatrooms || []).map(chatroom => {
                    return (
                        <option value={chatroom._id}
                                key={chatroom._id}>
                            {capitalizeFirstLetters(chatroom.name)}
                        </option>
                    )
                })}
            </select>


            <div className={'chatroomActionsButtons'}>
                <button onClick={() => setAutoScroll(!autoScroll)}
                        className={`topBarActionButton ${autoScroll && 'topBarActionButtonActive'}`}>
                    <FontAwesomeIcon icon={faArrowDownWideShort}/>
                </button>
                {/*<button className={`topBarActionButton ${preference.isMaximized && 'topBarActionButtonActive'}`}*/}
                {/*        onClick={() => updatePreference('isMaximized', !preference.isMaximized)}>*/}
                {/*    <FontAwesomeIcon icon={preference.isMaximized ? faMinimize : faMaximize}/>*/}
                {/*</button>*/}
                <button className={
                    `topBarActionButton ${preference.onlineUserListVisibility && 'topBarActionButtonActive'}`
                }
                        onClick={() => updatePreference('onlineUserListVisibility', !preference.onlineUserListVisibility)}>
                    <FontAwesomeIcon icon={faUsers}/>
                </button>
            </div>

        </div>
    )
};
export default ChatroomTopbar;