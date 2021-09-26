import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimes} from "@fortawesome/free-solid-svg-icons";
import {faWindowMaximize, faWindowMinimize} from "@fortawesome/free-regular-svg-icons";

const SendMessagePopUpHeader = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div className='send-message-pop-up-header'>
            <style jsx>{`
                .send-message-pop-up-header{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-height: 48px;
                    padding: 0 10px;
                }
                img{
                    width: 30px;
                    height: 30px;
                }
                button{
                    height: 48px;
                    background-color: transparent;
                    border: none;
                    outline: none;
                }
            `}
            </style>
            <img src={props.receiverProfileImage} alt=""/>
            <p>{props.username}</p>
            <button onClick={props.onCloseMessagePop} > <FontAwesomeIcon style={{width: '20px',height: '20px',color:'var(--navigation-text-color, #ccc)'}} icon={faTimes} className='navigation-mobile-button-logo' /></button>
        </div>
    );
};
export default SendMessagePopUpHeader;
