import {useRouter} from "next/router";
import Link from "next/link";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {faVideo} from "@fortawesome/free-solid-svg-icons/faVideo";

const MessengerConversationHeaderStyledDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--secondary-background-color, #181818);
  height: 56px;

  .messenger-conversation-header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    .back-btn-image-username {
      display: flex;
      align-items: center;
      justify-content: center;


      .messenger-conversation-header-back-btn {
        background-color: transparent;
        border: none;
        margin: 0 10px;
      }

      .messenger-conversation-header-profile-image {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-left: 10px;
        cursor: pointer;
      }

      .messenger-conversation-header-username {
        color: var(--main-text-color, #fff);
        margin: 0 0 0 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }
    }

    .call-buttons {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        cursor: pointer;
      }
    }

  }

  .messenger-conversation-header-back-btn, .messenger-conversation-header-call-btn, .messenger-conversation-header-video-call-btn {
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const MessengerConversationHeader = ({profileImage, username, callUser}) => {
    const router = useRouter()

    return (
        <MessengerConversationHeaderStyledDiv className='messenger-conversation-header'>
            <div className='messenger-conversation-header'>
                <div className='back-btn-image-username'>

                    <Link href={`/messenger`}
                          className='messenger-conversation-header-back-btn'
                          rel='no-referrer'>
                        <FontAwesomeIcon className={'messenger-conversation-header-back-btn-svg'}
                                         icon={faArrowLeft} style={{width:25,height:25}}/>
                    </Link>
                    <img onClick={() => router.push(`/user/${username}`)}
                         src={profileImage ? profileImage : '/asset/images/user/noGenderAvatar150.jpg'}
                         alt="messenger-conversation-header-profile-image"
                         className="messenger-conversation-header-profile-image"/>
                    <p onClick={() => router.push(`/user/${username}`)}
                       className='messenger-conversation-header-username'>{username}</p>
                </div>
                <div className='call-buttons'>
                    <button onClick={callUser} className='messenger-conversation-header-video-call-btn'>
                        <FontAwesomeIcon className={'messenger-conversation-header-video-call-btn-svg'}
                                         icon={faVideo} style={{width:25,height:25}}/>
                    </button>
                    {/*<button onClick={attemptForCall} className='messenger-conversation-header-call-btn'>*/}
                    {/*    <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--main-text-color, #fff)'}} icon={faPhoneAlt} className='messenger-conversation-header-video-call-btn-svg'/>*/}
                    {/*</button>*/}
                </div>
            </div>
        </MessengerConversationHeaderStyledDiv>
    );
};
export default MessengerConversationHeader;
