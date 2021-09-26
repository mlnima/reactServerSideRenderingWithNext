import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../../context/AppContext";
import {faWindowMaximize, faWindowMinimize} from "@fortawesome/free-regular-svg-icons";

const ConversationBoxHeader = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);

    const onCloseConversationHandler = () =>{
        contextData.dispatchConversations(contextData.conversations.filter(c=>c._id !== props.conversationData._id))
    }

    const onMinimizeHandler = ()=>{
        props.minimized ?props.setMinimized(false) :props.setMinimized(true)
    }
    return (
        <div className='conversation-box-header'>
        <style jsx>{`
            .conversation-box-header{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 5px;
                height: 48px;
                border-bottom: solid .5px rgba(255,255,255 , .05);
            }
            
            .conversation-box-header-userInfo{
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: var(--navigation-text-color, #ccc);
                padding: 0 5px;
            }
            .conversation-box-header-userInfo-image{
               width: 30px;
               margin: 0 10px;
               border-radius: 50%;
            }
            .send-message-pop-up-header-close-btn{
                background-color: transparent;
                border: none;
            }
        `}</style>
            <div className='conversation-box-header-userInfo' >
                <img className='conversation-box-header-userInfo-image' src={props.userToConversationData.profileImage} alt=""/>
                <p>{props.userToConversationData.username}</p>
            </div>
            <div className='send-message-pop-up-header-close-btns'>
                <button onClick={onMinimizeHandler} onTouchStartCapture={onMinimizeHandler} className='send-message-pop-up-header-close-btn'>
                    <FontAwesomeIcon style={{width: '20px',height: '20px',color:'var(--navigation-text-color, #ccc)'}} icon={props.minimized ? faWindowMaximize : faWindowMinimize} className='navigation-mobile-button-logo' />
                </button>
                <button onClick={onCloseConversationHandler} onTouchStartCapture={onCloseConversationHandler} className='send-message-pop-up-header-close-btn'>
                    <FontAwesomeIcon style={{width: '20px',height: '20px',color:'var(--navigation-text-color, #ccc)'}} icon={faTimes} className='navigation-mobile-button-logo' />
                </button>
            </div >

        </div>
    );
};
export default ConversationBoxHeader;
