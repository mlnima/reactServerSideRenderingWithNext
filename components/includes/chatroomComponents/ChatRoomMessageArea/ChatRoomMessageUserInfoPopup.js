import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import {conversation} from "../../../../_variables/_userSocialAjaxVariables";
import {useRouter} from "next/router";
import {withTranslation} from "next-i18next";

import styled from "styled-components";
const ChatRoomMessageUserInfoPopupStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .8);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  .chatroom-message-user-info-popup-content {
    background-color: var(--navigation-background-color);
    width: 310px;
    //height: 200px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .chatroom-message-user-info-popup-content-close-button {
      align-self: flex-end;
      background-color: transparent;
      color: var(--main-text-color);
      height: 20px;
      padding: 10px;
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
          //align-items: center;
          flex-direction: column;
          width: 100%;
          button {
            border: none;
            color: var(--main-text-color);
            font-size: 1rem;
           
            width: 100%;
            margin: 10px 0;
            padding: 5px 10px;
            &:active{
              box-shadow: none;
            }
          }

          a {
            padding: 5px 10px;
            color: var(--main-text-color);
            font-size: 1rem;
            margin: 10px 0;
            &:active{
              box-shadow: none;
            }
          }
        }
      }
    }
  }
`

const ChatRoomMessageUserInfoPopup = ({t, userInfo, onUserInfoShowHandler}) => {
    const router = useRouter()

    const onConversationHandler = () => {
        conversation(userInfo.userId).then(res => {
            const conversation = res.data.conversation
            router.push(`/messenger/${conversation._id}`)
        }).catch(err => {
            console.log(err)
        })
    }

    if (userInfo.username) {
        return (
            <ChatRoomMessageUserInfoPopupStyledDiv className='chatroom-message-user-info-popup'>

                <div className='chatroom-message-user-info-popup-content'>
                 <span onClick={onUserInfoShowHandler} className='chatroom-message-user-info-popup-content-close-button'>
                    <FontAwesomeIcon style={{width: '20px', height: '20px'}} icon={faTimes}/>
                 </span>
                    <div className='chatroom-message-user-info-popup-content-user-info'>
                        <img className='chatroom-message-user-info-popup-content-userImage' src={userInfo.profileImage ? userInfo.profileImage : '/public/asset/images/user/noGenderAvatar150.jpg'} alt=""/>
                        <div className='chatroom-message-user-info-popup-user-data'>
                            <p className='chatroom-message-user-info-popup-username'>{userInfo.username}</p>
                            <div className='chatroom-message-user-info-popup-user-data-links'>
                                <Link href={`/user/${userInfo.username}`}>
                                    <a className={'action-client-button-link'}>
                                        {t([`common:View Profile`])}

                                    </a>
                                </Link>
                                <button onClick={onConversationHandler} className={'action-client-button-link'}>
                                    {t([`common:Send Message`])}
                                </button>
                            </div>
                        </div>

                    </div>


                </div>
            </ChatRoomMessageUserInfoPopupStyledDiv>
        );
    } else return null

};
export default withTranslation(['common'])(ChatRoomMessageUserInfoPopup);
