import React, {useEffect} from 'react';
import MessengerConversationPreview from "./MessengerConversationPreview";
import {useSelector} from "react-redux";
import MessengerConversationListHeader from "./MessengerConversationListHeader";
import styled from "styled-components";
import {fetchConversations} from "../../../../store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "../../../../store_toolkit/hooks";

const MessengerConversationsListStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .no-message {
    color: var(--navigation-text-color, #ccc);
  }
`
const MessengerConversationsList = () => {
    const dispatch = useAppDispatch()
    // @ts-ignore
    const conversations = useSelector(store => store.user.conversations)
    // @ts-ignore
    const userData = useSelector(store => store.user.userData)

    useEffect(() => {
        if (userData?._id) {
            dispatch(fetchConversations(userData?._id))
        }
    }, [userData]);

    // @ts-ignore
    const renderConversationsPreview = (conversations || []).map((conversationData, index) => {
        return <MessengerConversationPreview key={index} conversationData={conversationData} userId={userData._id}/>
    })

    return (
        <MessengerConversationsListStyledDiv className='messenger-conversations-list'>
            <MessengerConversationListHeader/>
            {renderConversationsPreview}
            {!conversations || conversations?.length < 1 ? <p className='no-message'>there is no messages yet</p> : null}
        </MessengerConversationsListStyledDiv>
    );
};
export default MessengerConversationsList;
