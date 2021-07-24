import {useContext} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {faBell, faEnvelope, faUser} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

const LoggedInItemsForMenu = props => {
    const contextData = useContext(AppContext);

    if (contextData.userData.username && contextData.userData.username !== 'guest' ) {
        return (
            <div className='logged-in-items'>
            <style jsx>{`
                .logged-in-items{
                    display: flex;
                    align-items: center;
                }
                .logged-in-item{
                    color: var(--navigation-text-color);
                    width: 20px;
                    margin: 0 10px;
                    padding: 0;
                    place-items: center;
                }
                .svg-logo-small{
                    color: var(--navigation-text-color);
                    max-width: 15px;
                    max-height: 15px;
                }
                .logged-in-item-profile-image{
                  width: 25px;
                  height: 25px;
                  border-radius: 50%;
                }
                .logged-in-item-notification-button{
                background-color: transparent;
                border: none;
                outline: none;
                }
            `}</style>

                {contextData.siteIdentity.membership?
                    <>
                        <Link href={`/profile`}>
                            <a rel='next' className='logged-in-item' >
                                {contextData?.userData?.profileImage ?
                                    <img src={contextData?.userData?.profileImage} alt='logged-in-item-profile-image' className='logged-in-item-profile-image'/>:
                                    <FontAwesomeIcon style={{width:'20px',height:'20px',color:'var(--navigation-text-color)'}} icon={faUser} className='svg-logo-small'/>
                                }

                            </a>
                        </Link>
                        <Link href={`/messenger`}>
                            <a rel='next' className='logged-in-item' >
                                <FontAwesomeIcon style={{width:'20px',height:'20px',color:'var(--navigation-text-color)'}} icon={faEnvelope} className='svg-logo-small'/>
                            </a>
                        </Link>
                    </>
                :null
                }
                {/*<button className='logged-in-item-notification-button'><FontAwesomeIcon style={{width:'20px',height:'20px',color:'var(--navigation-text-color)'}} icon={faBell} className=' svg-logo-small' /></button>*/}
                <p className='logged-in-item' onClick={() => contextData.functions.logOutUser()}>
                    <FontAwesomeIcon style={{width:'20px',height:'20px'}} icon={faPowerOff} className=' svg-logo-small' />
                </p>
            </div>
        )
    } else return null
};
export default LoggedInItemsForMenu;
