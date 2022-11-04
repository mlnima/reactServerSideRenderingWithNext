import React, {useEffect, useState} from 'react';
import moment from "moment";
import Link from "next/link";
import styled from "styled-components";
import {fetchDeleteConversation} from "../../../../store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "../../../../store_toolkit/hooks";
import SvgRenderer from "../../../global/commonComponents/SvgRenderer/SvgRenderer";
// import {deleteConversation} from "../../../../store/clientActions/userActions";

const MessengerConversationPreviewStyledDiv = styled.div`
  width: calc(100% - 20px);
  display: flex;
  justify-content: center;
  align-items: center;

  .messenger-conversation-preview {
    width: calc(100% - 20px);
    padding: 5px 10px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 4px auto 4px auto;
    text-decoration: none;

    .messenger-conversation-preview-image {
      width: 30px;
      height: 30px;
      margin: 0 5px;
      border-radius: 50%;
      color: var(--navigation-text-color, #ccc);
    }

    .messenger-conversation-content-preview {
      display: flex;
      padding: 0 5px;
      flex-direction: column;
      width: calc(100% - 10px);

      .messenger-conversation-preview-username-date {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--navigation-text-color, #ccc);

        .messenger-conversation-preview-username {
          margin: 4px 0;
        }

        .messenger-conversation-preview-date {
          margin: 4px 0;
        }
      }

      .messenger-conversation-preview-last-message {
        margin: 0;
        color: var(--navigation-text-color, #ccc);
      }
    }


  }

  .conversation-actions {
    color: var(--navigation-text-color, #ccc);
    padding: 2px 5px;
    position: relative;

    svg {
      width: 24px;
      height: 24px;
    }

    .action-menu {
      position: absolute;
    }
  }

  @media only screen and (min-width: 768px) {
    width: 450px;
    .messenger-conversation-preview {

    }
  }
`
const MessengerConversationPreview = ({conversationData, userId}) => {
    const dispatch = useAppDispatch()
    const [state, setState] = useState({
        username: '',
        profileImage: '',
        messageBody: '',
        date: ''
    });
    const [actionMenu, setActionMenu] = useState(false);


    useEffect(() => {
        setState({
            ...state,
            username: conversationData?.users ? conversationData.users.find(u => u._id !== userId)?.username : '',
            profileImage: conversationData?.users ? conversationData.users.find(u => u._id !== userId)?.profileImage : '/asset/images/default/no-image-available.png',
            messageBody: conversationData?.messages?.[0]?.messageBody,
            date: conversationData?.updatedAt ?
                moment(new Date(conversationData.updatedAt), "YYYYMMDD").fromNow(false)
                : ''
        })
    }, []);


    const onDeleteConversationHandler = () => {
        conversationData._id ?
            dispatch(fetchDeleteConversation(conversationData._id)) :
            null
    }


    return (
        <MessengerConversationPreviewStyledDiv>
            <Link href={`/messenger/${conversationData._id}`} className='messenger-conversation-preview'>

                    {state.profileImage ?
                        <img className='messenger-conversation-preview-image' src={state.profileImage} alt=""/> :
                        <SvgRenderer svgUrl={'/asset/images/icons/circle-user-solid.svg'}
                                     size={20}
                                     customClassName={'messenger-conversation-preview-image'}
                                     color={'var(--navigation-text-color, #ccc)'}/>

                    }

                    <div className='messenger-conversation-content-preview'>
                        <div className='messenger-conversation-preview-username-date'>
                            <p className='messenger-conversation-preview-username'>{state.username}</p>
                            <p className='messenger-conversation-preview-date'>{state.date}</p>
                        </div>
                        <p className='messenger-conversation-preview-last-message'>{state.messageBody}</p>
                    </div>
            </Link>
            <span className={'conversation-clientActions'}>
        <span onClick={() => actionMenu ? setActionMenu(false) : setActionMenu(true)}>
                   <SvgRenderer svgUrl={'/asset/images/icons/envelope-solid.svg'}
                                size={20}
                                color={'var(--navigation-text-color, #ccc)'}/>
        </span>


                {actionMenu ?
                    <div className={'action-menu'}>
                        <button onClick={onDeleteConversationHandler} className={'btn btn-danger'}>
                            <SvgRenderer svgUrl={'/asset/images/icons/trash-can-solid.svg'}
                                         size={20}
                                         color={'var(--navigation-text-color, #ccc)'}/>
                        </button>
                    </div> : null
                }

            </span>
        </MessengerConversationPreviewStyledDiv>
    );
};
export default MessengerConversationPreview;