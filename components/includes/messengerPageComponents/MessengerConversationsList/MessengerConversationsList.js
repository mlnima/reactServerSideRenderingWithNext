import React, { useContext} from 'react';
import MessengerConversationPreview from "./MessengerConversationPreview";
import {AppContext} from "../../../../context/AppContext";

import MessengerConversationListHeader from "./MessengerConversationListHeader";

const MessengerConversationsList = ({conversations, setConversations}) => {
    const contextData = useContext(AppContext);
    const renderConversationsPreview = (conversations || []).map((conversationData, index) => {
        return <MessengerConversationPreview key={index} conversationData={conversationData} userId={contextData.userData._id}/>
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
