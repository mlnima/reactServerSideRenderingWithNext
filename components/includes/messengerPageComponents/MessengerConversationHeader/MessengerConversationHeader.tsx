import {useRouter} from "next/router";
import Link from "next/link";
import styled from "styled-components";
import SvgRenderer from "@components/global/commonComponents/SvgRenderer/SvgRenderer";

const MessengerConversationHeaderStyledDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--navigation-background-color, #18181b);
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
        color: var(--navigation-text-color, #ccc);
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

                    <Link href={`/messenger`}>
                        <a className='messenger-conversation-header-back-btn' rel='no-referrer'>
                            <SvgRenderer svgUrl={'/public/asset/images/icons/arrow-left-solid.svg'}
                                         size={25}
                                         customClassName={'messenger-conversation-header-back-btn-svg'}
                                         color={'var(--navigation-text-color, #ccc)'}/>
                        </a>
                    </Link>
                    <img onClick={() => router.push(`/user/${username}`)}
                         src={profileImage ? profileImage : '/public/asset/images/user/noGenderAvatar150.jpg'}
                         alt="messenger-conversation-header-profile-image"
                         className="messenger-conversation-header-profile-image"/>
                    <p onClick={() => router.push(`/user/${username}`)}
                       className='messenger-conversation-header-username'>{username}</p>
                </div>
                <div className='call-buttons'>
                    <button onClick={callUser} className='messenger-conversation-header-video-call-btn'>
                        <SvgRenderer svgUrl={'/public/asset/images/icons/video-solid.svg'}
                                     size={25}
                                     customClassName={'messenger-conversation-header-video-call-btn-svg'}
                                     color={'var(--navigation-text-color, #ccc)'}/>
                    </button>
                    {/*<button onClick={attemptForCall} className='messenger-conversation-header-call-btn'>*/}
                    {/*    <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color, #ccc)'}} icon={faPhoneAlt} className='messenger-conversation-header-video-call-btn-svg'/>*/}
                    {/*</button>*/}
                </div>
            </div>
        </MessengerConversationHeaderStyledDiv>
    );
};
export default MessengerConversationHeader;
