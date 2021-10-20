import {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {conversation} from "../../../../_variables/_userSocialAjaxVariables";
import {useRouter} from "next/router";
import {withTranslation} from "next-i18next";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setActiveVisibleProfile} from "../../../../store/actions/chatroomActions";
import Draggable from 'react-draggable';


const ChatRoomMessageUserInfoPopupStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--popup-outer-background-color,rgba(0,0,0,.6));
  color:var(--popup-text-color,#fff);
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

    .chatroom-message-user-info-popup-header{
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

        .chatroom-message-user-info-popup-username {
          color: var(--main-text-color);
        }

        .chatroom-message-user-info-popup-user-data-links {
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          width: 100%;
          .btn-primary{
            margin: 0 5px;
          }
          
        }
      }
    }
  }
`

const ChatRoomMessageUserInfoPopup = ({t}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const activeVisibleProfile = useSelector(state => state.chatroom.activeVisibleProfile);

    const onConversationHandler = () => {
        conversation(activeVisibleProfile._id).then(res => {
            const conversation = res.data.conversation
            router.push(`/messenger/${conversation._id}`)
        }).catch(err => {
            console.log(err)
        })
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
                        <div className='chatroom-message-user-info-popup-user-data'>
                            <p className='chatroom-message-user-info-popup-username'>{activeVisibleProfile.username}</p>
                            <div className='chatroom-message-user-info-popup-user-data-links'>
                                <Link href={`/user/${activeVisibleProfile.username}`}>
                                    <a className={'btn btn-primary'}>
                                        {t([`common:View Profile`])}

                                    </a>
                                </Link>
                                <button onClick={onConversationHandler} className={'btn btn-primary'}>
                                    {t([`common:Send Message`])}
                                </button>
                            </div>
                        </div>

                    </div>


                </div>
                </Draggable>
            </ChatRoomMessageUserInfoPopupStyledDiv>
        );
    } else return null

};
export default withTranslation(['common'])(ChatRoomMessageUserInfoPopup);
