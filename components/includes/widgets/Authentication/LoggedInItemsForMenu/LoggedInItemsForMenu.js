import {useContext} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import Link from "next/link";
import {withTranslation} from "next-i18next";

const LoggedInItemsForMenu = props => {
    const contextData = useContext(AppContext);

    if (contextData.userData.username && contextData.userData.username !== 'guest') {
        return (
            <div className='logged-in-items'>
                {contextData.siteIdentity.membership ?
                    <>
                        <Link href={`/profile`}>
                            <a rel='next' className='logged-in-item'>

                                {props.t(`common:Profile`)}
                            </a>
                        </Link>

                        <Link href={`/messenger`}>
                            <a rel='next' className='logged-in-item'>
                                {props.t(`common:Messages`)}
                            </a>
                        </Link>
                    </>
                    : null
                }
                <p className='logged-in-item' onClick={() => contextData.functions.logOutUser()}>

                    {props.t(`common:Logout`)}
                </p>
            </div>
        )
    } else return null
};
export default withTranslation(['common'])(LoggedInItemsForMenu);
//next'


// <img
//     src={contextData?.userData?.profileImage ? contextData?.userData?.profileImage :'/public/asset/images/user/noGenderAvatar50.jpg'}
//     alt='logged-in-item-profile-image'
//     className='logged-in-item-profile-image'/>