import React, {useEffect, useState, useContext, useRef} from 'react';
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faBars, faPhoneAlt, faVideo} from "@fortawesome/free-solid-svg-icons";
// import Peer from 'simple-peer'
// import socket from '../../../../_variables/socket'

const MessengerConversationHeader = ({profileImage,username,callUser}) => {
    const router = useRouter()


    const onVideoCallHandler = () =>{

    }
    const onVoiceCallHandler = () =>{

    }

    return (
        <div className='messenger-conversation-header'>
            <style jsx>{`
              .messenger-conversation-header{
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding:  10px;
                background-color: var(--navigation-background-color);
                height: 50px;
              }
              
              .messenger-conversation-header-back-btn,.messenger-conversation-header-call-btn,.messenger-conversation-header-video-call-btn{
                background-color: transparent;
                border: none;
                margin: 0 10px;
              }
              
              .messenger-conversation-header-profile-image{
                width: 50px;
                border-radius: 50%;
                margin: 0 5px;
              }
              .messenger-conversation-header-username{
                color:var(--navigation-text-color);
                margin: 0 5px;
              }
              
              .messenger-conversation-header-left{
                display: flex;
                align-items: center;
              }
              
              .messenger-conversation-header-right{
                display: flex;
                align-items: center;
              }
              
             `}</style>
            <div className='messenger-conversation-header-left'>
                <button onClick={()=>router.push('/messenger')} className='messenger-conversation-header-back-btn'>
                    <FontAwesomeIcon style={{width: '20px',height: '20px',color:'var(--navigation-text-color)'}}  icon={faArrowLeft} className='messenger-conversation-header-back-btn-svg' />
                </button>
                <img src={profileImage || '/static/images/noImage/no-image-available.png'} alt="messenger-conversation-header-profile-image" className="messenger-conversation-header-profile-image"/>
                <p className='messenger-conversation-header-username'>{username}</p>
            </div>
            <div className='messenger-conversation-header-right'>
                <button onClick={callUser} className='messenger-conversation-header-video-call-btn'>
                    <FontAwesomeIcon style={{width: '20px',height: '20px',color:'var(--navigation-text-color)'}}  icon={faVideo} className='messenger-conversation-header-video-call-btn-svg' />
                </button>
                <button onClick={callUser} className='messenger-conversation-header-call-btn'>
                    <FontAwesomeIcon style={{width: '20px',height: '20px',color:'var(--navigation-text-color)'}}  icon={faPhoneAlt} className='messenger-conversation-header-video-call-btn-svg' />
                </button>
            </div>

        </div>
    );
};
export default MessengerConversationHeader;
