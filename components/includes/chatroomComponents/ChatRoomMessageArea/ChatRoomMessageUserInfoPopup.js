import React, {useEffect, useState, useContext, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {faUser} from "@fortawesome/free-regular-svg-icons";

const ChatRoomMessageUserInfoPopup = ({userInfo,onUserInfoShowHandler}) => {
    const [state, setState] = useState({});

    if (userInfo.username){
        return (
            <div className='chatroom-message-user-info-popup'>
                <style jsx>{`
                .chatroom-message-user-info-popup{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(0,0,0,.8);
                    position: fixed;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                }
                .chatroom-message-user-info-popup-content{
                    background-color:   var(--navigation-background-color);
                    width: 310px;
                    height: 200px;
                    padding: 10px;
                    border-radius: 10px;
                    display: flex;
                    //justify-content: space-between;
                    flex-direction: column;
                    align-items: center;
                }
                
                .chatroom-message-user-info-popup-content-user-info{
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    width: 100%;
                }
                .chatroom-message-user-info-popup-content-close-button{
                    align-self: flex-end;
                    background-color:   transparent;
                    color: var(--main-text-color);
                    height: 20px;
                    padding:10px;
                }
                
                .chatroom-message-user-info-popup-content-userImage{
                    width: 150px;
                    height: 150px;
                }

                
                .chatroom-message-user-info-popup-user-data{
                 margin: 0 20px;
                 display: flex;
                 flex-direction: column;
                 align-items: flex-start;
                 justify-content: space-between;
                 height: 100%;
                }
                
                .chatroom-message-user-info-popup-username{
                  color: var(--main-text-color);
                }
                
                .chatroom-message-user-info-popup-user-data-links>a{
                  color: var(--main-text-color);
                  text-decoration: none;
                }
             `}</style>
                <div className='chatroom-message-user-info-popup-content'>
                 <span onClick={onUserInfoShowHandler} className='chatroom-message-user-info-popup-content-close-button'>
                    <FontAwesomeIcon style={{width: '20px', height: '20px'}} icon={faTimes}/>
                 </span>
                    <div className='chatroom-message-user-info-popup-content-user-info'>
                        <img className='chatroom-message-user-info-popup-content-userImage' src={userInfo.profileImage} alt=""/>
                        <div className='chatroom-message-user-info-popup-user-data'>
                            <p className='chatroom-message-user-info-popup-username'>{userInfo.username}</p>
                            <div className='chatroom-message-user-info-popup-user-data-links'>
                                <Link href={`/user/${userInfo.username}`}>
                                    <a >
                                        <FontAwesomeIcon style={{width: '20px', height: '20px'}} icon={faUser}/>
                                    </a>
                                </Link>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        );
    }else return null

};
export default ChatRoomMessageUserInfoPopup;
