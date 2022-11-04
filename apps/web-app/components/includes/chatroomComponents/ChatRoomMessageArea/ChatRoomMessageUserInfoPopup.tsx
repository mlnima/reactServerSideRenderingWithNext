import Link from "next/link";
import {useRouter} from "next/router";
import styled from "styled-components";
import {useSelector} from "react-redux";
import Draggable from 'react-draggable';
import {fetchStartConversation} from "../../../../store_toolkit/clientReducers/userReducer";
import {loginRegisterForm} from "../../../../store_toolkit/clientReducers/globalStateReducer";
import {setActiveVisibleProfile} from "../../../../store_toolkit/clientReducers/chatroomReducer";
import {useAppDispatch} from "../../../../store_toolkit/hooks";
import {Store} from "typescript-types";
import SvgRenderer from "../../../global/commonComponents/SvgRenderer/SvgRenderer";
import React from "react";

//modify-require
const ChatRoomMessageUserInfoPopupStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--popup-outer-background-color, rgba(0, 0, 0, .6));
  color: var(--popup-text-color, #fff);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  .chatroom-message-user-info-popup-content {
    background-color: var(--navigation-background-color, #18181b);
    width: 310px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .chatroom-message-user-info-popup-header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;

      .chatroom-message-user-info-popup-content-close-button {
        display: flex;
        background-color: transparent;
        color: var(--main-text-color);
        height: 20px;
        padding: 10px;
      }
    }


    .chatroom-message-user-info-popup-content-user-info {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;

      .chatroom-message-user-info-popup-content-userImage {
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }

      .chatroom-message-user-info-popup-user-data {
        margin: 0 5px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        height: 100%;
        width: 100%;

        .chatroom-message-user-info-popup-username {
          color: var(--main-text-color);
        }

        .chatroom-message-user-info-popup-user-data-links {
          display: flex;
          justify-content: space-evenly;
          flex-direction: row;
          width: 100%;

          .btn-primary {
            margin: 0 5px;
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
`

const ChatRoomMessageUserInfoPopup = () => {

    const {push} = useRouter();
    const dispatch = useAppDispatch();

    const {activeVisibleProfile, loggedIn, userId} = useSelector(({chatroom, user}: Store) => {
        return {
            activeVisibleProfile: chatroom?.activeVisibleProfile,
            userId: user?.userData?._id,
            loggedIn: user?.loggedIn
        }
    })

    const onConversationHandler = () => {
        if (loggedIn) {
            dispatch(fetchStartConversation({_id: activeVisibleProfile._id, push}))
        } else {
            dispatch(loginRegisterForm('register'))
        }
    }

    if (activeVisibleProfile.username && activeVisibleProfile._id) {
        return (
            <ChatRoomMessageUserInfoPopupStyledDiv className='chatroom-message-user-info-popup'>


                <Draggable handle=".chatroom-message-user-info-popup-header">
                    <div className='chatroom-message-user-info-popup-content'>
                        <div className={'chatroom-message-user-info-popup-header'}>
                            <span onClick={() => {
                                dispatch(setActiveVisibleProfile({}))
                            }}
                                  onTouchStart={() => {
                                      dispatch(setActiveVisibleProfile({}))
                                  }}
                                  className='chatroom-message-user-info-popup-content-close-button'>
                                <SvgRenderer svgUrl={'/asset/images/icons/xmark-solid.svg'}
                                             size={25}
                                             customClassName={'download-logo'}
                                             color={'var(--navigation-text-color,#ccc)'}/>
                            </span>
                        </div>

                        <div className='chatroom-message-user-info-popup-content-user-info'>
                            <img className='chatroom-message-user-info-popup-content-userImage'
                                 src={activeVisibleProfile.profileImage ? activeVisibleProfile.profileImage :
                                     '/asset/images/user/noGenderAvatar150.jpg'}
                                 onError={e => e.currentTarget.src = '/asset/images/user/noGenderAvatar150.jpg'}
                                 alt="chatroom-message-user"
                            />
                            {userId !== activeVisibleProfile._id ?
                                <div className='chatroom-message-user-info-popup-user-data'>
                                    <p className='chatroom-message-user-info-popup-username'>{activeVisibleProfile.username}</p>
                                    <div className='chatroom-message-user-info-popup-user-data-links'>
                                        <Link href={`/user/${activeVisibleProfile.username}`}
                                              className={'btn btn-primary'}>

                                            <SvgRenderer svgUrl={'/asset/images/icons/eye-regular.svg'}
                                                         size={24}
                                                         customClassName={'view-profile'}
                                                         color={'var(--navigation-text-color,#ccc)'}/>
                                        </Link>
                                        <button onClick={onConversationHandler} className={'btn btn-primary'}>

                                            <SvgRenderer svgUrl={'/asset/images/icons/rocketchat-brands.svg'}
                                                         size={24}
                                                         customClassName={'send-message'}
                                                         color={'var(--navigation-text-color,#ccc)'}/>
                                        </button>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </Draggable>
            </ChatRoomMessageUserInfoPopupStyledDiv>
        );
    } else return null

};
export default ChatRoomMessageUserInfoPopup;
