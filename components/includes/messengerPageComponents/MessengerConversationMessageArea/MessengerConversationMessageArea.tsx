import React, {useEffect, useRef} from 'react';
// @ts-ignore
import _ from "lodash";
import MessengerConversationMessage from "./MessengerConversationMessage";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";
// @ts-ignore
import {newMessageInConversation} from "../../../../store/actions/userActions";

interface MessengerConversationMessageAreaTypes {
    connectedUserData: object,
    userData: object
}

const MessengerConversationMessageArea = ({connectedUserData, userData}: MessengerConversationMessageAreaTypes) => {

    const dispatch = useDispatch()
    // @ts-ignore
    const messages = useSelector((state: StoreTypes) => state.user.activeConversation.messages);

    const router = useRouter();
    const messageArea = useRef(null)

    useEffect(() => {
        scrollToBottomOfConversationBox()
    }, [messages]);

    // const getAndSetConversationData = () => {
    //     getConversation(router.query.conversation, -20).then(res => {
    //         const connectedUser = users.find(u => u._id !== contextData.userData._id)
    //         // setMessages([...messages, ...res.data.conversation.messages])
    //         // setConnectedUserData({...connectedUserData, ...connectedUser})
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }


    const scrollToBottomOfConversationBox = () => {
        if (messageArea.current) {
            // @ts-ignore
            messageArea.current.scroll({
                // @ts-ignore
                top: messageArea.current.scrollHeight,
                behavior: "smooth"
            })
        }
    }

    return (
        <div className='messenger-conversation-message-area' ref={messageArea}>
            <style jsx>{`
              .messenger-conversation-message-area {
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                margin: 48px 0;
                overflow-y: scroll;
              }
            `}</style>
            {
                // @ts-ignore
                messages.map((message: { _id: string }) => {
                    return (
                        <MessengerConversationMessage
                            key={_.uniqueId('message_')}
                            message={message}
                            connectedUserData={connectedUserData}
                            // @ts-ignore
                            currentUserId={userData._id}
                        />
                    )
                })}
        </div>
    );
};
export default MessengerConversationMessageArea;
