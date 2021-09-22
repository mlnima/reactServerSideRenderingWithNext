import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faBars, faHome, faPhoneAlt, faVideo} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styled from "styled-components";

const MessengerConversationHeaderStyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: var(--navigation-background-color);
  height: 50px;

  .messenger-conversation-header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    .back-btn-image-username {
      display: flex;
      align-items: center;

      .messenger-conversation-header-back-btn {
        background-color: transparent;
        border: none;
        margin: 0 10px;
      }

      .messenger-conversation-header-profile-image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 10px;
      }

      .messenger-conversation-header-username {
        color: var(--navigation-text-color);
        margin-left: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    
    .call-buttons{
      display: flex;
      justify-content: center;
      align-items: center;
    }

  }

  .messenger-conversation-header-back-btn, .messenger-conversation-header-call-btn, .messenger-conversation-header-video-call-btn {
    background-color: transparent;
    border: none;
    margin: 0 10px;
  }
`
const MessengerConversationHeader = ({profileImage, username, attemptForCall}) => {
    const router = useRouter()

    return (
        <MessengerConversationHeaderStyledDiv className='messenger-conversation-header'>
            <style jsx>{`
              .messenger-conversation-header-right {
                display: flex;
                align-items: center;
              }

            `}</style>
            <div className='messenger-conversation-header'>
                <div className='back-btn-image-username'>
                    <Link href={`/messenger`}>
                        <a className='messenger-conversation-header-back-btn' rel='no-referrer'>
                            <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color)'}} icon={faArrowLeft} className='messenger-conversation-header-back-btn-svg'/>
                        </a>
                    </Link>
                    <img onClick={() => router.push(`/user/${username}`)} src={profileImage ? profileImage : '/public/asset/images/user/noGenderAvatar150.jpg'} alt="messenger-conversation-header-profile-image" className="messenger-conversation-header-profile-image"/>

                    <p className='messenger-conversation-header-username'>{username}</p>
                </div>
                <div className='call-buttons'>
                    <button onClick={attemptForCall} className='messenger-conversation-header-video-call-btn'>
                        <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color)'}} icon={faVideo} className='messenger-conversation-header-video-call-btn-svg'/>
                    </button>
                    <button onClick={attemptForCall} className='messenger-conversation-header-call-btn'>
                        <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color)'}} icon={faPhoneAlt} className='messenger-conversation-header-video-call-btn-svg'/>
                    </button>
                </div>
            </div>
        </MessengerConversationHeaderStyledDiv>
    );
};
export default MessengerConversationHeader;
