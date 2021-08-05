import {useContext} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import {faBell, faEnvelope, faUser} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import {useRouter} from "next/router";

const LoggedInItemsForMenu = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    if (contextData.userData.username && contextData.userData.username !== 'guest') {
        return (
            <div className='logged-in-items'>
                <style jsx>{`
                    .logged-in-items{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                         .logged-in-item{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: var(--navigation-text-color);
                            margin: 0 10px;
                            padding: 0;
                            place-items: center;
                        }
                        .logged-in-item-profile-image{
                            width: 25px;
                            height: 25px;
                            border-radius: 50%;
                        }    
                }
            `}</style>

                {contextData.siteIdentity.membership ?
                    <>
                        <Link href={`/`}>
                            <a rel={/sitemap|admin|messenger|chatroom/.test(router.pathname) ? 'no-referrer' : 'next'} className='logged-in-item'>
                                <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color)'}} icon={faHome}/>
                            </a>
                        </Link>
                        <Link href={`/profile`}>
                            <a rel='next' className='logged-in-item'>
                                <img src={contextData?.userData?.profileImage ? contextData?.userData?.profileImage :'/public/asset/images/user/noGenderAvatar50.jpg'} alt='logged-in-item-profile-image' className='logged-in-item-profile-image'/>
                            </a>
                        </Link>

                        <Link href={`/messenger`}>
                            <a rel='next' className='logged-in-item'>
                                <FontAwesomeIcon style={{width: '24px', height: '24px', color: 'var(--navigation-text-color)'}} icon={faEnvelope}/>
                            </a>
                        </Link>
                    </>
                    : null
                }
                <p className='logged-in-item' onClick={() => contextData.functions.logOutUser()}>
                    <FontAwesomeIcon style={{width: '24px', height: '24px'}} icon={faPowerOff}/>
                </p>
            </div>
        )
    } else return null
};
export default LoggedInItemsForMenu;
//next'