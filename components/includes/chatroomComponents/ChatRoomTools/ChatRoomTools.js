import React, {useEffect, useState, useContext, useRef} from 'react';
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import socket from '../../../../_variables/socket';
import {useRouter} from "next/router";
import {AppContext} from "../../../../context/AppContext";


const ChatRoomTools = ({onEmojiPickerHandler}) => {
    const contextData = useContext(AppContext);
    const colorPicker= useRef(null)
    const router = useRouter()
    const [state, setState] = useState({
        messageData: '',
        color:'var(--navigation-text-color)'
    });

    const [someoneTypes, setSomeoneTypes] = useState({
        username: '',
        active: false
    });


    useEffect(() => {
    }, []);


    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        if (contextData.userData._id && state.messageData.length >0) {
            socket.emit('message', state.messageData, router.query.chatRoomName, contextData.userData.username, contextData.userData._id, contextData.userData.profileImage,state.color)
            setState({
                ...state,
                messageData: ''
            })
        } else {
            contextData.dispatchState({
                ...contextData.state,
                loginRegisterFormPopup: true,
                loginRegisterFormPopupType: 'register'
            })
        }

    }

    const onStartTypingHandler = () => {
        socket.emit('startTyping', router.query.chatRoomName, contextData.userData.username)
    }


    useEffect(() => {
        socket.on('startTyping', username => {
            setSomeoneTypes({
                ...someoneTypes,
                username,
                active: true
            })
        });
    }, []);


    useEffect(() => {
        if (someoneTypes.active){
            setTimeout(()=>{
                setSomeoneTypes({
                    ...someoneTypes,
                    username:'',
                    active: false
                })
            },3000)
        }
    }, [someoneTypes]);


    return (
        <>


            <form className='chatroom-tools' onSubmit={e => onSubmitHandler(e)}>
                <style jsx>{`
                    .chatroom-tools{
                        position: fixed;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        height: 50px;
                        padding: 2px;
                        background-color: var(--navigation-background-color);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: calc(100% - 4px);
                    }
                    
                    .chatroom-tools-text{
                        display: flex;
                        justify-content: center;
                        width: calc(100% - 4px);
                    }
                    .chatroom-tools-content-input{
                        border-radius: 50px;
                        height: 27px;
                        width: 100%;
                        padding: 5px 5px;
                    }
                    
                    .chatroom-tools-Send{
                        z-index: 10;
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        right: 8px;
                    }
                    
                    .chatroom-tools-content-submit-button{
                        background-color: var(--navigation-background-color);
                        border: none;
                        width: 34px;
                        height: 34px;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    
                    .chatroom-someone-typing{
                       position: absolute;
                       top:-10px;
                       left: 10px;
                       background-color: var(--navigation-background-color);
                       color: var(--navigation-text-color);
                    }

                    .chatroom-tools-Send-color-picker-input{
                        position: absolute;
                        width: 34px;
                        height: 34px;
                        // border-radius: 50%;
                        right: 48px;
                        background-color: ${state.color};
                        border: none;
                        outline: none;
                        padding:0;
                        margin: 0;
                    }
                    
                `}</style>
                {someoneTypes.active ? <span className='chatroom-someone-typing'> {someoneTypes.username} is typing </span> : null}
                <div className='chatroom-tools-text'>
                    <input maxLength='300' className='chatroom-tools-content-input' type='text' name='messageData' onChange={e => onChangeHandler(e)} onClick={onStartTypingHandler} value={state.messageData}/>
                </div>

                <input ref={colorPicker} className='chatroom-tools-Send-color-picker-input' name='color' type='color' value={state.color} onChange={e => onChangeHandler(e)} />
                <div className='chatroom-tools-Send'>
                    <button className='chatroom-tools-content-submit-button' type='submit'><FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color)'}}
                                                                                                            icon={faArrowRight}/></button>
                </div>

            </form>
        </>
    );
};
export default ChatRoomTools;

// style={{visibility:'hidden'}}