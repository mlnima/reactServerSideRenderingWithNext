import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faBars, faHome, faPhoneAlt, faVideo} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const MessengerConversationHeader = ({profileImage,username,attemptForCall}) => {
    const router = useRouter()

    return (
        <div className='messenger-conversation-header'>
            <style jsx>{`
              .messenger-conversation-header{
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding:  10px;
                background-color: var(--navigation-background-color);
                height: 50px;
              }
              
              .messenger-conversation-header-back-btn,.messenger-conversation-header-call-btn,.messenger-conversation-header-video-call-btn{
                background-color: transparent;
                border: none;
                margin: 0 10px;
              }
              
              .messenger-conversation-header-profile-image{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-left:  10px;
              }
              .messenger-conversation-header-username{
                color:var(--navigation-text-color);
                margin-left:10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              
              .messenger-conversation-header-left{
                display: flex;
                align-items: center;
              }
              
              .messenger-conversation-header-right{
                display: flex;
                align-items: center;
              }
              
             `}</style>
            <div className='messenger-conversation-header-left'>
                <Link href={`/messenger`}  >
                    <a className='logged-in-item' rel='no-referrer'>
                        <FontAwesomeIcon style={{width: '24px',height: '24px',color:'var(--navigation-text-color)'}}  icon={faArrowLeft} className='messenger-conversation-header-back-btn-svg' />
                    </a>
                </Link>
                {
                    profileImage?
                        <img onClick={()=>router.push(`/user/${username}`)} src={profileImage || '/static/images/noImage/no-image-available.png'} alt="messenger-conversation-header-profile-image" className="messenger-conversation-header-profile-image"/>:
                        <div className="messenger-conversation-header-profile-image" style={{backgroundImage:'linear-gradient(to bottom right, var(--navigation-background-color), black)' }  }/>
                }

                <p className='messenger-conversation-header-username'>{username}</p>
            </div>
            <div className='messenger-conversation-header-right'>
                <button onClick={attemptForCall} className='messenger-conversation-header-video-call-btn'>
                    <FontAwesomeIcon style={{width: '24px',height: '24px',color:'var(--navigation-text-color)'}}  icon={faVideo} className='messenger-conversation-header-video-call-btn-svg' />
                </button>
                <button onClick={attemptForCall} className='messenger-conversation-header-call-btn'>
                    <FontAwesomeIcon style={{width: '24px',height: '24px',color:'var(--navigation-text-color)'}}  icon={faPhoneAlt} className='messenger-conversation-header-video-call-btn-svg' />
                </button>
            </div>

        </div>
    );
};
export default MessengerConversationHeader;
