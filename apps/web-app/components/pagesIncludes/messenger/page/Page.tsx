import React, {FC, useEffect, useRef, useState} from "react";
import {Styles} from "@components/pagesIncludes/messenger/page/Styles";
import {Styles as MessagingAreaStyle} from "../MessagingArea/MessagingArea.styles";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {useAppDispatch} from "@store_toolkit/hooks";
import {useIsMobile} from "react-hooker-lib";
import {getHeaderSizeAction} from "@store_toolkit/clientReducers/globalStateReducer";
import {getConversationsListAction} from "@store_toolkit/clientReducers/messengerActions/getConversationsListAction";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import MessengerConfigs from "@components/pagesIncludes/messenger/MessengerConfigs/MessengerConfigs";
import MessengerConversationsList
    from "@components/pagesIncludes/messenger/MessengerConversationsList/MessengerConversationsList";
import MessengerHeader from "@components/pagesIncludes/messenger/MessengerHeader/MessengerHeader";
import MessagingArea from "@components/pagesIncludes/messenger/MessagingArea/MessagingArea";
import Link from "next/link";
import MessengerMultiMediaInputBox
    from "@components/pagesIncludes/messenger/MessengerMultiMediaInputBox/MessengerMultiMediaInputBox";
import {socket} from "custom-util/src/socket-utils/socketIoClient";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments} from "@fortawesome/free-solid-svg-icons/faComments";
import {
    cleanActiveConversation,
    newMessageInActiveConversation,
    setIsConversationsMenuOpen
} from "@store_toolkit/clientReducers/messengerReducer";
import {deleteAConversationAction} from "@store_toolkit/clientReducers/messengerActions/deleteAConversation";
import {getAConversationAction} from "@store_toolkit/clientReducers/messengerActions/getAConversationAction";
import {
    loadOlderMessagesAction
} from "@store_toolkit/clientReducers/messengerActions/loadOlderMessagesAction";

interface IProps {

}

const Page: FC<IProps> = ({}) => {

    //hooks
    const dispatch = useAppDispatch()
    const isMobile = useIsMobile();

    //states
    const [skip, setSkip] = useState(0)
    const [audioMessage, setAudioMessage] = useState<string>('')
    const [imageMessage, setImageMessage] = useState<string>('')
    const [textMessage, setTextMessage] = useState('')
    //refs
    const imageInputRef = useRef<HTMLInputElement>(null);
    const hasRun = useRef(false);
    //storeContent
    const {loggedIn} = useSelector(({user}: Store) => user)
    const {userData} = useSelector(({user}: Store) => user)
    const {headerSize} = useSelector(({globalState}: Store) => globalState);
    const {
        isMaximized,
        isConversationsMenuOpen,
        activeConversation,
        conversationsList
    } = useSelector(({messenger}: Store) => messenger);
    const isActiveConversation = useSelector(({messenger}: Store) => !!messenger?.activeConversation?._id);


    useEffect(() => {
        const handleGetPrivateMessage = (messageData) => {
            console.log('console=> ', messageData)
            dispatch(newMessageInActiveConversation(messageData));
        };

        socket.on("getPrivateMessage", handleGetPrivateMessage);

        // Clean up the listener when the component unmounts
        return () => {
            socket.off("getPrivateMessage", handleGetPrivateMessage);
        };
    }, []); // Empty dependency array ensures this effect runs only once


    useEffect(() => {
        if (activeConversation?._id && !hasRun.current) {
            socket.emit("joinConversation", activeConversation?._id);
            hasRun.current = true;
        }
    }, [activeConversation]);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            dispatch(getHeaderSizeAction(null))
        }
    }, [isMobile]);

    useEffect(() => {
        onGetConversationListHandler()
    }, [skip]);


    const onGetConversationListHandler = () =>{
        dispatch(getConversationsListAction({limit: 10, skip: conversationsList?.length || 0}))
    }


    //handlers

    const onStartTypingHandler = () => {

    }

    const onDeleteConversationHandler = (conversationId) => {
        dispatch(deleteAConversationAction(conversationId))
    }

    const onSelectConversation = (conversationId) => {
        dispatch(getAConversationAction({conversationId}))
    }

    const conversationsMenuTriggerHandler=(value)=>{
        dispatch(setIsConversationsMenuOpen(value))
    }

    const loadOlderMessages = () => {
        if (activeConversation?._id) {
            dispatch(loadOlderMessagesAction({
                limit: 10,
                skip: activeConversation?.messages?.length || 0,
                conversationId: activeConversation._id
            }))
        }
    }


    const onSubmitHandler = (event) => {
        event.preventDefault()
        if (userData?._id && activeConversation?._id) {
            const messageData = {
                content: textMessage,
                imageContent: imageMessage,
                audioContent: audioMessage,
                createdAt: Date.now(),
                sender: userData._id,
                conversation: activeConversation._id
            }
            socket.emit('sendPrivateMessage', messageData)
            setTimeout(() => {
                setTextMessage('')
            }, 100)
        }
    }

    return (

        <Styles isConversationsMenuOpen={isConversationsMenuOpen}
                id={'full-width-content'}
                isMaximized={isMaximized}
                className={'messenger-page main'}>

            <HeadSetter title={'Messenger'}/>
            {loggedIn &&
                <div className={'inner-content'}>
                    <div className={'conversations-controls'}>

                        {isConversationsMenuOpen && <MessengerConfigs/>}
                        {isConversationsMenuOpen &&
                            <MessengerConversationsList onSelectConversation={onSelectConversation}
                                                        onGetConversationListHandler={onGetConversationListHandler}/>
                        }
                    </div>

                    <div className={'messaging'}>

                        <MessengerHeader isActiveConversation={!!activeConversation?._id} conversationsMenuTriggerHandler={conversationsMenuTriggerHandler}/>
                        <MessagingArea isActiveConversation={isActiveConversation}
                                       loadOlderMessages={loadOlderMessages}/>
                        <MessengerMultiMediaInputBox
                            textMessage={textMessage}
                            setTextMessage={setTextMessage}
                            imageMessage={imageMessage}
                            setImageMessage={setImageMessage}
                            audioMessage={audioMessage}
                            setAudioMessage={setAudioMessage}
                            onStartTypingHandler={onStartTypingHandler}
                            imageInputRef={imageInputRef}
                            isActive={isActiveConversation}
                            onSubmitHandler={onSubmitHandler}/>
                    </div>
                </div>
            }
            {!loggedIn &&
                <div className={'inner-content'}>
                    <Link href={'/register'} className='messenger-page-register-page-link'>
                        You need to create an account in order to access this page
                    </Link>
                </div>
            }
        </Styles>
    )
};
export default Page
