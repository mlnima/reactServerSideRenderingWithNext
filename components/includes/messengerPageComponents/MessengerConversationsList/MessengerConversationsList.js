import React, {useEffect, useState, useContext, useRef} from 'react';
import MessengerConversationPreview from "./MessengerConversationPreview";
import {AppContext} from "../../../../context/AppContext";
import _ from "lodash";

const MessengerConversationsList = ({conversations, setConversations}) => {
    const contextData = useContext(AppContext);
    // useEffect(() => {
    //     console.log(conversations)
    // }, [conversations]);
    const renderConversationsPreview = (conversations || []).map(conversationData => {
        return <MessengerConversationPreview key={_.uniqueId('user_')} conversationData={conversationData} userId={contextData.userData._id}/>
    })

    return (
        <div className='messenger-conversations-list'>
            <style jsx>{`
.messenger-conversations-list{
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
//width: 100%;
}
            `}</style>
            {renderConversationsPreview}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
            {/*{renderConversationsPreview}*/}
        </div>
    );
};
export default MessengerConversationsList;
