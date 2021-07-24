import React, {useEffect, useState, useContext, useRef} from 'react';
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import socket from '../../../../_variables/socket';
import {useRouter} from "next/router";
import {AppContext} from "../../../../context/AppContext";

const ChatRoomTools = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [state, setState] = useState({
        messageData: ''
    });
    useEffect(() => {
    }, []);


    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = e =>{
        e.preventDefault()
        socket.emit('message',state.messageData,router.query.chatRoomName,contextData.userData.username,contextData.userData._id,contextData.userData.profileImage)
        setState({
            ...state,
            messageData: ''
        })
    }
    return (
        <div className='chatroom-tools'>
            <style jsx>{`
                .chatroom-tools{
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 40px;
                    padding: 5px 10px;
                }
                .chatroom-tools-content{
                    width: 100%;
                    height: 40px;
                }
                
                .chatroom-tools-content-input{
                    position: absolute;
                    width: 100%;
                    height: 30px;
                    padding: 5px 10px;
                     
                }
                .chatroom-tools-content-submit-button{
                    position: absolute;
                    right: 0;
                    background-color: var(--navigation-background-color);
                    border: none;
                    height: 40px;
                    padding: 5px 10px;
                }
            `}</style>

            <form className='chatroom-tools-content' onSubmit={e=>onSubmitHandler(e)}>
                <input className='chatroom-tools-content-input' type='text' name='messageData' onChange={e=>onChangeHandler(e)} value={state.messageData}/>
                <button className='chatroom-tools-content-submit-button' type='submit'><FontAwesomeIcon style={{width: '20px', height: '20px', color: 'var(--navigation-text-color)'}} icon={faArrowRight}/></button>
            </form>
        </div>
    );
};
export default ChatRoomTools;
