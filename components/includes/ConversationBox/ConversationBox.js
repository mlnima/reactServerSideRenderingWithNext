import React, {useEffect, useState, useContext, useRef} from 'react';
import ConversationBoxHeader from "./ConversationBoxHeader";
import ConversationBoxTools from "./ConversationBoxTools";
import ConversationBoxBody from "./ConversationBoxBody/ConversationBoxBody";
import Draggable from 'react-draggable';
import {AppContext} from "../../../context/AppContext";
import {getUserPreviewData} from "../../../_variables/_userSocialAjaxVariables";

const ConversationBox = props => {
    const contextData = useContext(AppContext);

    const [minimized, setMinimized] = useState(false);
    const [userToConversationData, setUserToConversationData] = useState({})
    useEffect(() => {
        const IdToGetData = props.conversationData.users.find(u=>u !== contextData.userData._id)
       getUserPreviewData(window.location.origin,undefined,IdToGetData).then(res=>{
           setUserToConversationData({
               ...userToConversationData,
               ...res.data.userData
           })
       })
    }, [props]);

    const [messageState, setMessageState] = useState({
        messageBody: ''
    })

    return (
        <Draggable handle=".conversation-box-header">
            <div className='conversation-box'>
                <style jsx>{`
            .conversation-box{
              position: relative;
              background-color: var(--navigation-background-color);
              width: 310px;
              height:  ${minimized ? '48px' : '400px'};
              max-height:  ${minimized ? '48px' : '400px'};
              margin: 0 2.5px;
              border-radius: 5px 5px 0 0 ;
            }
             `}</style>
                <ConversationBoxHeader {...props} userToConversationData={userToConversationData}  minimized={minimized} setMinimized={setMinimized}/>
                {
                    !minimized ?
                        <>
                            <ConversationBoxBody {...props} userToConversationData={userToConversationData} />
                            <ConversationBoxTools {...props} setMessageState={setMessageState} messageState={messageState}/>
                        </> :
                        null
                }

            </div>
        </Draggable>
    );
};
export default ConversationBox;
