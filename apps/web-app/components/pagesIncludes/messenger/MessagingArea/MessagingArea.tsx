import React, {FC, useEffect, useRef} from 'react';
import Message from "../Message/Message";
import {uniqArrayBy} from 'custom-util'
import {Styles} from "./MessagingArea.styles";
import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments} from "@fortawesome/free-solid-svg-icons/faComments";
import {sortArrayByPropertyOfObject} from 'custom-util';
import {setMessengerState} from "@store_toolkit/clientReducers/messengerReducer";

interface IProps {
    onLoadOlderMessages: () => void
    messageAreaRef: React.RefObject<HTMLDivElement>
}

const MessagingArea: FC<IProps> = ({onLoadOlderMessages, messageAreaRef}) => {
    const prevScrollPosition = useRef(0);
    const dispatch = useAppDispatch();

    const {autoScroll, isMaximized} = useAppSelector(({messenger}) => messenger);
    const {headerSize} = useAppSelector(({globalState}) => globalState);
    const {userData} = useAppSelector(({user}) => user)
    const {activeConversation} = useAppSelector(({messenger}) => messenger);

    useEffect(() => {

        setTimeout(() => {
            if (autoScroll && messageAreaRef?.current) {
                messageAreaRef.current.scroll({
                    //@ts-ignore
                    top: messageAreaRef.current.scrollHeight + 50,
                    behavior: 'smooth',
                });
            }
        }, 500)

    }, [autoScroll, activeConversation?.messages]);


    useEffect(() => {
        const handleScroll = (event) => {
            const {scrollTop, clientHeight, scrollHeight} = event.target;

            if (prevScrollPosition.current > scrollTop) {
                dispatch(setMessengerState({autoScroll: false}))
            } else if (scrollTop + clientHeight >= scrollHeight - 5) {
                dispatch(setMessengerState({autoScroll: true}))
            }
            prevScrollPosition.current = scrollTop;

            if (scrollTop === 0 && activeConversation?._id) {
                onLoadOlderMessages()
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

            {!!activeConversation &&
                <div className={'messages'}>
                    {activeConversation?.messages?.length ?
                        sortArrayByPropertyOfObject(
                            uniqArrayBy((activeConversation?.messages || []), '_id'),
                            'createdAt',
                            'asc'
                        )
                            .map((message: any) => {
                                return (
                                    <Message
                                        key={message._id}
                                        messageData={message}
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


