import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {useRouter} from "next/router";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setActiveVisibleProfile} from "@store/clientActions/chatroomActions";
import Draggable from 'react-draggable';
import {setLoginRegisterFormStatus} from "@store/clientActions/globalStateActions";
import {conversation} from "@store/clientActions/userActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

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
        // align-self: flex-end;
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

            .icon {
              width: 24px !important;
              height: 24px !important;
              background-color: var(--primary-button-link-text-color, #000);
            }

            .send-message {
              mask: url('/public/asset/images/icons/rocketchat-brands.svg') no-repeat center;
              -webkit-mask: url('/public/asset/images/icons/rocketchat-brands.svg') no-repeat center;
            }

            //eye-regular.svg
            .view-profile {
              mask: url('/public/asset/images/icons/eye-regular.svg') no-repeat center;
              -webkit-mask: url('/public/asset/images/icons/eye-regular.svg') no-repeat center;
            }

          }

        }
      }
    }
  }
`

const ChatRoomMessageUserInfoPopup = () => {

    const {push} = useRouter();
    const dispatch = useDispatch();

    const {activeVisibleProfile, loggedIn, userId} = useSelector(({chatroom, user}: StoreTypes) => {
        return {
            activeVisibleProfile: chatroom?.activeVisibleProfile,
            userId: user?.userData._id,
            loggedIn: user?.loggedIn
        }
    })

    const onConversationHandler = () => {
        if (loggedIn) {
            dispatch(conversation(activeVisibleProfile._id, push))
        } else {
            dispatch(setLoginRegisterFormStatus('register'))
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
                                         }} onTouchStart={() => {
                                             dispatch(setActiveVisibleProfile({}))
                                         }}
                                               className='chatroom-message-user-info-popup-content-close-button'>
                    <FontAwesomeIcon style={{width: '20px', height: '20px'}} icon={faTimes}/>
                 </span>
                        </div>

                        <div className='chatroom-message-user-info-popup-content-user-info'>
                            <img className='chatroom-message-user-info-popup-content-userImage'
                                 src={
                                     activeVisibleProfile.profileImage ?
                                         activeVisibleProfile.profileImage :
                                         '/public/asset/images/user/noGenderAvatar150.jpg'
                                 }
                                 alt="chatroom-message-user"
                            />
                            {userId !== activeVisibleProfile._id ?
                                <div className='chatroom-message-user-info-popup-user-data'>
                                    <p className='chatroom-message-user-info-popup-username'>{activeVisibleProfile.username}</p>
                                    <div className='chatroom-message-user-info-popup-user-data-links'>
                                        <Link href={`/user/${activeVisibleProfile.username}`}>
                                            <a className={'btn btn-primary'}>
                                                <span className={'icon view-profile'}/>
                                            </a>
                                        </Link>
                                        <button onClick={onConversationHandler} className={'btn btn-primary'}>
                                            <span className={'icon send-message'}/>
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