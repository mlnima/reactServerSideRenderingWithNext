import React, {FC, useEffect, useRef} from 'react';
import Message from "../Message/Message";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {uniqArrayBy} from 'custom-util'
import {Styles} from "./MessagingArea.styles";
import {useAppDispatch} from "@store_toolkit/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments} from "@fortawesome/free-solid-svg-icons/faComments";
import {setAutoScroll} from "@store_toolkit/clientReducers/messengerReducer";
import sortArrayByPropertyOfObject from "custom-util/src/array-utils/sortArrayByPropertyOfObject";


interface IProps {
    isActiveConversation?: boolean,
    loadOlderMessages?: () => void
}


const MessagingArea: FC<IProps> = ({isActiveConversation,loadOlderMessages}) => {
    const prevScrollPosition = useRef(0);
    const dispatch = useAppDispatch();
    const messageAreaRef = useRef<null | HTMLDivElement>(null)
    const {activeConversation, autoScroll, isMaximized} = useSelector(({messenger}: Store) => messenger);
    const {headerSize} = useSelector(({globalState}: Store) => globalState);
    const {userData} = useSelector(({user}: Store) => user)


    useEffect(() => {
        if (autoScroll && messageAreaRef.current) {
            //@ts-ignore
            messageAreaRef.current.scroll({
                //@ts-ignore
                top: messageAreaRef.current.scrollHeight + 50,
                behavior: 'smooth',
            });
        }
    }, [autoScroll, activeConversation?.messages]);


    useEffect(() => {
        const handleScroll = (event) => {
            const {scrollTop, clientHeight, scrollHeight} = event.target;

            if (prevScrollPosition.current > scrollTop) {
                dispatch(setAutoScroll(false))
            } else if (scrollTop + clientHeight >= scrollHeight - 5) {
                dispatch(setAutoScroll(true))
            }
            prevScrollPosition.current = scrollTop;

            if (scrollTop === 0 && activeConversation?._id) {
                //@ts-ignore
                loadOlderMessages()
                setTimeout(() => {
                    if (messageAreaRef.current) {
                        messageAreaRef.current.scroll({
                            top: 1,
                            behavior: 'smooth',
                        });
                    }
                }, 500);
            }
        };

        const messageArea = messageAreaRef.current;
        messageArea?.addEventListener('scroll', handleScroll);
        return () => messageArea?.removeEventListener('scroll', handleScroll);
    }, [activeConversation?.messages]);


    return (
        <Styles ref={messageAreaRef}
                className={'messenger-conversation-message-area custom-scroll'}
                isMaximized={isMaximized}
                headerSize={headerSize + 110}>

            <div className={'messenger-conversation-background'}>
                <FontAwesomeIcon icon={faComments}/>
            </div>

            {isActiveConversation &&
                <div className={'messages'}>
                    {activeConversation?.messages?.length ?
                        sortArrayByPropertyOfObject(
                            uniqArrayBy((activeConversation?.messages || []), 'createdAt'),
                            'createdAt',
                            'asc'
                        )

                        .map((message: any) => {
                            return (
                                <Message
                                    key={message._id}
                                    message={message}
                                    isMine={message?.sender === userData?._id}
                                />
                            )
                        })
                        : null
                    }
                </div>
            }


        </Styles>
    );
};
export default MessagingArea;


