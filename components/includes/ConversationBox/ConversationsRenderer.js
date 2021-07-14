import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../context/AppContext";
import ConversationBox from "./ConversationBox";
import _ from "lodash";

const ConversationsRenderer = props => {
    const contextData = useContext(AppContext);

    const [state, setState] = useState({});
    useEffect(() => {
    }, []);

    const renderConversations = contextData.conversations.map(conversation=>{
        return(
            <ConversationBox
                key={_.uniqueId('conversation_')}
                conversationData={conversation}
            />
        )
    })


    return (
        <div className='conversation-group'>
            <style jsx>{`
             .conversation-group{
             position: fixed;
             bottom: 0;
             display: flex;
             justify-content: flex-start;
             align-items: center;
          
             }
             `}</style>
            {renderConversations}
        </div>
    );
};
export default ConversationsRenderer;
