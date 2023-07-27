import React, {FC, useEffect} from "react";
import styled from "styled-components";
import {capitalizeFirstLetters} from "custom-util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";
import {faMaximize} from "@fortawesome/free-solid-svg-icons/faMaximize";
import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";
import {faMinimize} from "@fortawesome/free-solid-svg-icons/faMinimize";
import {useRouter} from "next/router";
import {faArrowDownWideShort} from "@fortawesome/free-solid-svg-icons/faArrowDownWideShort";
import {setMessengerState} from "@store_toolkit/clientReducers/messengerReducer";


const Style = styled.div`
  height: 45px;
  padding: 8px 8px;
  box-sizing: border-box;
  background-color: var(--secondary-background-color, #181818);
  color: var(--secondary-text-color, #ccc);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: var(--default-border);
  border-bottom: var(--default-border);
  grid-area: chatroomTopbar;

  .chatroom-selector {
    width: auto;
    outline: none;
    border: none;
  }

  .chatroom-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;


interface IButton {
    active?: boolean
}

const StyledButton = styled.button<IButton>`
  border: none;
  outline: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({active}) => active ? 'var(--primary-active-color, #f90)' : 'var(--secondary-text-color, #ccc)'} ;
  svg{
     width: 25px;
    height: 25px;
  }
`


interface PropTypes {
    chatrooms: { name: string, _id: string }[],
    chatroomId: string,
    onOnlineUserListVisibilityChangeHandler: any,
    onlineUserListVisibility: boolean
    autoScroll: boolean,
    setAutoScroll: Function
}

const ChatroomTopbar: FC<PropTypes> = (
    {
        chatrooms,
        chatroomId,
        autoScroll,
        setAutoScroll,
        onlineUserListVisibility,
        onOnlineUserListVisibilityChangeHandler
    }) => {
    const {push, asPath} = useRouter()
    const isMaximized = useAppSelector(({chatroom}) => chatroom.isMaximized)
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => {
            if (localStorage.isMaximized === 'true') {
                dispatch(setMessengerState({isMaximized:true}))
            }
        }, 100)
    }, [asPath]);

    const onSetMaximizedHandler = () => {
        dispatch(setMessengerState({isMaximized:true}))
        localStorage.setItem('isMaximized', (!isMaximized).toString())
    }

    const onChatroomChangeHandler = (e) => {
        push(`/chatroom/${e.target.value}`)
    }

    return (
        <Style>
            <select className={'custom-select chatroom-selector'} onChange={e => onChatroomChangeHandler(e)}
                    value={chatroomId}>
                {(chatrooms || []).map(chatroom => {
                    return (
                        <option value={chatroom._id}
                                key={chatroom._id}>
                            {capitalizeFirstLetters(chatroom.name)}
                        </option>
                    )
                })}
            </select>
            <div className="chatroom-actions">
                <StyledButton active={autoScroll} onClick={()=>setAutoScroll(!autoScroll)}
                              className={'chatroomTopBarActionButton'}>
                    <FontAwesomeIcon icon={faArrowDownWideShort}/>
                </StyledButton>
                <StyledButton active={isMaximized} className='chatroomTopBarActionButton'
                              onClick={onSetMaximizedHandler}>
                    <FontAwesomeIcon icon={isMaximized ? faMinimize : faMaximize}/>
                </StyledButton>
                <StyledButton active={onlineUserListVisibility} className='chatroomTopBarActionButton'
                              onClick={onOnlineUserListVisibilityChangeHandler}>
                    <FontAwesomeIcon icon={faUsers}/>
                </StyledButton>
            </div>

        </Style>
    )
};
export default ChatroomTopbar;