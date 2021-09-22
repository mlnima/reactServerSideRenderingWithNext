import React, {useEffect, useState, useContext, useRef} from 'react';
import moment from "moment";
import Link from "next/link";

const MessengerConversationPreview = ({conversationData, userId}) => {
    const [state, setState] = useState({
        username:'',
        profileImage:'',
        messageBody:'',
        date:''
    });
    useEffect(() => {
        setState({
            ...state,
            username: conversationData?.users ?  conversationData.users.find(u => u._id !== userId)?.username:'',
            profileImage:conversationData?.users ? conversationData.users.find(u => u._id !== userId)?.profileImage :'/static/images/noImage/no-image-available.png',
            messageBody:conversationData?.messages?.[0]?.messageBody,
            date: conversationData?.updatedAt ?
                moment(new Date(conversationData.updatedAt), "YYYYMMDD").fromNow(false)
                :''
        })
    }, []);
    return (
        <Link href={`/messenger/${conversationData._id}`} >
        <a className='messenger-conversation-preview'>
            <style jsx>{`
                   .messenger-conversation-preview{
                     width: calc(100% - 20px);
                     padding: 5px 10px;
                     height: 50px;
                     display: flex;
                     align-items: center;
                     justify-content: flex-start;
                     margin: 4px auto 4px auto;
                     text-decoration: none;
                   }
                   
                   .messenger-conversation-content-preview{
                      display: flex;
                      padding: 0 5px;
                      flex-direction: column;
                       width: calc(100% - 10px);
                   }
                   
                   .messenger-conversation-preview-username-date{
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      color:var(--navigation-text-color);
                     
                   }
                   
                   .messenger-conversation-preview-image{
                    width: 50px;
                    border-radius: 50%;
                   }
                   .messenger-conversation-preview-username{
                     margin: 4px 0;
                   }                
                   .messenger-conversation-preview-date{
                      margin: 4px 0;
                   }
                   
                   .messenger-conversation-preview-last-message{
                     margin: 0;
                     color:var(--navigation-text-color);
                   }
                   
                   @media only screen and (min-width: 768px){

                     .messenger-conversation-preview{
                     width: 450px;
                   }
                   }
                   
               `}</style>
            <img className='messenger-conversation-preview-image' src={state.profileImage} alt=""/>
            <div className='messenger-conversation-content-preview'>
                <div className='messenger-conversation-preview-username-date' >
                    <p className='messenger-conversation-preview-username'>{state.username}</p>
                    <p className='messenger-conversation-preview-date'>{state.date}</p>
                </div>
                <p className='messenger-conversation-preview-last-message'>{state.messageBody}</p>
            </div>
            {/*<button className='action-client-button-link'>...</button>*/}


        </a>
        </Link>
    );
};
export default MessengerConversationPreview;
