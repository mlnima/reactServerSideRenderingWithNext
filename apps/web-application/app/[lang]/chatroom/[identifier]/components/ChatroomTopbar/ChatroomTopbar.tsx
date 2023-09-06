import React, {FC} from "react";
import {capitalizeFirstLetters} from "custom-util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";
import {faMaximize} from "@fortawesome/free-solid-svg-icons/faMaximize";
import {faMinimize} from "@fortawesome/free-solid-svg-icons/faMinimize";
import {useRouter} from "next/navigation";
import {faArrowDownWideShort} from "@fortawesome/free-solid-svg-icons/faArrowDownWideShort";
import './ChatroomTopbar.styles.scss'
import {IPreference} from "../interfaces";

interface PropTypes {
    chatrooms: { name: string, _id: string }[],
    chatroomId: string,
    autoScroll: boolean,
    setAutoScroll: Function,
    preference: IPreference,
    updatePreference: Function
}

const ChatroomTopbar: FC<PropTypes> = (
    {
        chatrooms,
        chatroomId,
        autoScroll,
        setAutoScroll,
        preference,
        updatePreference
    }) => {
    const {push} = useRouter()
    //@ts-ignore
    const onChatroomChangeHandler = (e) => {
        push(`/chatroom/${e.target.value}`)
    }

    return (
        <div className={'chatroomTopbar'}>
            <select className={'custom-select chatroom-selector'} onChange={e => onChatroomChangeHandler(e)}
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
                <button className={`topBarActionButton ${preference.isMaximized && 'topBarActionButtonActive'}`}
                        onClick={() => updatePreference('isMaximized', !preference.isMaximized)}>
                    <FontAwesomeIcon icon={preference.isMaximized ? faMinimize : faMaximize}/>
                </button>
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