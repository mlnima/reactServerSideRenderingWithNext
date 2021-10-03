import React,{useEffect} from 'react';
import MessengerConversationPreview from "./MessengerConversationPreview";
import {useDispatch, useSelector} from "react-redux";
import MessengerConversationListHeader from "./MessengerConversationListHeader";
import {getConversations} from "../../../../store/actions/userActions";

const MessengerConversationsList = ( ) => {
    const dispatch = useDispatch()
    // @ts-ignore
    const conversations = useSelector(state => state.user.conversations)
    // @ts-ignore
    const userData = useSelector(state => state.user.userData)

    useEffect(() => {
        if (userData?._id) {
            dispatch(getConversations(userData?._id))
        }
    }, [userData]);

    // @ts-ignore
    const renderConversationsPreview = (conversations || []).map((conversationData, index) => {
        return <MessengerConversationPreview key={index} conversationData={conversationData} userId={userData._id}/>
    })

    return (
        <div className='messenger-conversations-list'>
            <style jsx>{`
              .messenger-conversations-list {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              }

              .no-message {
                color: var(--navigation-text-color, #ccc);
              }

            `}</style>
            <MessengerConversationListHeader/>
            {renderConversationsPreview}
            {!conversations || conversations.length < 1 ? <p className='no-message'>there is no messages yet</p> : null}
        </div>
    );
};
export default MessengerConversationsList;
